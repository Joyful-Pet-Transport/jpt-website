import { action } from "./_generated/server";
import { api } from "./_generated/api";

interface SyncResult {
  success: boolean;
  count: number;
}

// This action can be called externally to trigger the weekly sync
// You can call this from a scheduler like GitHub Actions, Vercel Cron Jobs, etc.
export const triggerWeeklySync = action({
  args: {},
  handler: async (ctx): Promise<SyncResult> => {
    console.log("Starting weekly Google reviews sync from Apify");

    try {
      const result = await ctx.runAction(
        api.tables.google_reviews.syncFromApify,
      );
      console.log(`Weekly sync completed: ${result.count} reviews processed`);
      return { success: true, count: result.count };
    } catch (error) {
      console.error("Weekly review sync failed:", error);
      throw error;
    }
  },
});
