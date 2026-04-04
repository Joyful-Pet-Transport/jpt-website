import z from "zod";

export const OwnerDetailsSchema = z.object({
  owner_name: z.string().min(3, "Please enter the owner's name"),
  contact_form: z.string().min(3, "Please select where we can contact you"),
  account_name: z.string().min(3, "Please enter your account name"),
  account_link: z.string().optional(),
  contact_number: z.string().min(3, "Please enter a contact number"),
  email_address: z.string().email("Please enter a valid email address"),
});

export default OwnerDetailsSchema;
