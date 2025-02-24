"use client";

import { defaultEndpointMenu, getEndpointById, MockEndpoint } from "@/lib/constants/endpoints.constants";
import EndpointInput from "../AddEndpoint/components/EndpointInput";
import { KeyValuePair, VerbType } from "@/lib/constants/apiRequests.constants";
import { useEffect, useState } from "react";
import EndpointMenuLayout from "../AddEndpoint/components/EndpointMenuLayout";
import { MenuType } from "../AddEndpoint/AddEndpoint";
import RequestJSON from "../AddEndpoint/components/RequestJSON";
import HeaderComponent from "../AddEndpoint/components/HeaderComponent";
import ResponseJSON from "../AddEndpoint/components/ResponseJSON";
import { SERVER_URL } from "@/utils/loadEnv";

type Props = {
    mockEndpoint: MockEndpoint;
};

const ShowEndpoint = ({ mockEndpoint }: Props) => {
    // const endpoint = getEndpointById(props.id);
    if (!mockEndpoint) return <></>;
    const formattedMockHeader = [];
    const mockHeader = typeof mockEndpoint.requestHeaders === "string" ? JSON.parse(mockEndpoint.requestHeaders) : mockEndpoint.requestHeaders;
    for (const key in mockHeader) {
        formattedMockHeader.push({ key, value: mockHeader[key] });
    }
    const [menus, setMenus] = useState(defaultEndpointMenu);
    const [verb, setVerb] = useState<string>(mockEndpoint?.requestType || "GET");
    const [url, setUrl] = useState<string>(mockEndpoint?.endpoint || "");
    const [requestBody, setRequestBody] = useState<string>(JSON.parse(mockEndpoint.requestBody) || "");
    const [responseBody, setResponseBody] = useState<string>(JSON.parse(mockEndpoint.responseBody) || "");
    const [selectedMenu, setSelectedMenu] = useState<string>("");
    const [headers, setHeaders] = useState<KeyValuePair[]>(formattedMockHeader || []);

    useEffect(() => {
        if (["GET", "DELETE"].includes(verb)) {
            if (!selectedMenu) setSelectedMenu("response");
            setMenus({ ...menus, request: { title: "Request", show: false } });
        } else {
            if (!selectedMenu) setSelectedMenu("request");
            setMenus(defaultEndpointMenu);
        }
    }, [selectedMenu, verb]);

    return (
        <div className="h-full max-h-full w-full flex flex-col gap-4">
            <EndpointInput
                verb={verb as VerbType}
                setVerb={(v) => setVerb(v)}
                // defaultVerb="GET"
                url={mockEndpoint?.endpoint || ""}
                link = {`${process.env.NEXT_PUBLIC_API_URL}/${mockEndpoint.subDomain}${mockEndpoint.endpoint}`}
            />
            {selectedMenu !== "" && (
                <EndpointMenuLayout menus={menus} selectedMenu={selectedMenu as MenuType} setSelectedMenu={setSelectedMenu}>
                    {selectedMenu === "request" && <RequestJSON requestBody={requestBody} setRequestBody={setRequestBody} />}
                    {selectedMenu === "header" && <HeaderComponent keyValues={headers} setKeyValues={setHeaders} />}
                    {selectedMenu === "response" && <ResponseJSON responseBody={responseBody} setResponseBody={setResponseBody} />}
                </EndpointMenuLayout>
            )}
        </div>
    );
};

export default ShowEndpoint;
