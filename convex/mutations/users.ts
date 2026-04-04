import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const upsertOwner = mutation({
  args: {
    name: v.string(),
    contact_number: v.string(),
    contact_form: v.string(),
    email_address: v.string(),
    account_name: v.string(),
    account_link: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email_address.trim().toLowerCase();

    let existingUser = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (!existingUser) {
      const users = await ctx.db.query("users").collect();
      existingUser =
        users.find(
          (user) => user.email?.trim().toLowerCase() === normalizedEmail,
        ) ?? null;
    }

    if (existingUser) {
      const patch: {
        name?: string;
        owner_name?: string;
        contact_number?: string;
        contact_form?: string;
        account_name?: string;
        account_link?: string;
      } = {};

      if (!existingUser.name && args.name) {
        patch.name = args.name;
      }
      if (!existingUser.owner_name && args.name) {
        patch.owner_name = args.name;
      }
      if (!existingUser.contact_number && args.contact_number) {
        patch.contact_number = args.contact_number;
      }
      if (!existingUser.contact_form && args.contact_form) {
        patch.contact_form = args.contact_form;
      }
      if (!existingUser.account_name && args.account_name) {
        patch.account_name = args.account_name;
      }
      if (!existingUser.account_link && args.account_link) {
        patch.account_link = args.account_link;
      }

      if (Object.keys(patch).length > 0) {
        await ctx.db.patch(existingUser._id, patch);
      }

      return existingUser._id;
    }

    return await ctx.db.insert("users", {
      email: normalizedEmail,
      name: args.name,
      owner_name: args.name,
      contact_number: args.contact_number,
      contact_form: args.contact_form,
      account_name: args.account_name,
      account_link: args.account_link,
    });
  },
});

export const attachPets = mutation({
  args: {
    userId: v.id("users"),
    petIds: v.array(v.id("pet_details")),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new Error("User not found");
    }

    const existingPets = user.pets ?? [];
    const mergedPetIds = [...new Set([...existingPets, ...args.petIds])];

    await ctx.db.patch(args.userId, {
      pets: mergedPetIds,
    });

    return args.userId;
  },
});
