import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createContactUs = mutation({
  args: {
    first_name: v.string(),
    last_name: v.string(),
    email: v.string(),
    message: v.string(),
  },

  handler: async (convexToJson, args) => {
    const newCreateContactUs = await convexToJson.db.insert("contact_us", {
      first_name: args.first_name,
      last_name: args.last_name,
      email: args.email,
      message: args.message,
    });

    return newCreateContactUs;
  },
});
