import { z } from "zod";

export const InquiryStatus = {
  new: "new",
  assigned: "assigned",
  replied: "replied",
  closed: "closed",
} as const;

export type InquiryStatusValue =
  (typeof InquiryStatus)[keyof typeof InquiryStatus];

export const inquiryStatusValues = Object.values(
  InquiryStatus,
) as InquiryStatusValue[];

export const inquiryStatusSchema = z.enum(
  inquiryStatusValues as [InquiryStatusValue, ...InquiryStatusValue[]],
);

export const updateContactUsStatusSchema = z.object({
  inquiryId: z.string().min(1, "Inquiry ID is required"),
  status: inquiryStatusSchema,
  assigned_to: z.string().nullable().optional(),
});

export const markInquiryAsReadSchema = z.object({
  inquiryId: z.string().min(1, "Inquiry ID is required"),
});

export const deleteInquirySchema = z.object({
  inquiryId: z.string().min(1, "Inquiry ID is required"),
});
