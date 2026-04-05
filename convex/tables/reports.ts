import { paginationOptsValidator } from "convex/server";
import { query } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { v } from "convex/values";

const SUPPORTED_BOOKING_TYPES = [
  "international_pet_transport",
  "domestic_pet_transport",
  "rabies_serology_test",
] as const;

const SERVICE_TYPE_LABELS: Record<(typeof SUPPORTED_BOOKING_TYPES)[number], string> = {
  international_pet_transport: "International Transport",
  domestic_pet_transport: "Domestic Transport",
  rabies_serology_test: "Rabies Test",
};

const REPORT_PERIOD_LABELS: Record<ReportTimePeriod, string> = {
  daily: "Last 24 Hours",
  weekly: "Last 7 Days",
  monthly: "Last 30 Days",
  all_time: "All Time",
};

const REPORT_PERIOD_WINDOW_MS: Record<
  Exclude<ReportTimePeriod, "all_time">,
  number
> = {
  daily: 24 * 60 * 60 * 1000,
  weekly: 7 * 24 * 60 * 60 * 1000,
  monthly: 30 * 24 * 60 * 60 * 1000,
};

const CANCELLED_STATUSES = new Set(["cancelled", "rejected"]);

type SupportedBookingType = (typeof SUPPORTED_BOOKING_TYPES)[number];
type ReportTimePeriod = "daily" | "weekly" | "monthly" | "all_time";

type BookingDoc = {
  _id: Id<"bookings">;
  _creationTime: number;
  booking_id?: string;
  booking_label?: string;
  booking_type?: string;
  status: string;
  updated_at?: number;
};

type ServiceDetails = {
  userId?: Id<"users">;
  owner_name?: string;
} | null;

const isSupportedBookingType = (
  value?: string,
): value is SupportedBookingType => {
  return SUPPORTED_BOOKING_TYPES.includes(value as SupportedBookingType);
};

const toCompletionRate = (completed: number, total: number) => {
  if (!total) {
    return 0;
  }

  return Math.round((completed / total) * 100);
};

const toPeriodStartTimestamp = (timePeriod: ReportTimePeriod, now: number) => {
  if (timePeriod === "all_time") {
    return null;
  }

  return now - REPORT_PERIOD_WINDOW_MS[timePeriod];
};

const toStatusBreakdown = (statusCounts: Record<string, number>) => {
  return Object.entries(statusCounts)
    .map(([status, count]) => ({
      status,
      count,
    }))
    .sort((a, b) => b.count - a.count);
};

