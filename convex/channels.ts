import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
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

export const create = mutation({
    args: {
        name: v.string(),
        workspaceId: v.id("workspaces")
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if(!userId){
            throw new Error("Unauthorised User");
        }

        const member = await ctx.db.query("members")
            .withIndex("by_workspace_id_user_id", (q) => 
                q.eq("workspaceId", args.workspaceId).eq("userId", userId)
            ).unique();

        if(!member || member.role !== "admin") {
            throw new Error("Unauthorised")
        }

        const parsedName = args.name.replace(/\s+/g, "-").toLowerCase()

        const channelId = await ctx.db.insert("channels", {
            name: parsedName,
            workspaceId: args.workspaceId
        })

        return channelId;
    }
})

// Query to check if the channel exists
export const checkingChannel = query({
    args:{
        channelId: v.id("channels")
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx)

        if(!userId) {
            return null;
        }

        const checkIfExists = await ctx.db.get(args.channelId)

        if(checkIfExists === null){
            return null
        }

        return checkIfExists;
    }
})

export const getById = query({
    args: {
        channelId: v.id("channels"),
        workspaceId: v.id("workspaces")
    },
    handler: async(ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if(!userId){
            return null;
        }

        const member = await ctx.db.query("members").withIndex("by_workspace_id_user_id",
             (q) => q.eq("workspaceId", args.workspaceId).eq("userId", userId)).unique();

        if(!member){
            return null;
        }

        const channel = await ctx.db.get(args.channelId);

        return channel;
    }
})

export const update = mutation({
    args: {
        name: v.string(),
        id: v.id("channels")
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if(!userId){
            throw new Error("User Unauthorized");
        }

        const channel = await ctx.db.get(args.id);

        if(!channel){
            throw new Error("Channel not found")
        }

        const member = await ctx.db.query("members")
            .withIndex("by_workspace_id_user_id", (q) => 
                q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
            ).unique();

        if(!member || member.role !== "admin") {
            throw new Error("Unauthorized")
        }

        await ctx.db.patch(args.id, {
            name: args.name
        })

        return args.id; 
    }
})

export const remove = mutation({
    args: {
        id: v.id("channels")
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if(!userId){
            throw new Error("User Unauthorized");
        }

        const channel = await ctx.db.get(args.id);

        if(!channel){
            throw new Error("Channel not found")
        }

        const member = await ctx.db.query("members")
            .withIndex("by_workspace_id_user_id", (q) => 
                q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
            ).unique();

        if(!member || member.role !== "admin") {
            throw new Error("Unauthorized")
        }

        // TODO: Remove associated Messages

        await ctx.db.delete(args.id)

        return args.id; 
    }
})