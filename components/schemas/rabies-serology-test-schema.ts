import z from "zod";
import PetDetailsSchema from "./pet-details-schema";

const RabiesSerologyTestSchema = z.object({
  owner_name: z.string().min(3, "Please enter the owner's name"),

  contact_form: z.string().min(3, "Please select where we can contact you"),
  account_name: z.string().min(3, "Please enter your account name"),
  account_link: z.string().optional(),
  contact_number: z.string().min(3, "Please enter a contact number"),
  email_address: z.string().email("Please enter a valid email address"),

  date: z.string().min(1, "Please select the test date"),

  pets: z.array(PetDetailsSchema).min(1, "Please add at least one pet"),
});

export default RabiesSerologyTestSchema;
