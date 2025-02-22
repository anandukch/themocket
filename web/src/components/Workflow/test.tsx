
import React, { useCallback, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Editor from '@monaco-editor/react';
import type { Endpoint } from '@/pages/Index';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Handle,
  Position,
  NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

type Props = {
  endpoint: Endpoint;
};

// Node Data Types
type StartNodeData = {
  label: string;
  method: Endpoint['method'];
  path: string;
};

type ConditionNodeData = {
  onClick: () => void;
  config: {
    type: 'params' | 'query' | 'body' | 'headers' | null;
    key: string;
    operator: 'equals' | 'not-equals' | 'contains' | 'not-contains';
    value: string;
  } | null;
};

type SwitchNodeData = {
  onClick: () => void;
  key: string;
  cases: string[];
};

type ResponseNodeData = {
  type: 'success' | 'error';
  response: Record<string, any>;
  onClick: () => void;
};

// Node Type Definitions
type CustomNodeType = 'start' | 'condition' | 'switch' | 'response';

type CustomNode = 
  | Node<StartNodeData, CustomNodeType>
  | Node<ConditionNodeData, CustomNodeType>
  | Node<SwitchNodeData, CustomNodeType>
  | Node<ResponseNodeData, CustomNodeType>;

// Custom Node Components
const StartNode: React.FC<NodeProps> = ({ data }) => (
  <div className="px-4 py-2 shadow-md rounded-md bg-blue-50 border-2 border-blue-500">
    <Handle type="source" position={Position.Bottom} />
    <div className="font-bold">{(data as StartNodeData).label}</div>
    <div className="text-xs">{(data as StartNodeData).method} {(data as StartNodeData).path}</div>
  </div>
);

const ConditionNode: React.FC<NodeProps> = ({ data }) => (
  <div 
    className="px-4 py-2 shadow-md rounded-md bg-yellow-50 border-2 border-yellow-500 cursor-pointer" 
    onClick={(data as ConditionNodeData).onClick}
  >
    <Handle type="target" position={Position.Top} />
    <div className="font-bold">Condition</div>
    <div className="text-xs">
      {(data as ConditionNodeData).config ? (
        `${(data as ConditionNodeData).config!.type}.${(data as ConditionNodeData).config!.key} ${(data as ConditionNodeData).config!.operator} ${(data as ConditionNodeData).config!.value}`
      ) : (
        'Click to configure'
      )}
    </div>
    <Handle type="source" position={Position.Bottom} id="success" />
    <Handle type="source" position={Position.Right} id="failure" />
  </div>
);

const SwitchNode: React.FC<NodeProps> = ({ data }) => (
  <div 
    className="px-4 py-2 shadow-md rounded-md bg-purple-50 border-2 border-purple-500 cursor-pointer" 
    onClick={(data as SwitchNodeData).onClick}
  >
    <Handle type="target" position={Position.Top} />
    <div className="font-bold">Switch</div>
    <div className="text-xs">
      {(data as SwitchNodeData).key ? `switch(${(data as SwitchNodeData).key})` : 'Click to configure'}
    </div>
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
  <div 
    className="px-4 py-2 shadow-md rounded-md bg-green-50 border-2 border-green-500 cursor-pointer" 
    onClick={(data as ResponseNodeData).onClick}
  >
    <Handle type="target" position={Position.Top} />
    <div className="font-bold">{(data as ResponseNodeData).type === 'success' ? 'Success Response' : 'Error Response'}</div>
    <div className="text-xs">Click to edit response</div>
  </div>
);

const nodeTypes = {
  start: StartNode,
  condition: ConditionNode,
  switch: SwitchNode,
  response: ResponseNode,
};

export const WorkflowEditor = ({ endpoint }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([
    {
      id: 'start',
      type: 'start',
      data: { 
        label: 'Endpoint',
        method: endpoint.method,
        path: endpoint.path
      },
      position: { x: 250, y: 0 },
    } as CustomNode,
    
  ]);
  
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const [isEditingNode, setIsEditingNode] = useState(false);
  const [switchCases, setSwitchCases] = useState<string[]>([]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addSwitchNode = () => {
    const newNode: Node<SwitchNodeData, 'switch'> = {
      id: `switch-${nodes.length}`,
      type: 'switch',
      data: { 
        key: '',
        cases: [],
        onClick: () => {
          setSelectedNode(newNode);
          setIsEditingNode(true);
        }
      },
      position: { 
        x: 250, 
        y: (nodes.length + 1) * 100 
      },
    };
    setNodes((nds) => [...nds, newNode as CustomNode]);
  };

  const addConditionNode = () => {
    const newNode: Node<ConditionNodeData, 'condition'> = {
      id: `condition-${nodes.length}`,
      type: 'condition',
      data: { 
        onClick: () => {
          setSelectedNode(newNode);
          setIsEditingNode(true);
        },
        config: null
      },
      position: { 
        x: 250, 
        y: (nodes.length + 1) * 100 
      },
    };
    setNodes((nds) => [...nds, newNode as CustomNode]);
  };

  const addResponseNode = (type: 'success' | 'error') => {
    const newNode: Node<ResponseNodeData, 'response'> = {
      id: `response-${type}-${nodes.length}`,
      type: 'response',
      data: { 
        type,
        response: {},
        onClick: () => {
          setSelectedNode(newNode);
          setIsEditingNode(true);
        }
      },
      position: { 
        x: type === 'success' ? 150 : 350, 
        y: (nodes.length + 1) * 100 
      },
    };
    setNodes((nds) => [...nds, newNode as CustomNode]);
  };

  const handleNodeEdit = (nodeData: Partial<ConditionNodeData | SwitchNodeData | ResponseNodeData>) => {
    if (!selectedNode) return;

    if (selectedNode.type === 'switch') {
      const switchData = nodeData as Partial<SwitchNodeData>;
      if (switchData.cases) {
        const newEdges = switchData.cases.map((caseValue) => ({
          id: `${selectedNode.id}-${caseValue}`,
          source: selectedNode.id,
          sourceHandle: `case-${caseValue}`,
          target: '', // User will need to connect this to a target node
          label: caseValue,
        }));
        setEdges((eds) => [...eds, ...newEdges]);
      }
    }

    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, ...nodeData } }
          : node
      ) as CustomNode[]
    );
    setIsEditingNode(false);
    setSelectedNode(null);
  };

  return (
    <div className="h-[600px] border rounded-lg p-4 bg-muted/5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Workflow Editor</h3>
          <p className="text-sm text-muted-foreground">
            {endpoint.method} {endpoint.path}
          </p>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={addConditionNode}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Condition
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={addSwitchNode}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Switch
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addResponseNode('success')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Success Response
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addResponseNode('error')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Error Response
          </Button>
        </div>
      </div>

      <div className="w-full h-[500px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-background"
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      <Dialog open={isEditingNode} onOpenChange={() => setIsEditingNode(false)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedNode?.type === 'switch' 
                ? 'Edit Switch'
                : selectedNode?.type === 'condition' 
                ? 'Edit Condition' 
                : 'Edit Response'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedNode?.type === 'switch' ? (
            <div className="space-y-4">
              <div>
                <Label>Switch Key</Label>
                <Input
                  placeholder="e.g. status"
                  value={(selectedNode.data as SwitchNodeData).key}
                  onChange={(e) =>
                    handleNodeEdit({
                      key: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Case Values (comma-separated)</Label>
                <Input
                  placeholder="e.g. active,pending,completed"
                  value={switchCases.join(',')}
                  onChange={(e) => {
                    const cases = e.target.value.split(',').map(c => c.trim());
                    setSwitchCases(cases);
                    handleNodeEdit({
                      cases,
                    });
                  }}
                />
              </div>
            </div>
          ) : selectedNode?.type === 'condition' ? (
            <div className="space-y-4">
              <div>
                <Label>Check Type</Label>
                <Select
                  onValueChange={(value: ConditionNodeData['config']['type']) =>
                    handleNodeEdit({
                      config: { 
                        ...(selectedNode.data as ConditionNodeData).config,
                        type: value 
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="params">URL Parameters</SelectItem>
                    <SelectItem value="query">Query Parameters</SelectItem>
                    <SelectItem value="body">Request Body</SelectItem>
                    <SelectItem value="headers">Headers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Key</Label>
                <Input
                  placeholder="e.g. user.id"
                  onChange={(e) =>
                    handleNodeEdit({
                      config: { 
                        ...(selectedNode.data as ConditionNodeData).config,
                        key: e.target.value 
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label>Operator</Label>
                <Select
                  onValueChange={(value: ConditionNodeData['config']['operator']) =>
                    handleNodeEdit({
                      config: { 
                        ...(selectedNode.data as ConditionNodeData).config,
                        operator: value 
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equals">Equals</SelectItem>
                    <SelectItem value="not-equals">Not Equals</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="not-contains">Not Contains</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Value</Label>
                <Input
                  placeholder="Value to compare"
                  onChange={(e) =>
                    handleNodeEdit({
                      config: { 
                        ...(selectedNode.data as ConditionNodeData).config,
                        value: e.target.value 
                      },
                    })
                  }
                />
              </div>
            </div>
          ) : (
            <div className="h-[400px]">
              <Editor
                height="100%"
                defaultLanguage="json"
                defaultValue={JSON.stringify((selectedNode?.data as ResponseNodeData)?.response || {}, null, 2)}
                onChange={(value) => {
                  try {
                    const jsonValue = JSON.parse(value || '{}');
                    handleNodeEdit({ response: jsonValue });
                  } catch (e) {
                    console.error('Invalid JSON');
                  }
                }}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};