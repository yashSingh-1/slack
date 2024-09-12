import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface Props {
    channelId: Id<"channels">;
    workspaceId: Id<"workspaces">;
}

export const useGetIndiChannel = ({channelId, workspaceId}: Props) => {
    const data = useQuery(api.channels.getById, {channelId, workspaceId});
    const isLoading = data === undefined;

    return {data, isLoading}
}