import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAllFiles = query({
  args: {},
  handler: async (ctx) => {
    const files = await ctx.db.system.query("_storage").collect();

    return await Promise.all(
      files.map(async (file) => ({
        ...file,
        url: await ctx.storage.getUrl(file._id),
      })),
    );
  },
});

export const deleteFile = mutation({
  args: {
    id: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.id);
  },
});
