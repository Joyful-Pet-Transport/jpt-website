import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createBooking = mutation({
  args: {
    booking_id: v.optional(v.string()),
    booking_label: v.optional(v.string()),
    booking_type: v.optional(v.string()),
  },

  handler: async (convexToJson, args) => {
    const newCreateBooking = await convexToJson.db.insert("bookings", {
      booking_id: args.booking_id,
      booking_label: args.booking_label,
      booking_type: args.booking_type,
      status: "pending",
    });

    return newCreateBooking;
  },
});
