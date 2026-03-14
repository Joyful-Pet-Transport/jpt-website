import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const addCountry = mutation({
  args: {
    name: v.string(),
    code: v.string(),
    available: v.boolean(),
  },

  handler: async (convexToJson, args) => {
    const addNewCountry = await convexToJson.db.insert("available_countries", {
      name: args.name,
      code: args.code,
      available: args.available,
    });

    return addNewCountry;
  },
});

export const toggleAvailability = mutation({
  args: {
    id: v.id("available_countries"),
  },

  handler: async (ctx, args) => {
    const country = await ctx.db.get(args.id);

    if (!country) {
      throw new Error("Country not found");
    }

    await ctx.db.patch(args.id, {
      available: !country.available,
    });

    return !country.available;
  },
});
