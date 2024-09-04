import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { getAuthUserId } from "@convex-dev/auth/server";

const generateCode = () => {
    const code = Array.from(
        { length: 6 },
        () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
    ).join("");
     return code;
}

export const get = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);

        if(!userId){
            return [];
        }

        const members = await ctx.db.query("members")
            .withIndex("by_user_id", (q) => q.eq("userId", userId))
            .collect();

        const workspaceIds = members.map((member) => member.workspaceId);

        const workspaces = []

        for (const workspaceId of workspaceIds){
            const workspace = await ctx.db.get(workspaceId);

            if(workspace){
                workspaces.push(workspace)
            }
        }

       return workspaces;
    }
})

export const create = mutation({
    args: {
        name: v.string()
    },
    handler: async (ctx, args ) => {
        const userId = await getAuthUserId(ctx);

        if(!userId) {
            throw new Error("Unauthorized");
        }

        //create a proper method later
        const joinCode = generateCode();

        const workspaceID = await ctx.db.insert("workspaces", {
            name: args.name,
            userId,
            joinCode
        })

        await ctx.db.insert("members", {
            userId: userId,
            workspaceId: workspaceID,
            role: "admin"
        })

        return workspaceID; 
    }
})

export const getById = query({
    args: { id: v.id("workspaces")},
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if(!userId) {
            throw new Error("Unauthorized")
        }

        const member = await ctx.db.query("members")
            .withIndex("by_workspace_id_user_id",
                 (q) => q.eq("workspaceId", args.id).eq("userId", userId))
                 .unique();

        // console.log("Member", member)

        if(!member) {
            console.log("No member")
            return null; 
        }

        const id = await ctx.db.get(args.id);
        // console.log("Id in the ws", id)
        return id
    }
})