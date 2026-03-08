import { query, QueryCtx } from "./../_generated/server";
import { Id } from "./../_generated/dataModel";

export async function getPetById(ctx: QueryCtx, petId: Id<"pet_details">) {
  return await ctx.db.get(petId);
}

export const get = query({
  args: {},
  handler: async (ctx) => {
    const services = await ctx.db.query("pet_details").collect();

    const servicesWithUrls = await Promise.all(
      services.map(async (pet) => {
        let imageUrl = "/images/logo/logo.png";

        if (pet.pet_image) {
          // Check if it's already a URL path (starts with /)
          if (pet.pet_image.startsWith("/")) {
            imageUrl = pet.pet_image;
          } else {
            // It's a storage ID, get the URL
            imageUrl =
              (await ctx.storage.getUrl(pet.pet_image)) ||
              "/images/logo/logo.png";
          }
        }

        return {
          ...pet,
          image: imageUrl,
        };
      }),
    );

    return servicesWithUrls;
  },
});
