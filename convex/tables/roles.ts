import { v } from "convex/values";
import { query } from "./../_generated/server";
import { QueryCtx } from "./../_generated/server";
import { Id } from "./../_generated/dataModel";

export async function getRoleById(ctx: QueryCtx, roleId: Id<"roles">) {
  return await ctx.db.get(roleId);
}

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("roles").collect();
  },
});

export const getRole = query({
  args: { roleId: v.id("roles") },
  handler: async (ctx, args) => {
    return await getRoleById(ctx, args.roleId);
  },
});
