"use client"


import { useWorkspaceId } from "@/hooks/use-workspace-id"

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId(); 
  return (
    <div>
        Id: { workspaceId }
        {/* Data: { JSON.stringify(data) } */}
    </div>
  )
}

export default WorkspaceIdPage