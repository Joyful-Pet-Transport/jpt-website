import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  booking_process: defineTable({
    step: v.float64(),
    title: v.string(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
  }),

  services: defineTable({
    description: v.string(),
    image: v.string(),
    title: v.string(),
  }),

  frequently_asked_questions: defineTable({
    question: v.string(),
    answer: v.string(),
  }),
});
