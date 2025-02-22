"use client";

import {
  defaultEndpointMenu,
  getEndpointById,
} from "@/lib/constants/endpoints.constants";
import EndpointInput from "../AddEndpoint/components/EndpointInput";
import { KeyValuePair, VerbType } from "@/lib/constants/apiRequests.constants";
import { useEffect, useState } from "react";
import EndpointMenuLayout from "../AddEndpoint/components/EndpointMenuLayout";
import { MenuType } from "../AddEndpoint/AddEndpoint";
import RequestJSON from "../AddEndpoint/components/RequestJSON";
import HeaderComponent from "../AddEndpoint/components/HeaderComponent";
import ResponseJSON from "../AddEndpoint/components/ResponseJSON";

type Props = {
  id: string;
};

const ShowEndpoint = (props: Props) => {
  const endpoint = getEndpointById(props.id);
  if (!endpoint) return <></>;

  const [menus, setMenus] = useState(defaultEndpointMenu);
  const [verb, setVerb] = useState<string>(endpoint?.method || "GET");
  const [url, setUrl] = useState<string>(endpoint?.url || "");
  const [requestBody, setRequestBody] = useState<string>(
    endpoint?.requestBody || ""
  );
  const [responseBody, setResponseBody] = useState<string>(
    endpoint?.responseBody || ""
  );
  const [selectedMenu, setSelectedMenu] = useState<string>("");
const [headers, setHeaders] = useState<KeyValuePair[]>(endpoint?.headers || []);

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
        url={endpoint?.url || ""}
      />
      {selectedMenu !== "" && (
        <EndpointMenuLayout
          menus={menus}
          selectedMenu={selectedMenu as MenuType}
          setSelectedMenu={setSelectedMenu}
        >
          {selectedMenu === "request" && (
            <RequestJSON requestBody={requestBody} setRequestBody={setRequestBody}  />
          )}
          {selectedMenu === "header" && <HeaderComponent keyValues={headers} setKeyValues={setHeaders}/>}
          {selectedMenu === "response" && (
            <ResponseJSON responseBody={responseBody} setResponseBody={setResponseBody} />
          )}
        </EndpointMenuLayout>
      )}
    </div>
  );
};

export default ShowEndpoint;
