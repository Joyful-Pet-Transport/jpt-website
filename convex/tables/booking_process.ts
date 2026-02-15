import { query } from "./../_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const bookingProcess = await ctx.db.query("booking_process").collect();

    const bookingProcessWithUrls = await Promise.all(
      bookingProcess.map(async (post) => {
        let imageUrl = "/images/logo/logo.png";

        if (post.icon) {
          // Check if it's already a URL path (starts with /)
          if (post.icon.startsWith("/")) {
            imageUrl = post.icon;
          } else {
            // It's a storage ID, get the URL
            imageUrl =
              (await ctx.storage.getUrl(post.icon)) || "/images/logo/logo.png";
          }
        }

        return {
          ...post,
          icon: imageUrl,
        };
      }),
    );

    return bookingProcessWithUrls;
  },
});
