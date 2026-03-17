import { paginationOptsValidator } from "convex/server";
import { query } from "../_generated/server";
import { v } from "convex/values";
import { Id } from "../_generated/dataModel";
import { getPetById } from "./pet_details";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("bookings").collect();
  },
});

export const getPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const q = ctx.db.query("bookings");

    return await q.paginate(args.paginationOpts);
  },
});

export const getById = query({
  args: {
    id: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.id);

    if (!booking) {
      return null;
    }

    const getPetDetails = async (pets?: Id<"pet_details">[]) => {
      if (!pets?.length) {
        return [];
      }

      return await Promise.all(
        pets.map(async (petId) => {
          const pet = await getPetById(ctx, petId);

          if (!pet) {
            return null;
          }

          const image =
            (await ctx.storage.getUrl(pet.pet_image)) || "/images/logo/logo.png";

          return {
            ...pet,
            image,
          };
        }),
      );
    };

    if (booking.booking_type === "international_pet_transport") {
      const details = await ctx.db.get(
        booking.booking_id as Id<"international_pet_transport">,
      );

      if (!details) {
        return { booking, details: null, pet_details: [] };
      }

      return {
        booking,
        details,
        pet_details: await getPetDetails(details.pets),
      };
    }

    if (booking.booking_type === "domestic_pet_transport") {
      const details = await ctx.db.get(
        booking.booking_id as Id<"domestic_pet_transport">,
      );

      if (!details) {
        return { booking, details: null, pet_details: [] };
      }

      return {
        booking,
        details,
        pet_details: await getPetDetails(details.pets),
      };
    }

    if (booking.booking_type === "rabies_serology_test") {
      const details = await ctx.db.get(booking.booking_id as Id<"rabies_serology_test">);

      if (!details) {
        return { booking, details: null, pet_details: [] };
      }

      return {
        booking,
        details,
        pet_details: await getPetDetails(details.pets),
      };
    }

    return { booking, details: null, pet_details: [] };
  },
});
