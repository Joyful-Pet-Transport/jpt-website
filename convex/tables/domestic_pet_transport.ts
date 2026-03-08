import { query } from "./../_generated/server";
import { getPetById } from "./pet_details";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const internationalPetTransport = await ctx.db
      .query("domestic_pet_transport")
      .collect();

    const bookingsWithPets = await Promise.all(
      internationalPetTransport.map(async (booking) => {
        let pet_details = null;

        if (booking.pets?.length) {
          pet_details = await Promise.all(
            booking.pets.map((petId) => getPetById(ctx, petId)),
          );
        }

        return {
          ...booking,
          pet_details,
        };
      }),
    );

    return bookingsWithPets;
  },
});
