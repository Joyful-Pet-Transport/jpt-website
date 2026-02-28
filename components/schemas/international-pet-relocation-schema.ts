import z from "zod";
import PetDetailsSchema from "./pet-details-schema";

const InternationalRelocationFormSchema = z.object({
  origin_country: z.string().min(2, "Please select an origin country"),
  destination: z.string().min(2, "Please select a destination country"),

  companionship: z.string().min(3, "Please choose how your pet will travel"),
  travel_date: z
    .string()
    .min(2, "Please indicate if you have a specific travel date"),
  date: z.string().min(3, "Please select a travel date"),

  owner_name: z.string().min(3, "Please enter the owner's name"),
  contact_form: z.string().min(3, "Please select where we can contact you"),
  account_name: z.string().min(3, "Please enter your account name"),
  account_link: z.string().optional(),
  contact_number: z.string().min(3, "Please enter a contact number"),
  email_address: z.string().email("Please enter a valid email address"),

  origin_full_address: z
    .string()
    .min(1, "Please enter the origin full address"),
  destination_full_address: z
    .string()
    .min(1, "Please enter the destination full address"),

  pets: z.array(PetDetailsSchema).min(1, "Please add at least one pet"),
});

export default InternationalRelocationFormSchema;
