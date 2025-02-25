"use client";
import { endpoints, MockEndpoint } from "@/lib/constants/endpoints.constants";
import React, { useEffect, useState } from "react";
import EndpointLink from "./components/EndpointLink";
import { useGetMocksQuery } from "@/apis/mocket";
import { errorToast } from "@/utils/toastSettings";
import Loader from "@/components/Loader";

const EndpointsStrip = () => {
  const {
    data: mocks,
    isLoading,
    isError,
    error,
  } = useGetMocksQuery(undefined);
  if (isError) {
    errorToast(JSON.stringify(error));
  }

  return (
    <>
      {isLoading && <Loader />}
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
          {mocks &&
            mocks.map((endpoint) => (
              <EndpointLink key={endpoint._id} {...endpoint} />
            ))}
        </div>
      </div>
    </>
  );
};

export default EndpointsStrip;
