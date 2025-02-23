"use client";
import EdgeTypesFlow from "@/components/Workflow/WorkflowBuilder";
import { useUserContext } from "@/context/useContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { authenticated, fetchUserDetails, userDetails, loading } =
    useUserContext();

  useEffect(() => {
    if (!userDetails) fetchUserDetails();
  }, [userDetails]);

  // if nort authenticaeted redirect to login
  // if (loading) return <div>Loading...</div>;
  // if (authenticated) {
  //   redirect("/dashboard");
  // } else {
  //   redirect("/auth");
  // }
  return (
    <>
      <EdgeTypesFlow />
    </>
  );
}
