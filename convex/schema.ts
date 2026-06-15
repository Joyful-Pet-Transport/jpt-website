import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    roleId: v.optional(v.id("roles")),
    owner_name: v.optional(v.string()),
    contact_number: v.optional(v.string()),
    contact_form: v.optional(v.string()),
    account_name: v.optional(v.string()),
    account_link: v.optional(v.string()),
    pets: v.optional(v.array(v.id("pet_details"))),
  })
    .index("email", ["email"])
    .index("by_name", ["name"]),

  roles: defineTable({
    name: v.string(),
    slug: v.string(),
  }).index("by_slug", ["slug"]),

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

  contact_us: defineTable({
    first_name: v.string(),
    last_name: v.string(),
    email: v.string(),
    message: v.string(),
    status: v.optional(
      v.union(
        v.literal("new"),
        v.literal("assigned"),
        v.literal("replied"),
        v.literal("closed"),
      ),
    ),
    created_at: v.optional(v.number()),
    assigned_to: v.optional(v.union(v.id("users"), v.null())),
    read_at: v.optional(v.union(v.number(), v.null())),
  })
    .index("by_status", ["status"])
    .index("by_created_at", ["created_at"])
    .index("by_assigned_to", ["assigned_to"]),

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
    pet_condition: v.optional(v.string()),
    special_instructions: v.optional(v.string()),
    pet_image: v.id("_storage"),
  }),

  international_pet_transport: defineTable({
    origin_country: v.string(),
    destination: v.string(),

    companionship: v.string(),
    travel_date: v.string(),
    date: v.string(),

    userId: v.optional(v.id("users")),
    owner_name: v.optional(v.string()),
    contact_form: v.optional(v.string()),
    account_name: v.optional(v.string()),
    account_link: v.optional(v.string()),
    contact_number: v.optional(v.string()),
    email_address: v.optional(v.string()),

    origin_full_address: v.string(),
    origin_city: v.optional(v.string()), // ← optional
    origin_state_province: v.optional(v.string()), // ← optional
    origin_postal_code: v.optional(v.string()), // ← optional
    origin_address_country: v.optional(v.string()), // ← optional
    destination_full_address: v.optional(v.string()), // ← optional
    destination_city: v.optional(v.string()), // ← optional
    destination_state_province: v.optional(v.string()), // ← optional
    destination_postal_code: v.optional(v.string()), // ← optional
    destination_address_country: v.optional(v.string()), // ← optional

    pets: v.optional(v.array(v.id("pet_details"))),
  }).index("by_pets", ["pets"]),

  domestic_pet_transport: defineTable({
    userId: v.optional(v.id("users")),
    owner_name: v.optional(v.string()),
    contact_form: v.optional(v.string()),
    account_name: v.optional(v.string()),
    account_link: v.optional(v.string()),
    contact_number: v.optional(v.string()),
    email_address: v.optional(v.string()),

    pickup_address: v.string(),
    destination: v.string(),

    travel_date: v.string(),
    date: v.string(),

    mode_of_transport: v.string(),

    pets: v.optional(v.array(v.id("pet_details"))),

    origin_full_address: v.string(),
    destination_full_address: v.string(),
  }).index("by_pets", ["pets"]),

  rabies_serology_test: defineTable({
    userId: v.optional(v.id("users")),
    owner_name: v.optional(v.string()),
    contact_form: v.optional(v.string()),
    account_name: v.optional(v.string()),
    account_link: v.optional(v.string()),
    contact_number: v.optional(v.string()),
    email_address: v.optional(v.string()),

    date: v.string(),

    pets: v.optional(v.array(v.id("pet_details"))),
  }),

  available_countries: defineTable({
    name: v.string(),
    code: v.string(),
    available: v.boolean(),
  })
    .index("by_code", ["code"])
    .index("by_name", ["name"]),

  bookings: defineTable({
    booking_id: v.optional(v.string()),
    booking_label: v.optional(v.string()),
    booking_type: v.optional(v.string()),
    status: v.string(),
    created_at: v.optional(v.number()),
    updated_at: v.optional(v.number()),
    previous_status: v.optional(v.string()),
    status_reason: v.optional(v.string()),
  })
    .index("by_created_at", ["created_at"])
    .index("by_booking_type", ["booking_type"]),


  heroSlides: defineTable({
    imageUrl: v.string(),
    petName: v.string(),
    route: v.string(),
    order: v.number(),
  })
});

