import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const bookDomesticPetTransport = mutation({
  args: {
    owner_name: v.string(),

    pickup_address: v.string(),
    destination: v.string(),

    contact_form: v.string(),
    account_name: v.string(),
    account_link: v.optional(v.string()),
    contact_number: v.string(),
    email_address: v.string(),

    travel_date: v.string(),
    date: v.string(),

    mode_of_transport: v.string(),

    pets: v.optional(v.array(v.id("pet_details"))),

    origin_full_address: v.string(),
    destination_full_address: v.string(),
  },

  handler: async (ctx, args) => {
    const newBookingDomesticPetTransport = await ctx.db.insert(
      "domestic_pet_transport",
      {
        owner_name: args.owner_name,
        pickup_address: args.pickup_address,
        destination: args.destination,
        contact_form: args.contact_form,
        account_name: args.account_name,
        account_link: args.account_link,
        contact_number: args.contact_number,
        email_address: args.email_address,
        travel_date: args.travel_date,
        date: args.date,
        mode_of_transport: args.mode_of_transport,
        pets: args.pets,
        origin_full_address: args.origin_full_address,
        destination_full_address: args.destination_full_address,
      },
    );

    // Create booking entry to track status
    await ctx.db.insert("bookings", {
      booking_id: String(newBookingDomesticPetTransport),
      booking_type: "domestic_pet_transport",
      booking_label: "Domestic Pet Transport",
      status: "pending",
      updated_at: Date.now(),
    });

    return newBookingDomesticPetTransport;
  },
});
