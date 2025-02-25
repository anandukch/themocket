"use client";
import { useGetProfileQuery } from "@/apis/authApi";
import Loader from "@/components/Loader";
import EdgeTypesFlow from "@/components/Workflow/WorkflowBuilder";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isLoading, isError } = useGetProfileQuery({});
  if (isError) {
    redirect("/auth");
  }

  return (
    <>
      {isLoading && <Loader />}
      <EdgeTypesFlow />
    </>
  );
}
