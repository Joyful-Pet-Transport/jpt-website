import { query, action, QueryCtx } from "../_generated/server";
import { api } from "../_generated/api";
import { Id } from "../_generated/dataModel";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

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
// Query: get reviews with infinite scroll pagination
// ----------------------------
export const get = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("google_reviews")
      .withIndex("by_publishedAtDate")
      .filter((q) => q.neq(q.field("text"), undefined))
      .order("desc")
      .paginate(args.paginationOpts);

    return {
      ...result,
      page: result.page.map((r) => ({
        _id: r._id,
        name: r.name,
        stars: r.stars,
        text: r.text,
        publishedAtDate: r.publishedAtDate,
        reviewerPhotoUrl: r.reviewerPhotoUrl,
        previewImageUrl: r.reviewImageUrls?.[0] ?? null,
        imageCount: r.reviewImageUrls?.length ?? 0,
      })),
    };
  },
});

// ----------------------------
// Query: get reviews for homepage carousel — small fixed set
// ----------------------------
export const getForCarousel = query({
  args: {},
  handler: async (ctx) => {
    const reviews = await ctx.db
      .query("google_reviews")
      .withIndex("by_publishedAtDate")
      .filter((q) => q.neq(q.field("text"), undefined))
      .order("desc")
      .take(15);

    return reviews.map((r) => ({
      _id: r._id,
      name: r.name,
      stars: r.stars,
      text: r.text,
      publishedAtDate: r.publishedAtDate,
      reviewerPhotoUrl: r.reviewerPhotoUrl,
    }));
  },
});

export async function getReviewId(
  ctx: QueryCtx,
  reviewId: Id<"google_reviews">
) {
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
      `https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Apify dataset: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Unexpected Apify response format");
    }

    const reviews = (data as ApifyReviewItem[])
      .filter(
        (item) =>
          item.reviewId &&
          item.stars !== undefined &&
          item.stars >= 4 &&
          item.publishedAtDate &&
          item.text &&
          item.text.trim().length > 0
      )
      .map((item) => {
        const review: {
          reviewId: string;
          stars: number;
          publishedAtDate: string;
          name?: string;
          reviewUrl?: string;
          text?: string;
          reviewImageUrls?: string[];
          reviewerPhotoUrl?: string;
        } = {
          reviewId: item.reviewId!,
          stars: item.stars!,
          publishedAtDate: item.publishedAtDate!,
        };

        if (item.name) review.name = item.name;
        if (item.reviewUrl) review.reviewUrl = item.reviewUrl;
        if (item.text) review.text = item.text;
        if (item.reviewImageUrls) review.reviewImageUrls = item.reviewImageUrls;
        if (item.reviewerPhotoUrl) review.reviewerPhotoUrl = item.reviewerPhotoUrl;

        return review;
      });

    await ctx.runMutation(api.mutations.google_reviews.upsertReviews, {
      reviews,
    });

    return { success: true, count: reviews.length };
  },
});