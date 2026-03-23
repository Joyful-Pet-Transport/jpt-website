import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const bookInternationalPetTransport = mutation({
  args: {
    origin_country: v.string(),
    destination: v.string(),

    companionship: v.string(),
    travel_date: v.string(),
    date: v.string(),

    owner_name: v.string(),
    contact_form: v.string(),
    account_name: v.string(),
    account_link: v.optional(v.string()),
    contact_number: v.string(),
    email_address: v.string(),
    pets: v.optional(v.array(v.id("pet_details"))),

    origin_full_address: v.string(),
    origin_city: v.string(),
    origin_state_province: v.string(),
    origin_postal_code: v.string(),
    origin_address_country: v.string(),
    destination_full_address: v.string(),
    destination_city: v.string(),
    destination_state_province: v.string(),
    destination_postal_code: v.string(),
    destination_address_country: v.string(),
  },

  handler: async (ctx, args) => {
    const newBookingInternationalPetTransport = await ctx.db.insert(
      "international_pet_transport",
      {
        origin_country: args.origin_country,
        destination: args.destination,
        companionship: args.companionship,
        travel_date: args.travel_date,
        date: args.date,
        owner_name: args.owner_name,
        contact_form: args.contact_form,
        account_name: args.account_name,
        account_link: args.account_link,
        contact_number: args.contact_number,
        email_address: args.email_address,
        pets: args.pets,
        origin_full_address: args.origin_full_address,
        origin_city: args.origin_city,
        origin_state_province: args.origin_state_province,
        origin_postal_code: args.origin_postal_code,
        origin_address_country: args.origin_address_country,
        destination_full_address: args.destination_full_address,
        destination_city: args.destination_city,
        destination_state_province: args.destination_state_province,
        destination_postal_code: args.destination_postal_code,
        destination_address_country: args.destination_address_country,
      },
    );

    // Create booking entry to track status
    await ctx.db.insert("bookings", {
      booking_id: String(newBookingInternationalPetTransport),
      booking_type: "international_pet_transport",
      booking_label: "International Pet Transport",
      status: "pending",
      updated_at: Date.now(),
    });

    return newBookingInternationalPetTransport;
  },
});
