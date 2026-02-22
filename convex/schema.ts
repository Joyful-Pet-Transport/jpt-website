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
    slug: v.optional(v.string()),
  }),

  frequently_asked_questions: defineTable({
    question: v.string(),
    answer: v.string(),
  }),

  post_services: defineTable({
    name: v.string(),
    description: v.string(),
    image: v.optional(v.string()),
    link: v.string(),
  }),

  google_reviews: defineTable({
    reviewId: v.string(),
    name: v.optional(v.string()),
    stars: v.number(),
    reviewUrl: v.optional(v.string()),
    text: v.optional(v.string()),

    reviewImageUrls: v.optional(v.array(v.string())),
    reviewerPhotoUrl: v.optional(v.string()),
    publishedAtDate: v.string(),
  })
    .index("by_reviewId", ["reviewId"])
    .index("by_publishedAtDate", ["publishedAtDate"]),

  pet_details: defineTable({
    pet_name: v.string(),
    breed: v.string(),
    sex: v.string(),
    pet_birthday: v.string(),
    pet_age: v.string(),
    pet_weight: v.string(),
    pet_condition: v.string(),
    special_instructions: v.string(),
    pet_image: v.id("_storage"),
  }),

  international_pet_transport: defineTable({
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

    origin_full_address: v.string(),
    destination_full_address: v.string(),

    pets: v.optional(v.array(v.id("pet_details"))),
  }).index("by_pets", ["pets"]),
});
