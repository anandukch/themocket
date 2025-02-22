"use client";

import React, { useCallback, useState } from "react";
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Controls,
    Background,
    MiniMap,
    Handle,
    Position,
    Node,
    NodeProps,
    EdgeProps,
    getBezierPath,
    BaseEdge,
    EdgeLabelRenderer,
    Connection,
    Edge,
    HandleType,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { Delete01Icon, Delete03Icon, Delete04Icon, PlusSignIcon, WasteIcon } from "hugeicons-react";
import { FiTrash2, FiZap } from "react-icons/fi";

// const initialNodes = [
//     {
//         id: "1",
//         data: { label: "choose" },
//         position: {
//             x: 0,
//             y: 0,
//         },
//     },

//     {
//         id: "2",
//         data: { label: "your" },
//         position: {
//             x: 100,
//             y: 100,
//         },
//     },
//     {
//         id: "3",
//         data: { label: "desired" },
//         position: {
//             x: 0,
//             y: 200,
//         },
//     },
//     {
//         id: "4",
//         data: { label: "edge" },
//         position: {
//             x: 100,
//             y: 300,
//         },
//     },
//     {
//         id: "5",
//         data: { label: "type" },
//         position: {
//             x: 0,
//             y: 400,
//         },
//     },
// ];

// const initialEdges = [
//     {
//         type: "straight",
//         source: "1",
//         target: "2",
//         id: "1",
//         label: "straight",
//     },
//     {
//         type: "straight",
//         source: "1",
//         target: "3",
//         id: "11",
//         label: "straight",
//     },
//     {
//         type: "step",
//         source: "2",
//         target: "3",
//         id: "2",
//         label: "step",
//     },
//     {
//         type: "smoothstep",
//         source: "3",
//         target: "4",
//         id: "3",
//         label: "smoothstep",
//     },
//     {
//         type: "bezier",
//         source: "4",
//         target: "5",
//         id: "4",
//         label: "bezier",
//     },
// ];

export type Endpoint = {
    id: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    description?: string;
};

// Node Data Types
type StartNodeData = {
    label: string;
    method: Endpoint["method"];
    path: string;
};

type ConditionNodeData = {
    // selectedNodeId?: string | null;
    onClick: () => void;
    config: {
        type: "params" | "query" | "body" | "headers" | null;
        key: string;
        operator: "equals" | "not-equals" | "contains" | "not-contains";
        value: string;
    } | null;
};

type SwitchNodeData = {
    onClick: () => void;
    addNode?: (data: any) => void;
    key: string;
    cases: string[];
};

type ResponseNodeData = {
    type: "success" | "error";
    response: Record<string, any>;
    onClick: () => void;
};

type CustomEdgeData = {
    onDelete: () => void;
};

// Node Type Definitions
type CustomNodeType = "start" | "condition" | "switch" | "response";

type CustomNode =
    | Node<StartNodeData, CustomNodeType>
    | Node<ConditionNodeData, CustomNodeType>
    | Node<SwitchNodeData, CustomNodeType>
    | Node<ResponseNodeData, CustomNodeType>;

type CustomEdge = Edge<CustomEdgeData, "customEdge"> | Edge;
const CustomEdgeNode = (props: EdgeProps) => {
    const { id, sourceX, sourceY, targetX, targetY, markerEnd, data } = props;
    console.log("CustomEdge", props);

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} />

            <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        // background: "rgba(0,0,0,0.7)",
                        padding: "5px",
                        borderRadius: "5px",
                        color: "white",
                        pointerEvents: "all",
                    }}
                    className="nodrag nopan"
                >
                    {/* Icon Label */}
                    {/* <span>🔗</span> */}

                    {/* Delete Button */}
                    <button
                        onClick={(data as CustomEdgeData).onDelete}
                        style={{
                            background: "red",
                            borderRadius: "50%",
                            padding: "8px",
                            cursor: "pointer",
                        }}
                    >
                        <FiTrash2 size={16} />
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    );
};

