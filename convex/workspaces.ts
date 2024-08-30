import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
    args: {},
    handler: async (ctx) => {
       return await ctx.db.query("workspaces").collect();
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
        const joinCode = "123456";

        const workspaceID = await ctx.db.insert("workspaces", {
            name: args.name,
            userId,
            joinCode
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

        return await ctx.db.get(args.id)
    }
})