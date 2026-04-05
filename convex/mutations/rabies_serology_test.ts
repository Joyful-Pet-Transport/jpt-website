import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const bookRabiesSerologyTest = mutation({
  args: {
    userId: v.id("users"),

    date: v.string(),

    pets: v.optional(v.array(v.id("pet_details"))),
  },

  handler: async (ctx, args) => {
    const newBookingRabiesSerologyTest = await ctx.db.insert(
      "rabies_serology_test",
      {
        userId: args.userId,
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
