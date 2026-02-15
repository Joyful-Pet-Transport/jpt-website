import { query } from "./../_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const services = await ctx.db.query("post_services").collect();

    const servicesWithUrls = await Promise.all(
      services.map(async (post) => {
        let imageUrl = "/images/logo/logo.png";
        
        if (post.image) {
          // Check if it's already a URL path (starts with /)
          if (post.image.startsWith("/")) {
            imageUrl = post.image;
          } else {
            // It's a storage ID, get the URL
            imageUrl = (await ctx.storage.getUrl(post.image)) || "/images/logo/logo.png";
          }
        }

        return {
          ...post,
          image: imageUrl,
        };
      }),
    );

    return servicesWithUrls;
  },
});
