import { endpoints } from "@/lib/constants/endpoints.constants";
import React from "react";
import EndpointLink from "./components/EndpointLink";

const EndpointsStrip = () => {
  return (
    <div className="h-full w-[300px] flex flex-col py-5 px-1 gap-2">
      <h1 className="text-md text-sm font-medium leading-4 h-[50px]">
        PROJECT NAME
      </h1>
      <div className="flex flex-col gap-2 overflow-y-auto pr-1">
        <a
          href="/dashboard/endpoints/add"
          className="bg-purple-950 hover:bg-purple-900 transition-all min-h-[35px] flex items-center justify-center rounded-md"
        >
          Add an endpoint
        </a>
        {endpoints.data.map((endpoint) => (
          <EndpointLink key={endpoint.id} {...endpoint} />
        ))}
      </div>
    </div>
  );
};

export default EndpointsStrip;
