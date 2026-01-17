import { query } from "./../_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const services = await ctx.db.query("services").collect();

    const servicesWithUrls = await Promise.all(
      services.map(async (service) => {
        let imageUrl = service.image;
        if (service.image) {
          imageUrl =
            (await ctx.storage.getUrl(service.image)) ||
            "/images/logo/logo.png";
        }

        return {
          ...service,
          image: imageUrl,
        };
      })
    );

    return servicesWithUrls;
  },
});
