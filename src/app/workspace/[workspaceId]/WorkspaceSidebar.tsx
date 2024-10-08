import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizonal } from "lucide-react";
import WorkspaceHeader from "./WorkspaceHeader";
import SidebarItem from "./SidebarItem";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import WorkspaceSection from "./WorkspaceSection";
import { useGetMembers } from "@/features/members/api/use-get-members";
import UserItem from "./UserItem";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-model";
import { useChannelId } from "@/hooks/use-channel-id";


const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const [_open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({workspaceId});
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({id: workspaceId});
  const {data: channels, isLoading: channelsLoading} = useGetChannels({workspaceId});
  const { data: members, isLoading: membersLoading } = useGetMembers({workspaceId: workspaceId})

  // console.log("WS", workspace, "and", member)

  if(workspaceLoading || memberLoading) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <Loader className="size-10 animate-spin text-white"/>
      </div>
    )
  }

  // if(channelId)

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
        </div>
        <WorkspaceSection
          label="Channels"
          hint="New Channel"
          onNew={member.role == "admin" ? () => setOpen(true): undefined}
        >

        {
          channels?.map((item) => (
            <SidebarItem 
            key={item._id}
            icons={HashIcon}
            label={item.name}
            id={item._id}
            variant={channelId == item._id ? "active" : "default"}
            />
          ))
        }
        </WorkspaceSection>
        <WorkspaceSection
          label="Direct Messages"
          hint="New Direct Message"
          onNew={() => {}}
        >
        {
          members?.map((item) => (
            <UserItem 
            key={item._id}
            id={member._id}
            label={item.user.name}
            image={item.user.image}
            // variant={member._id}
            />
          ))
        }
        </WorkspaceSection>
    </div>
  )
}

export default WorkspaceSidebar