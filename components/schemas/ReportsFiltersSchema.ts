import { z } from "zod";

export const reportTimePeriodValues = [
  "daily",
  "weekly",
  "monthly",
  "all_time",
] as const;

export const ReportsFiltersSchema = z.object({
  timePeriod: z.enum(reportTimePeriodValues),
});

export type ReportsFiltersValues = z.infer<typeof ReportsFiltersSchema>;
