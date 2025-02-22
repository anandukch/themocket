"use client";

import { useEffect, useState } from "react";
import EndpointInput from "./components/EndpointInput";
import EndpointMenuLayout from "./components/EndpointMenuLayout";
import RequestJSON from "./components/RequestJSON";
import ResponseJSON from "./components/ResponseJSON";
import HeaderComponent from "./components/HeaderComponent";
import { KeyValuePair, VerbType } from "@/lib/constants/apiRequests.constants";
import { defaultEndpointMenu } from "@/lib/constants/endpoints.constants";

export type MenuType = keyof typeof defaultEndpointMenu;
const AddEndpoint = () => {
  const [menus, setMenus] = useState(defaultEndpointMenu);
  const [verb, setVerb] = useState<string>("GET");
  const [url, setUrl] = useState<string>("");
  const [requestBody, setRequestBody] = useState<string>(`{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  },
  "hobbies": ["reading", "gaming", "traveling"]
}
`);
  const [responseBody, setResponseBody] = useState<string>(`{
    "status": "success",
    "data": {
      "id": 101,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "age": 30,
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "zip": "10001"
      },
      "hobbies": ["reading", "gaming", "traveling"],
      "createdAt": "2025-02-10T12:00:00Z",
      "updatedAt": "2025-02-10T14:00:00Z"
    }
  }`);
  // const [headers, setHeaders] = useState<string>("");
  const [headers, setHeaders] = useState<KeyValuePair[]>([
    { key:"" , value: "" },
  ]);

  const [selectedMenu, setSelectedMenu] = useState<string>("");

  useEffect(() => {
    if (["GET", "DELETE"].includes(verb)) {
      if (!selectedMenu) setSelectedMenu("response");
      setMenus({ ...menus, request: { title: "Request", show: false } });
    } else setMenus(defaultEndpointMenu);
  }, [selectedMenu, verb]);
  const saveHandler = ()=>{
    console.log(verb, url,headers,requestBody,responseBody);
    
  }
  return (
    <div className="h-full max-h-full w-full flex flex-col gap-4">
      <EndpointInput
        verb={verb as VerbType}
        setVerb={(v) => setVerb(v)}
        // defaultVerb="GET"
        // defaultUrl=""

        url={url}
        setUrl={setUrl}
        onSave={saveHandler} // Add this line
      />
      {selectedMenu !== "" && (
        <EndpointMenuLayout
          menus={menus}
          selectedMenu={selectedMenu as MenuType}
          setSelectedMenu={setSelectedMenu}
        >
          {selectedMenu === "request" && <RequestJSON requestBody={requestBody} setRequestBody={setRequestBody} />}
          {selectedMenu === "header" && <HeaderComponent keyValues={headers} setKeyValues={setHeaders}/>}
          {selectedMenu === "response" && <ResponseJSON responseBody={responseBody} setResponseBody={setResponseBody}/>}
        </EndpointMenuLayout>
      )}
    </div>
  );
};

export default AddEndpoint;
