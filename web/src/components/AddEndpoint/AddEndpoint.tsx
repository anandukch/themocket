"use client";

import { useEffect, useState } from "react";
import EndpointInput from "./components/EndpointInput";
import EndpointMenuLayout from "./components/EndpointMenuLayout";
import RequestJSON from "./components/RequestJSON";
import ResponseJSON from "./components/ResponseJSON";
import HeaderComponent from "./components/HeaderComponent";
import { KeyValuePair, VerbType } from "@/lib/constants/apiRequests.constants";
import { defaultEndpointMenu } from "@/lib/constants/endpoints.constants";
import { errorToast, infoToast } from "@/utils/toastSettings";
import Loader from "../Loader";
import {
  useCreateMockAiApiMutation,
  useCreateMockApiMutation,
} from "@/apis/mocket";

export type MenuType = keyof typeof defaultEndpointMenu;
const AddEndpoint = () => {
  const [createMockApi, { isLoading }] = useCreateMockApiMutation();
  const [createMockAiApi, { isLoading: aiLoading }] =
    useCreateMockAiApiMutation();
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
    { key: "", value: "" },
  ]);

  const [selectedMenu, setSelectedMenu] = useState<string>("");

  useEffect(() => {
    if (["GET", "DELETE"].includes(verb)) {
      if (!selectedMenu) setSelectedMenu("response");
      setMenus({ ...menus, request: { title: "Request", show: false } });
    } else setMenus(defaultEndpointMenu);
  }, [selectedMenu, verb]);

  const saveHandler = async () => {
    const formattedHeaders: {
      [key: string]: string;
    } = {};
    headers.forEach((header) => {
      if (header.key && header.value) {
        formattedHeaders[header.key] = header.value;
      }
    });

    await createMockApi({
      requestType: verb,
      endpoint: url,
      requestHeaders: JSON.stringify(formattedHeaders),
      requestBody: JSON.stringify(requestBody),
      responseBody: JSON.stringify(responseBody),
    });
  };

  const [aiButton, setAiButton] = useState(false);

  const [prompt, setPrompt] = useState<string>("");
  const aiClickHandler = async () => {
    await createMockAiApi({
      prompt: prompt,
      projectId: "1",
    });
  };
  return (
    <div className="h-full max-h-full w-full flex flex-col gap-4">
      {(isLoading || aiLoading) && <Loader />}
      <EndpointInput
        verb={verb as VerbType}
        setVerb={(v) => setVerb(v)}
        url={url}
        setUrl={setUrl}
        onSave={saveHandler} 
        link={url}
      />


      <button
        className="w-40 h-10 bg-blue-500 text-white rounded-md"
        onClick={() => {
          setAiButton((prev) => !prev);
        }}
      >
        Generate with AI
      </button>

      {aiButton && (
        <div className="w-full h-40 bg-gray-500 p-4 rounded-lg flex flex-col gap-3">
          <p className="text-white font-semibold">AI Generated Data</p>
          <input
            type="text"
            placeholder="Enter your prompt..."
            className="p-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            onClick={aiClickHandler}
          >
            Generate
          </button>
        </div>
      )}
      {selectedMenu !== "" && (
        <EndpointMenuLayout
          menus={menus}
          selectedMenu={selectedMenu as MenuType}
          setSelectedMenu={setSelectedMenu}
        >
          {selectedMenu === "request" && (
            <RequestJSON
              requestBody={requestBody}
              setRequestBody={setRequestBody}
            />
          )}
          {selectedMenu === "header" && (
            <HeaderComponent keyValues={headers} setKeyValues={setHeaders} />
          )}
          {selectedMenu === "response" && (
            <ResponseJSON
              responseBody={responseBody}
              setResponseBody={setResponseBody}
            />
          )}
        </EndpointMenuLayout>
      )}
    </div>
  );
};

export default AddEndpoint;
