// import { query, action, QueryCtx } from "../_generated/server";
// import { api } from "../_generated/api";
// import { Id } from "../_generated/dataModel";
// import { v } from "convex/values";

// // TS declaration for Convex env vars
// declare const process: {
//   env: {
//     APIFY_DATASET_ID: string;
//     APIFY_TOKEN: string;
//   };
// };

// // ----------------------------
// // Query: get latest 20 reviews
// // ----------------------------
// export const get = query({
//   args: {},
//   handler: async (ctx) => {
//     const reviews = await ctx.db
//       .query("google_reviews")
//       .filter((q) => q.neq(q.field("text"), undefined))
//       .collect();

//     return reviews.sort((a, b) => b.stars - a.stars);
//   },
// });

// export async function getReviewId(ctx: QueryCtx, reviewId: Id<"google_reviews">) {
//   return await ctx.db.get(reviewId);
// }

// export const getReview = query({
//   args: { reviewId: v.id("google_reviews") },
//   handler: async (ctx, args) => {
//     return await getReviewId(ctx, args.reviewId);
//   },
// });

// // ----------------------------
// // Action: fetch from Apify and insert
// // ----------------------------
// export const syncFromApify = action({
//   args: {},
//   handler: async (ctx) => {
//     const datasetId = process.env.APIFY_DATASET_ID;
//     const token = process.env.APIFY_TOKEN;

//     if (!datasetId || !token) {
//       throw new Error("APIFY_DATASET_ID or APIFY_TOKEN not set");
//     }

//     const response = await fetch(
//       `https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}`,
//     );

//     if (!response.ok) {
//       throw new Error(`Failed to fetch Apify dataset: ${response.status}`);
//     }

//     const data = await response.json();

//     if (!Array.isArray(data)) {
//       throw new Error("Unexpected Apify response format");
//     }

//     const reviews = data
//       .filter((item: any) => {
//         // Only process items that have required fields
//         return item.reviewId && item.stars && item.publishedAtDate;
//       })
//       .map((item: any) => {
//         const review: any = {
//           reviewId: item.reviewId,
//           stars: item.stars,
//           publishedAtDate: item.publishedAtDate,
//         };

//         // Only include optional fields if they exist
//         if (item.name) review.name = item.name;
//         if (item.reviewUrl) review.reviewUrl = item.reviewUrl;
//         if (item.text) review.text = item.text;
//         if (item.reviewImageUrls) review.reviewImageUrls = item.reviewImageUrls;
//         if (item.reviewerPhotoUrl)
//           review.reviewerPhotoUrl = item.reviewerPhotoUrl;

//         return review;
//       });

//     // ✅ Call the mutation using the API reference
//     await ctx.runMutation(api.mutations.google_reviews.upsertReviews, {
//       reviews,
//     });

//     return { success: true, count: reviews.length };
//   },
// });


import { query, action, QueryCtx } from "../_generated/server";
import { api } from "../_generated/api";
import { Id } from "../_generated/dataModel";
import { v } from "convex/values";

// TS declaration for Convex env vars
declare const process: {
  env: {
    APIFY_DATASET_ID: string;
    APIFY_TOKEN: string;
  };
};

interface ApifyReviewItem {
  reviewId?: string;
  stars?: number;
  publishedAtDate?: string;
  name?: string;
  reviewUrl?: string;
  text?: string;
  reviewImageUrls?: string[];
  reviewerPhotoUrl?: string;
}
// ----------------------------
// Query: get reviews with pagination
// ----------------------------
export const get = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10; // default to 10 instead of all

    const reviews = await ctx.db
      .query("google_reviews")
      .filter((q) => q.neq(q.field("text"), undefined))
      .take(limit);

    // Only return fields needed for the card list — skip heavy fields
    return reviews
      .sort((a, b) => b.stars - a.stars)
      .map((r) => ({
        _id: r._id,
        name: r.name,
        stars: r.stars,
        text: r.text,
        publishedAtDate: r.publishedAtDate,
        reviewerPhotoUrl: r.reviewerPhotoUrl,
        hasImages: (r.reviewImageUrls?.length ?? 0) > 0,
        // ❌ don't return reviewImageUrls here — fetch separately when needed
      }));
  },
});

// ----------------------------
// Query: get single review (with images) — only called when user clicks
// ----------------------------
export async function getReviewId(ctx: QueryCtx, reviewId: Id<"google_reviews">) {
  return await ctx.db.get(reviewId);
}

export const getReview = query({
  args: { reviewId: v.id("google_reviews") },
  handler: async (ctx, args) => {
    return await getReviewId(ctx, args.reviewId);
  },
});

// ----------------------------
// Action: fetch from Apify and insert
// ----------------------------
export const syncFromApify = action({
  args: {},
  handler: async (ctx) => {
    const datasetId = process.env.APIFY_DATASET_ID;
    const token = process.env.APIFY_TOKEN;

    if (!datasetId || !token) {
      throw new Error("APIFY_DATASET_ID or APIFY_TOKEN not set");
    }

    const response = await fetch(
      `https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Apify dataset: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Unexpected Apify response format");
    }

    const reviews = data
      .filter((item: ApifyReviewItem) => {
        return item.reviewId && item.stars && item.publishedAtDate;
      })
      .map((item: ApifyReviewItem) => {
        const review: ApifyReviewItem = {
          reviewId: item.reviewId,
          stars: item.stars,
          publishedAtDate: item.publishedAtDate,
        };

        if (item.name) review.name = item.name;
        if (item.reviewUrl) review.reviewUrl = item.reviewUrl;
        if (item.text) review.text = item.text;
        if (item.reviewImageUrls) review.reviewImageUrls = item.reviewImageUrls;
        if (item.reviewerPhotoUrl) review.reviewerPhotoUrl = item.reviewerPhotoUrl;

        return review;
      });

    await ctx.runMutation(api.mutations.google_reviews.upsertReviews, {
      reviews: reviews.map((review) => ({
        reviewId: review.reviewId!,
        name: review.name,
        stars: review.stars!,
        reviewUrl: review.reviewUrl,
        text: review.text,
        reviewImageUrls: review.reviewImageUrls,
        reviewerPhotoUrl: review.reviewerPhotoUrl,
        publishedAtDate: review.publishedAtDate!,
      })),
    });

    return { success: true, count: reviews.length };
  },
});