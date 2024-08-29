"use client"

import UserButton from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-model";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";

export default function Home() {
  const {data, isLoading} = useGetWorkspaces()

  const [open, setOpen] = useCreateWorkspaceModal()

  const workspaceID = useMemo(() => 
    data?.[0]?._id
  , [data])

  useEffect(() => {
    if(isLoading) return ;

    if(workspaceID){
      console.log("return to workspace")
    } else if(!open) {
      // console.log("open creation mode")
      setOpen(true)
    }
  }, [workspaceID, isLoading, open, setOpen])

  return (
    <div className="w-full h-screen">
      <div className="flex h-full space-x-4 justify-center items-center">
      <UserButton />
      </div>
    </div>
  );
}
