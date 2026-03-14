import { paginationOptsValidator } from "convex/server";
import { query } from "./../_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contact_us").collect();
  },
});

export const getPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const q = ctx.db.query("contact_us");

    return await q.paginate(args.paginationOpts);
  },
});
