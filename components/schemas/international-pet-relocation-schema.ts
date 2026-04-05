import z from "zod";
import PetDetailsSchema from "./pet-details-schema";
import { OwnerDetailsSchema } from "./owner-details";

const InternationalRelocationFormSchema = z.object({
  origin_country: z.string().min(2, "Please select an origin country"),
  destination: z.string().min(2, "Please select a destination country"),

  companionship: z.string().min(3, "Please choose how your pet will travel"),
  travel_date: z
    .string()
    .min(2, "Please indicate if you have a specific travel date"),
  date: z.string().min(3, "Please select a travel date"),

  owner: OwnerDetailsSchema,

  origin_full_address: z
    .string()
    .min(1, "Please enter the origin full address"),
  origin_city: z.string().min(1, "Please enter the origin city/district"),
  origin_state_province: z
    .string()
    .min(1, "Please enter the origin state/province"),
  origin_postal_code: z.string().min(1, "Please enter the origin postal code"),
  destination_full_address: z
    .string()
    .min(1, "Please enter the destination full address"),
  destination_city: z
    .string()
    .min(1, "Please enter the destination city/district"),
  destination_state_province: z
    .string()
    .min(1, "Please enter the destination state/province"),
  destination_postal_code: z
    .string()
    .min(1, "Please enter the destination postal code"),

  pets: z.array(PetDetailsSchema).min(1, "Please add at least one pet"),
});

export default InternationalRelocationFormSchema;
