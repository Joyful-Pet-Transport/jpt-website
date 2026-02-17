import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const upsertReviews = mutation({
  args: {
    reviews: v.array(
      v.object({
        reviewId: v.string(),
        name: v.optional(v.string()),
        stars: v.number(),
        reviewUrl: v.optional(v.string()),
        text: v.optional(v.string()),
        reviewImageUrls: v.optional(v.array(v.string())),
        reviewerPhotoUrl: v.optional(v.string()),
        publishedAtDate: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    for (const review of args.reviews) {
      const exists = await ctx.db
        .query("google_reviews")
        .withIndex("by_reviewId", (q) => q.eq("reviewId", review.reviewId))
        .unique();

      if (!exists) {
        await ctx.db.insert("google_reviews", review);
      }
    }
  },
});