export const getDashboardReports = query({
  args: {
    paginationOpts: paginationOptsValidator,
    time_period: v.union(
      v.literal("daily"),
      v.literal("weekly"),
      v.literal("monthly"),
      v.literal("all_time"),
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const periodStart = toPeriodStartTimestamp(args.time_period, now);

    const buildReportsQuery = () => {
      let queryBuilder = ctx.db.query("bookings").order("desc");

      if (periodStart !== null) {
        queryBuilder = queryBuilder.filter((queryBuilder) =>
          queryBuilder.gte(queryBuilder.field("_creationTime"), periodStart),
        );
      }

      return queryBuilder;
    };

    const allBookings = (await buildReportsQuery().collect()) as BookingDoc[];
    const bookingPageResult = await buildReportsQuery().paginate(args.paginationOpts);

    const baseServiceSummary = Object.fromEntries(
      SUPPORTED_BOOKING_TYPES.map((bookingType) => [
        bookingType,
        {
          booking_type: bookingType,
          service_label: SERVICE_TYPE_LABELS[bookingType],
          total_bookings: 0,
          completed_bookings: 0,
          pending_active_bookings: 0,
          cancelled_bookings: 0,
          completion_rate: 0,
          status_counts: {} as Record<string, number>,
          status_breakdown: [] as { status: string; count: number }[],
        },
      ]),
    ) as Record<
      SupportedBookingType,
      {
        booking_type: SupportedBookingType;
        service_label: string;
        total_bookings: number;
        completed_bookings: number;
        pending_active_bookings: number;
        cancelled_bookings: number;
        completion_rate: number;
        status_counts: Record<string, number>;
        status_breakdown: { status: string; count: number }[];
      }
    >;

    const totals = {
      total_bookings: 0,
      completed_bookings: 0,
      pending_active_bookings: 0,
      cancelled_bookings: 0,
      completion_rate: 0,
      status_counts: {} as Record<string, number>,
      status_breakdown: [] as { status: string; count: number }[],
    };

    allBookings.forEach((booking) => {
      const normalizedStatus = booking.status || "unknown";
      const bookingType = isSupportedBookingType(booking.booking_type)
        ? booking.booking_type
        : null;

      totals.total_bookings += 1;
      totals.status_counts[normalizedStatus] =
        (totals.status_counts[normalizedStatus] || 0) + 1;

      if (normalizedStatus === "completed") {
        totals.completed_bookings += 1;
      } else if (CANCELLED_STATUSES.has(normalizedStatus)) {
        totals.cancelled_bookings += 1;
      } else {
        totals.pending_active_bookings += 1;
      }

      if (!bookingType) {
        return;
      }

      const serviceSummary = baseServiceSummary[bookingType];
      serviceSummary.total_bookings += 1;
      serviceSummary.status_counts[normalizedStatus] =
        (serviceSummary.status_counts[normalizedStatus] || 0) + 1;

      if (normalizedStatus === "completed") {
        serviceSummary.completed_bookings += 1;
      } else if (CANCELLED_STATUSES.has(normalizedStatus)) {
        serviceSummary.cancelled_bookings += 1;
      } else {
        serviceSummary.pending_active_bookings += 1;
      }
    });

    totals.completion_rate = toCompletionRate(
      totals.completed_bookings,
      totals.total_bookings,
    );
    totals.status_breakdown = toStatusBreakdown(totals.status_counts);

    SUPPORTED_BOOKING_TYPES.forEach((bookingType) => {
      const serviceSummary = baseServiceSummary[bookingType];
      serviceSummary.completion_rate = toCompletionRate(
        serviceSummary.completed_bookings,
        serviceSummary.total_bookings,
      );
      serviceSummary.status_breakdown = toStatusBreakdown(
        serviceSummary.status_counts,
      );
    });

    const bookingPage = await Promise.all(
      bookingPageResult.page.map(async (booking) => {
        const normalizedBooking = booking as BookingDoc;
        const bookingType = isSupportedBookingType(normalizedBooking.booking_type)
          ? normalizedBooking.booking_type
          : undefined;

        let serviceDetails: ServiceDetails = null;

        if (bookingType && normalizedBooking.booking_id) {
          if (bookingType === "international_pet_transport") {
            serviceDetails = (await ctx.db.get(
              normalizedBooking.booking_id as Id<"international_pet_transport">,
            )) as ServiceDetails;
          } else if (bookingType === "domestic_pet_transport") {
            serviceDetails = (await ctx.db.get(
              normalizedBooking.booking_id as Id<"domestic_pet_transport">,
            )) as ServiceDetails;
          } else {
            serviceDetails = (await ctx.db.get(
              normalizedBooking.booking_id as Id<"rabies_serology_test">,
            )) as ServiceDetails;
          }
        }

        const owner = serviceDetails?.userId
          ? await ctx.db.get(serviceDetails.userId)
          : null;

        return {
          ...normalizedBooking,
          service_label: bookingType ? SERVICE_TYPE_LABELS[bookingType] : "Unknown Service",
          owner_name:
            owner?.name || owner?.owner_name || serviceDetails?.owner_name || "Unknown Owner",
        };
      }),
    );

    return {
      time_period: args.time_period,
      period_label: REPORT_PERIOD_LABELS[args.time_period],
      period_start: periodStart,
      period_end: now,
      generated_at: now,
      totals,
      service_summaries: SUPPORTED_BOOKING_TYPES.map(
        (bookingType) => baseServiceSummary[bookingType],
      ),
      bookings_page: bookingPage,
      continue_cursor: bookingPageResult.continueCursor,
      is_done: bookingPageResult.isDone,
    };
  },
});