const StartNode: React.FC<NodeProps> = ({ data }) => (
    <div className="px-4 py-2 shadow-md rounded-md bg-blue-50 border-2 border-blue-500">
        <Handle type="source" position={Position.Bottom} />
        <div className="font-bold">{(data as StartNodeData).label}</div>
        <div className="text-xs">
            {(data as StartNodeData).method} {(data as StartNodeData).path}
        </div>
    </div>
);

const CustomHandle = ({
    position,
    id,
    isHovered,
    type,
    data,
    nodeId,
}: {
    position: Position;
    id: string;
    isHovered: boolean;
    type: HandleType;
    data: any;
    nodeId: string;
}) => {
    const color = id == "failure" ? "red" : "blue";

    return (
        <Handle type={type} position={position} id={id}>
            {isHovered && (
                <div className=" left-1/2 -bottom-10 flex flex-col items-center">
                    <div className="w-[2px] h-6 bg-gray-500"></div>
                    <button
                        className={`bg-${color}-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-${color}-700 cursor-pointer`}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent node click
                            console.log("Add node");
                            (data as SwitchNodeData).addNode?.({
                                sourceId: nodeId,
                                handelId: id,
                                result: id == "failure" ? "failure" : "success",
                            });
                        }}
                    >
                        +
                    </button>
                </div>
            )}
        </Handle>
    );
};
const ConditionNode: React.FC<NodeProps> = ({ data, ...props }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative px-4 py-2 shadow-md rounded-md bg-yellow-50 border-2 border-yellow-500 cursor-pointer"
            onClick={(data as ConditionNodeData).onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Handle type="target" position={Position.Top} />

            <div className="font-bold">Condition</div>
            <div className="text-xs">
                {(data as ConditionNodeData).config
                    ? `${(data as ConditionNodeData).config!.type}.${(data as ConditionNodeData).config!.key} ${
                          (data as ConditionNodeData).config!.operator
                      } ${(data as ConditionNodeData).config!.value}`
                    : "Click to configure"}
            </div>

            <CustomHandle position={Position.Left} id="success" isHovered={isHovered} type="source" data={data} nodeId={props.id} />
            <CustomHandle position={Position.Right} id="failure" isHovered={isHovered} type="source" data={data} nodeId={props.id} />
        </div>
    );
};

const SwitchNode: React.FC<NodeProps> = ({ data }) => (
    <div className="px-4 py-2 shadow-md rounded-md bg-purple-50 border-2 border-purple-500 cursor-pointer" onClick={(data as SwitchNodeData).onClick}>
        <Handle type="target" position={Position.Top} />
        <div className="font-bold">Switch</div>
        <div className="text-xs">{(data as SwitchNodeData).key ? `switch(${(data as SwitchNodeData).key})` : "Click to configure"}</div>
        {(data as SwitchNodeData).cases.map((caseValue, index) => (
            <Handle
                key={caseValue}
                type="source"
                position={Position.Bottom}
                id={`case-${caseValue}`}
                style={{ left: `${((index + 1) * 100) / ((data as SwitchNodeData).cases.length + 1)}%` }}
            />
        ))}
    </div>
);

const ResponseNode: React.FC<NodeProps> = ({ data }) => (
    <div className="px-4 py-2 shadow-md rounded-md bg-green-50 border-2 border-green-500 cursor-pointer" onClick={(data as ResponseNodeData).onClick}>
        <Handle type="target" position={Position.Top} />
        <div className="font-bold">{(data as ResponseNodeData).type === "success" ? "Success Response" : "Error Response"}</div>
        <div className="text-xs">Click to edit response</div>
    </div>
);

const nodeTypes = {
    start: StartNode,
    condition: ConditionNode,
    switch: SwitchNode,
    response: ResponseNode,
};

