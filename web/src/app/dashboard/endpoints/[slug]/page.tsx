"use client";
import { useGetMocketQuery, useLazyGetMocketQuery } from "@/apis/mocket";
import Loader from "@/components/Loader";
import ShowEndpoint from "@/components/ShowEndpoint/ShowEndpoint";
import { MockEndpoint } from "@/lib/constants/endpoints.constants";
import { errorToast } from "@/utils/toastSettings";
import { use } from "react";

const SomeEndpoint = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);

  const { data: mock, isLoading, isError, error } = useGetMocketQuery(slug);
  if (isError) {
    errorToast(JSON.stringify(error));
  }

  return (
    <>
      {isLoading && <Loader />}
      {mock ? <ShowEndpoint mockEndpoint={mock} /> : <p>Loading...</p>}
    </>
  );
};

export default SomeEndpoint;
