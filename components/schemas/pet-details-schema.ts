import z from "zod";

const PetDetailsSchema = z.object({
  pet_name: z.string().min(3, "Please enter your pet's name"),
  breed: z.string().min(3, "Please enter your pet's breed"),
  sex: z.string().min(1, "Please select your pet's sex"),
  pet_birthday: z.string().min(3, "Please select your pet's date of birth"),
  pet_age_years: z.string().min(1, "Please enter your pet's age in years"),
  pet_age_months: z.string().min(1, "Please enter your pet's age in months"),
  pet_weight: z.string().min(1, "Please enter your pet's weight"),
  pet_condition: z.string().optional(),
  special_instructions: z.string().optional(),
  pet_image: z
    .array(z.instanceof(File))
    .min(1, "Please upload your pet's latest photo")
    .refine((files) => !files || files.length === 0 || files[0].size > 0, {
      message: "Please upload a valid image",
    }),
});

export default PetDetailsSchema;