const edgeTypes = {
    customEdge: CustomEdgeNode, // Register custom edge
};
const EdgeTypesFlow = () => {
    const onDeleteEdge = ({ edgeId, targetId }: { edgeId: string; targetId: string }) => {
        setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
        setNodes((nds) => nds.filter((node) => node.id !== targetId));
    };

    const [selectedNode, setSeletedNode] = useState<CustomNode | null>(null);
    const [nodeCreation, setNodeCreation] = useState<boolean>(false);
    const [nodeCreationInfo, setNodeCreationInfo] = useState<any>(null);
    const [choosenNodeType, setChoosenNodeType] = useState<"condition" | "switch" | "response" | null>(null);
    const initialEdges = [
        {
            type: "customEdge",
            source: "start",
            target: "condition-1",
            id: "1",
            data: {},
            // label: "bezier",
        },

        // {
        //     type: "customEdge",
        //     source: "condition-1",
        //     target: "switch-1",
        //     id: "2",
        //     data: {},
        //     // label: "bezier",
        // },
    ];

    const initialNodes: CustomNode[] = [
        {
            id: "start",
            type: "start",
            data: {
                label: "Start",
                method: "GET",
                path: "/api/v1/users",
            },
            position: { x: 0, y: 0 },
        },
        {
            id: "condition-1",
            type: "condition",
            data: {
                onClick: () => {},
                addNode: (data: any) => {
                    setNodeCreation(true);
                    setNodeCreationInfo(data);
                },
                config: null,
            },
            position: { x: 150, y: 100 },
        },
        {
            id: "switch-1",
            type: "switch",
            data: {
                onClick: () => console.log("Clicked"),
                key: "",
                cases: ["case1", "case2", "case3", "case4"],
            },
            position: { x: 300, y: 200 },
        },
        // {
        //     id: "switch-2",
        //     type: "switch",
        //     data: {
        //         onClick: () => console.log("Clicked"),
        //         key: "",
        //         cases: ["case1", "case2", "case3", "case4"],
        //     },
        //     position: { x: 300, y: 200 },
        // },
    ];
    const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<CustomEdge>(initialEdges);
    // const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);
    const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge({ ...connection, type: "customEdge" }, eds)), [onDeleteEdge]);
    const addResponseNode = (type: "success" | "error") => {
        console.log(edges);

        const newNode: Node<ResponseNodeData, "response"> = {
            id: `response-${type}-${nodes.length}`,
            type: "response",
            data: {
                type,
                response: {},
                onClick: () => {
                    //   setSelectedNode(newNode);
                    //   setIsEditingNode(true);
                },
            },
            position: {
                x: type === "success" ? 150 : 350,
                y: (nodes.length + 1) * 100,
            },
        };
        setNodes((nds) => [...nds, newNode as CustomNode]);
        return newNode;
    };

    return (
        <div className="h-screen">
            <button onClick={() => addResponseNode("success")}>
                <PlusSignIcon className="h-4 w-4 mr-2" />
                Success Response
            </button>
            <ReactFlow
                nodes={nodes}
                edges={edges.map((edge) => ({
                    ...edge,
                    type: "customEdge",
                    data: {
                        onDelete: () =>
                            onDeleteEdge({
                                edgeId: edge.id,
                                targetId: edge.target,
                            }),
                    },
                }))}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                minZoom={0.2}
                style={{ backgroundColor: "#F7F9FB", color: "black" }}
            >
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>
            {nodeCreation && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-bold">Create Node</h1>
                            <button onClick={() => setNodeCreation(false)}>
                                <WasteIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => {
                                    setChoosenNodeType("condition");
                                    setNodeCreation(false);
                                }}
                            >
                                Condition
                            </button>
                            <button
                                onClick={() => {
                                    setChoosenNodeType("switch");
                                    setNodeCreation(false);
                                }}
                            >
                                Switch
                            </button>
                            <button
                                onClick={() => {
                                    const node = addResponseNode(nodeCreationInfo.result);
                                    setEdges((eds) => [
                                        ...eds,
                                        {
                                            type: "customEdge",
                                            source: nodeCreationInfo.sourceId,
                                            sourceHandle: nodeCreationInfo.handelId,
                                            target: node.id,
                                            id: `${nodeCreationInfo.sourceId}-${node.id}`,
                                        },
                                    ]);
                                    setNodeCreation(false);
                                }}
                            >
                                Response
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EdgeTypesFlow;
