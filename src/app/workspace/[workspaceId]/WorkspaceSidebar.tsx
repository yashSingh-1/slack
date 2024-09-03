import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { AlertTriangle, Loader } from "lucide-react";


const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const { data: member, isLoading: memberLoading } = useCurrentMember({workspaceId});
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({id: workspaceId});

  if(workspaceLoading || memberLoading) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <Loader className="size-10 animate-spin text-white"/>
      </div>
    )
  }

  if(!workspace || !member ) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
        <AlertTriangle className="size-5 text-white"/>
        <span className="text-white text-sm">Workspace not found</span>
      </div>
    )
  }

  return (
    <div>WorkspaceSidebar</div>
  )
}

export default WorkspaceSidebar