import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
    args: {
        workspaceId: v.id("workspaces")
    },
    handler: async (context, args) => {
        const userID = await getAuthUserId(context);

        if(!userID) {
            return [];
        }

        const member = await context.db.query("members")
            .withIndex("by_workspace_id_user_id", (q) => 
                q.eq("workspaceId", args.workspaceId).eq("userId", userID)
            ).unique();

        if(!member) {
            return [];
        }

        const channels = await context.db.query("channels")
            .withIndex("by_workspace_id", (q) => 
                q.eq("workspaceId", args.workspaceId)
            ).collect();

        return channels;
    }
})