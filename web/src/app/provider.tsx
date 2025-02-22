"use client";

import { useUserContext } from "@/context/useContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const { authenticated, fetchUserDetails, userDetails, loading } =
    useUserContext();

  useEffect(() => {
    if (!userDetails) fetchUserDetails();
  }, [userDetails]);

  // if nort authenticaeted redirect to login
  if (loading) return <div>Loading...</div>;
  if (!authenticated) {
    redirect("/auth");
  }
  return <>{children}</>;
}
