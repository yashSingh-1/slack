import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const generateCode = () => {
  const code = Array.from(
    { length: 6 },
    () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
  ).join("");
  return code;
};

export const join = mutation({
  args: {
    joinCode: v.string(),
    workspaceId: v.id("workspaces")
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if(!userId){
      throw new Error("Unauthorized")
    }

    const workspace = await ctx.db.get(args.workspaceId);

    if(!workspace){
      throw new Error("Workspace not found")
    }

    if(workspace.joinCode !== args.joinCode.toLowerCase()){
      throw new Error("Join Code Invalid")
    }

    const existingMember = await ctx.db.query("members")
    .withIndex("by_workspace_id_user_id", 
      (q) => q.eq("workspaceId", args.workspaceId).eq("userId", userId))
      .unique();

    if(existingMember){
      throw new Error("Already a member of this workspace!")
    }

    await ctx.db.insert("members", {
      userId: userId,
      workspaceId: workspace._id,
      role: "member"
    })

    return workspace._id;
  }
})

export const newJoinCode = mutation({
  args: {
    workspaceId: v.id("workspaces")
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if(!userId){
      throw new Error("Unauthorized")
    }

    const member = await ctx.db.query("members")
      .withIndex("by_workspace_id_user_id", 
        (q) => q.eq("workspaceId", args.workspaceId).eq("userId", userId))
        .unique();

    if(!member || member.role !== "admin"){
      throw new Error("Unauthorized member")
    }

    const regenratedCode = generateCode();

    await ctx.db.patch(args.workspaceId, {
      joinCode: regenratedCode
    })

    return args.workspaceId;
  }
})

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return [];
    }

    const members = await ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();

    const workspaceIds = members.map((member) => member.workspaceId);

    const workspaces = [];

    for (const workspaceId of workspaceIds) {
      const workspace = await ctx.db.get(workspaceId);

      if (workspace) {
        workspaces.push(workspace);
      }
    }

    return workspaces;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    //create a proper method later
    const joinCode = generateCode();

    const workspaceID = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    await ctx.db.insert("members", {
      userId: userId,
      workspaceId: workspaceID,
      role: "admin",
    });

    await ctx.db.insert("channels", {
      name: "general",
      workspaceId: workspaceID
    })

    return workspaceID;
  },
});

export const getInfoById = query({
  args: {
    id: v.id("workspaces")
  },
  handler: async (ctx,args) => {
    const userId = await getAuthUserId(ctx);

    if(!userId){
      return null;
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();

      const workspace = await ctx.db.get(args.id)

      return {
        name: workspace?.name,
        isMember: !!member
      }

  }
})

export const getById = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();

    // console.log("Member", member)

    if (!member) {
      console.log("No member");
      return null;
    }

    const id = await ctx.db.get(args.id);
    // console.log("Id in the ws", id)
    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("workspaces"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();

      if(!member || member.role != "admin"){
        throw new Error("Unauthorized")
      }

      await ctx.db.patch(args.id, {
        name: args.name
      });

      return args.id;

  },
});


export const remove = mutation({
  args: {
    id: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();

      if(!member || member.role != "admin"){
        throw new Error("Unauthorized")
      }

      const [members] = await Promise.all([
        ctx.db.query("members")
        .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.id))
        .collect()
      ]);

      for(const member of members) {
        await ctx.db.delete(member._id)
      }

      await ctx.db.delete(args.id)

      return args.id;
  },
});
