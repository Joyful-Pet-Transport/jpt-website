import { z } from "zod";

export const BookingStatus = {
  // Initial
  pending: "pending",

  // Approval
  approved: "approved",
  rejected: "rejected",

  // Preparation
  preparing: "preparing",
  documents: "documents",
  health_check: "health_check",

  // Transport
  scheduled: "scheduled",
  in_transit: "in_transit",
  delivered: "delivered",

  // Completion
  completed: "completed",

  // Exceptions
  delayed: "delayed",
  cancelled: "cancelled",
  issue: "issue",
} as const;

export const BookingType = {
  international_pet_transport: "international_pet_transport",
  domestic_pet_transport: "domestic_pet_transport",
  rabies_serology_test: "rabies_serology_test",
} as const;

export type BookingStatusValue = (typeof BookingStatus)[keyof typeof BookingStatus];
export type BookingTypeValue = (typeof BookingType)[keyof typeof BookingType];

export const bookingStatusValues = Object.values(
  BookingStatus,
) as BookingStatusValue[];

export const bookingTypeValues = Object.values(BookingType) as BookingTypeValue[];

export const bookingStatusSchema = z.enum(bookingStatusValues as [BookingStatusValue, ...BookingStatusValue[]]);
export const bookingTypeSchema = z.enum(bookingTypeValues as [BookingTypeValue, ...BookingTypeValue[]]);

export const updateBookingStatusSchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required"),
  bookingType: bookingTypeSchema,
  nextStatus: bookingStatusSchema,
  statusReason: z
    .string()
    .trim()
    .max(500, "Status reason must be at most 500 characters")
    .optional(),
});

export const terminalBookingStatuses: BookingStatusValue[] = [
  BookingStatus.rejected,
  BookingStatus.cancelled,
];

export const exceptionBookingStatuses: BookingStatusValue[] = [
  BookingStatus.delayed,
  BookingStatus.issue,
];

export const destructiveBookingStatuses: BookingStatusValue[] = [
  BookingStatus.rejected,
  BookingStatus.cancelled,
];

const baseTransitions: Record<BookingStatusValue, BookingStatusValue[]> = {
  pending: [BookingStatus.approved, BookingStatus.rejected, BookingStatus.cancelled],
  approved: [BookingStatus.preparing, BookingStatus.cancelled],
  preparing: [
    BookingStatus.documents,
    BookingStatus.health_check,
    BookingStatus.delayed,
    BookingStatus.cancelled,
  ],
  documents: [
    BookingStatus.health_check,
    BookingStatus.scheduled,
    BookingStatus.delayed,
    BookingStatus.cancelled,
  ],
  health_check: [
    BookingStatus.scheduled,
    BookingStatus.delayed,
    BookingStatus.cancelled,
  ],
  scheduled: [BookingStatus.in_transit, BookingStatus.delayed, BookingStatus.cancelled],
  in_transit: [BookingStatus.delivered, BookingStatus.issue, BookingStatus.delayed],
  delivered: [BookingStatus.completed, BookingStatus.issue],
  completed: [BookingStatus.issue],
  rejected: [],
  cancelled: [],
  delayed: [],
  issue: [],
};

const bookingTypeOverrides: Partial<
  Record<BookingTypeValue, Partial<Record<BookingStatusValue, BookingStatusValue[]>>>
> = {
  domestic_pet_transport: {
    approved: [
      BookingStatus.preparing,
      BookingStatus.documents,
      BookingStatus.health_check,
      BookingStatus.scheduled,
      BookingStatus.cancelled,
    ],
    preparing: [
      BookingStatus.documents,
      BookingStatus.health_check,
      BookingStatus.scheduled,
      BookingStatus.delayed,
      BookingStatus.cancelled,
    ],
  },
  rabies_serology_test: {
    preparing: [
      BookingStatus.documents,
      BookingStatus.health_check,
      BookingStatus.completed,
      BookingStatus.delayed,
      BookingStatus.cancelled,
    ],
    documents: [
      BookingStatus.health_check,
      BookingStatus.completed,
      BookingStatus.delayed,
      BookingStatus.cancelled,
    ],
    health_check: [BookingStatus.completed, BookingStatus.delayed, BookingStatus.cancelled],
    scheduled: [],
    in_transit: [],
    delivered: [],
  },
};

const getResolvedTransitions = (
  currentStatus: BookingStatusValue,
  bookingType: BookingTypeValue,
) => {
  const overrides = bookingTypeOverrides[bookingType];
  return overrides?.[currentStatus] ?? baseTransitions[currentStatus] ?? [];
};

export const isExceptionBookingStatus = (status: BookingStatusValue) =>
  exceptionBookingStatuses.includes(status);

export const getValidTransitions = (
  currentStatus: BookingStatusValue,
  bookingType: BookingTypeValue,
  previousStatus?: BookingStatusValue,
) => {
  if (isExceptionBookingStatus(currentStatus)) {
    if (!previousStatus || isExceptionBookingStatus(previousStatus)) {
      return [];
    }

    return [previousStatus];
  }

  return getResolvedTransitions(currentStatus, bookingType);
};
