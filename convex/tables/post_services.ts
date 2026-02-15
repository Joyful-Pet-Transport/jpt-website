import { query } from "./../_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const services = await ctx.db.query("post_services").collect();

    const servicesWithUrls = await Promise.all(
      services.map(async (post) => {
        let imageUrl = post.image;
        if (post.image) {
          imageUrl =
            (await ctx.storage.getUrl(post.image)) || "/images/logo/logo.png";
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
