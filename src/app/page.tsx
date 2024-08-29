"use client"

import UserButton from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/auth/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";

export default function Home() {
  const {data, isLoading} = useGetWorkspaces()

  const workspaceID = useMemo(() => 
    data?.[0]?._id
  , [data])

  useEffect(() => {
    if(isLoading) return ;

    if(workspaceID){
      console.log("return to workspace")
    } else {
      console.log("open creation mode")
    }
  }, [workspaceID, isLoading])

  return (
    <div className="w-full h-screen">
      <div className="flex h-full space-x-4 justify-center items-center">
      <UserButton />
      </div>
    </div>
  );
}
