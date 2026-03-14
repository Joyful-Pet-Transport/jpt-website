import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { getRoleById } from "./roles";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const user = await ctx.db.get(userId);

    if (!user) {
      return null;
    }

    let role = null;
    if (user.roleId) {
      role = await getRoleById(ctx, user.roleId);
    }

    return {
      ...user,
      role,
    };
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    const usersWithRoles = await Promise.all(
      users.map(async (user) => {
        let role = null;

        if (user.roleId) {
          role = await getRoleById(ctx, user.roleId);
        }

        return {
          ...user,
          role,
        };
      }),
    );

    return usersWithRoles;
  },
});

export const getPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { search, paginationOpts } = args;
    const trimmed = search?.trim() ?? "";

    let q = ctx.db.query("users").withIndex("by_name").order("asc");

    if (trimmed !== "") {
      const lower = trimmed.toLowerCase();

      q = q.filter((q) =>
        q.or(
          q.gte(
            q.field("name"),
            trimmed.charAt(0).toUpperCase() + trimmed.slice(1),
          ),
          q.gte(q.field("email"), lower),
        ),
      );
    }

    const result = await q.paginate(paginationOpts);

    const usersWithRoles = await Promise.all(
      result.page.map(async (user) => {
        let role = null;

        if (user.roleId) {
          role = await getRoleById(ctx, user.roleId);
        }

        return {
          ...user,
          role,
        };
      }),
    );

    return {
      ...result,
      page: usersWithRoles,
    };
  },
});
