import z from "zod";
import PetDetailsSchema from "./pet-details-schema";
import { OwnerDetailsSchema } from "./owner-details";

const RabiesSerologyTestSchema = z.object({
  owner: OwnerDetailsSchema,

  date: z.string().min(1, "Please select the test date"),

  pets: z.array(PetDetailsSchema).min(1, "Please add at least one pet"),
});

export default RabiesSerologyTestSchema;
