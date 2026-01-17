import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  booking_process: defineTable({
    step: v.float64(),
    title: v.string(),
  }),

  services: defineTable({
    description: v.string(),
    image: v.string(),
    title: v.string(),
  }),
});
