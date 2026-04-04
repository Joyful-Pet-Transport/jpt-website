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
    booking_type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("bookings").order("desc");
    if (args.booking_type) {
      q = q.filter((q) => q.eq(q.field("booking_type"), args.booking_type));
    }
    const result = await q.paginate(args.paginationOpts);

    const page = await Promise.all(
      result.page.map(async (booking) => {
        let details:
          | {
              userId?: Id<"users">;
              owner_name?: string;
              email_address?: string;
              contact_form?: string;
              contact_number?: string;
              account_name?: string;
              account_link?: string;
            }
          | null = null;

        if (
          booking.booking_type === "international_pet_transport" &&
          booking.booking_id
        ) {
          details = await ctx.db.get(
            booking.booking_id as Id<"international_pet_transport">,
          );
        } else if (
          booking.booking_type === "domestic_pet_transport" &&
          booking.booking_id
        ) {
          details = await ctx.db.get(
            booking.booking_id as Id<"domestic_pet_transport">,
          );
        } else if (
          booking.booking_type === "rabies_serology_test" &&
          booking.booking_id
        ) {
          details = await ctx.db.get(
            booking.booking_id as Id<"rabies_serology_test">,
          );
        }

        let owner = null;
        if (details?.userId) {
          owner = await ctx.db.get(details.userId as Id<"users">);
        }

        return {
          ...booking,
          owner_name: owner?.name || owner?.owner_name || details?.owner_name || "",
          email_address: owner?.email || details?.email_address || "",
          contact_form: owner?.contact_form || details?.contact_form || "",
          contact_number: owner?.contact_number || details?.contact_number || "",
          account_name: owner?.account_name || details?.account_name || "",
          account_link: owner?.account_link || details?.account_link || "",
        };
      }),
    );

    return {
      ...result,
      page,
    };
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
            (await ctx.storage.getUrl(pet.pet_image)) ||
            "/images/logo/logo.png";

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
      const details = await ctx.db.get(
        booking.booking_id as Id<"rabies_serology_test">,
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

    return { booking, details: null, pet_details: [] };
  },
});
