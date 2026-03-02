import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const InquirySchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export type InquiryFormData = z.infer<typeof InquirySchema>;

export const useInquiryForm = () => {
  return useForm<InquiryFormData>({
    resolver: zodResolver(InquirySchema),
    defaultValues: {
      message: "",
    },
  });
};
