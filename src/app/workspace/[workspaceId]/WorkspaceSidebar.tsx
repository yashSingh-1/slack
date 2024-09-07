import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizonal } from "lucide-react";
import WorkspaceHeader from "./WorkspaceHeader";
import SidebarItem from "./SidebarItem";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import WorkspaceSection from "./WorkspaceSection";


const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const { data: member, isLoading: memberLoading } = useCurrentMember({workspaceId});
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({id: workspaceId});
  const {data: channels, isLoading: channelsLoading} = useGetChannels({workspaceId});

  // console.log("WS", workspace, "and", member)

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
    <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full">
      <WorkspaceHeader workspace={workspace} isAdmin={member.role == "admin"} />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem
          label="Threads"
          icons={MessageSquareText}
          id="threads"
        />
        <SidebarItem
          label="Drafs and Sent"
          icons={SendHorizonal}
          id="drafts"
        />
        <WorkspaceSection
          label="Channels"
          hint="New Channel"
          onNew={() => {}}
        >

        {
          channels?.map((item) => (
            <SidebarItem 
            key={item._id}
            icons={HashIcon}
            label={item.name}
            id={item._id}
            />
          ))
        }
        </WorkspaceSection>
      </div>
    </div>
  )
}

export default WorkspaceSidebar