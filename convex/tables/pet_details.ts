import { QueryCtx } from "./../_generated/server";
import { Id } from "./../_generated/dataModel";

export async function getPetById(ctx: QueryCtx, petId: Id<"pet_details">) {
  return await ctx.db.get(petId);
}
