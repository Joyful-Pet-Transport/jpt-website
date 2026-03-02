import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createPetDetails = mutation({
  args: {
    pet_name: v.string(),
    breed: v.string(),
    sex: v.string(),
    pet_birthday: v.string(),
    pet_age: v.string(),
    pet_weight: v.string(),
    pet_condition: v.optional(v.string()),
    special_instructions: v.optional(v.string()),
    pet_image: v.id("_storage"),
  },

  handler: async (ctx, args) => {
    const newPetDetails = await ctx.db.insert("pet_details", {
      pet_name: args.pet_name,
      breed: args.breed,
      sex: args.sex,
      pet_birthday: args.pet_birthday,
      pet_age: args.pet_age,
      pet_weight: args.pet_weight,
      pet_condition: args.pet_condition,
      special_instructions: args.special_instructions,
      pet_image: args.pet_image,
    });
    return newPetDetails;
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
