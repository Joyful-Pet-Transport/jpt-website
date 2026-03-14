import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const bookRabiesSerologyTest = mutation({
  args: {
    owner_name: v.string(),

    contact_form: v.string(),
    account_name: v.string(),
    account_link: v.optional(v.string()),
    contact_number: v.string(),
    email_address: v.string(),

    date: v.string(),

    pets: v.optional(v.array(v.id("pet_details"))),
  },

  handler: async (ctx, args) => {
    const newBookingRabiesSerologyTest = await ctx.db.insert(
      "rabies_serology_test",
      {
        owner_name: args.owner_name,
        contact_form: args.contact_form,
        account_name: args.account_name,
        account_link: args.account_link,
        contact_number: args.contact_number,
        email_address: args.email_address,
        date: args.date,
        pets: args.pets,
      },
    );

    // Create booking entry to track status
    await ctx.db.insert("bookings", {
      booking_id: String(newBookingRabiesSerologyTest),
      booking_type: "rabies_serology_test",
      booking_label: "Rabies Serology Test",
      status: "pending",
      updated_at: Date.now(),
    });

    return newBookingRabiesSerologyTest;
  },
});
