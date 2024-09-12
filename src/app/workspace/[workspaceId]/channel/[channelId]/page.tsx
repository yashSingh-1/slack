"use client"

import { useGetIndiChannel } from "@/features/channels/api/use-get-indi-channel";
import { useChannelId } from "@/hooks/use-channel-id"
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader, TriangleAlert } from "lucide-react";

const ChannelPage = () => {
  const channelId = useChannelId();
  const workspaceID = useWorkspaceId();

  const {data: channel, isLoading: channelLoading} = useGetIndiChannel({
    channelId: channelId,
    workspaceId: workspaceID
  })

  if(channelLoading){
    <div className="h-full flex-1 flex items-center justify-center">
      <Loader className="animate-spin size-6 text-muted-foreground"/>
    </div>
  }

  if(channel){
    <div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
      <TriangleAlert className="size-6 text-muted-foreground"/>
    </div>
  }

  return (
    <div>ChannelPage</div>
  )
}

export default ChannelPage