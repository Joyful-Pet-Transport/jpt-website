import z from "zod";
import PetDetailsSchema from "./pet-details-schema";
import { OwnerDetailsSchema } from "./owner-details";

const DomesticRelocationFormSchema = z.object({
  owner: OwnerDetailsSchema,

  pickup_address: z.string().min(1, "Please enter the pickup address address"),
  destination: z.string().min(1, "Please enter the destination address"),

  travel_date: z
    .string()
    .min(2, "Please indicate if you have a specific travel date"),
  date: z.string().min(3, "Please select a travel date"),

  mode_of_transport: z
    .string()
    .min(3, "Please choose the mode of transportation"),

  pets: z.array(PetDetailsSchema).min(1, "Please add at least one pet"),

  origin_full_address: z
    .string()
    .min(1, "Please enter the origin full address"),
  destination_full_address: z
    .string()
    .min(1, "Please enter the destination full address"),
});

export default DomesticRelocationFormSchema;
