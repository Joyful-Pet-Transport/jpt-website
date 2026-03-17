import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { internal } from "../_generated/api";

export const createContactUs = mutation({
  args: {
    first_name: v.string(),
    last_name: v.string(),
    email: v.string(),
    message: v.string(),
  },

  handler: async (ctx, args) => {
    const newCreateContactUs = await ctx.db.insert("contact_us", {
      first_name: args.first_name,
      last_name: args.last_name,
      email: args.email,
      message: args.message,
    });

    await ctx.scheduler.runAfter(
      0,
      internal["actions/contact_us"].sendInquiryEmails,
      {
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email,
        message: args.message,
      },
    );

    return newCreateContactUs;
  },
});
