import { query } from "./../_generated/server";

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
