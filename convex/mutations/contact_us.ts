import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { makeFunctionReference, FunctionReference } from "convex/server";

type SendInquiryEmailArgs = {
  first_name: string;
  last_name: string;
  email: string;
  message: string;
};

const sendInquiryEmails = makeFunctionReference<"action">(
  "actions/contact_us:sendInquiryEmails",
) as FunctionReference<"action", "internal", SendInquiryEmailArgs>;

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

    await ctx.scheduler.runAfter(0, sendInquiryEmails, {
      first_name: args.first_name,
      last_name: args.last_name,
      email: args.email,
      message: args.message,
    });

    return newCreateContactUs;
  },
});
