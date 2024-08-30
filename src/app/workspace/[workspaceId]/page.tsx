"use client"

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id"

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId(); 
  const {data} = useGetWorkspace(workspaceId)
  return (
    <div>
        Id: { workspaceId }
        Data: { JSON.stringify(data) }
    </div>
  )
}

export default WorkspaceIdPage