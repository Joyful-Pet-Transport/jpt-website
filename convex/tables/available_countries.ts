import { v } from "convex/values";
import { query } from "./../_generated/server";
import { paginationOptsValidator } from "convex/server";

export const getAvailable = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("available_countries")
      .filter((q) => q.eq(q.field("available"), true))
      .collect();
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("available_countries").collect();
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

    let q = ctx.db
      .query("available_countries")
      .withIndex("by_name")
      .order("asc");

    if (trimmed !== "") {
      const lower = trimmed.toLowerCase();

      q = q.filter((q) =>
        q.or(
          q.eq(q.field("code"), trimmed.toUpperCase()),
          q.gte(
            q.field("name"),
            trimmed.charAt(0).toUpperCase() + trimmed.slice(1),
          ),
        ),
      );
    }

    return await q.paginate(paginationOpts);
  },
});
