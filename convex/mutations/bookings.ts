import { mutation, MutationCtx } from "../_generated/server";
import { v } from "convex/values";
import { Id } from "../_generated/dataModel";
import {
  BookingStatusValue,
  BookingType,
  BookingTypeValue,
  exceptionBookingStatuses,
  getValidTransitions,
  isExceptionBookingStatus,
  updateBookingDealSchema,
  updateBookingStatusSchema,
} from "../../utils/config/bookingStatus";

export const createBooking = mutation({
  args: {
    booking_id: v.optional(v.string()),
    booking_label: v.optional(v.string()),
    booking_type: v.optional(v.string()),
  },

  handler: async (convexToJson, args) => {
    const now = Date.now();

    const newCreateBooking = await convexToJson.db.insert("bookings", {
      booking_id: args.booking_id,
      booking_label: args.booking_label,
      booking_type: args.booking_type,
      status: "pending",
      created_at: now,
      updated_at: now,
    });

    return newCreateBooking;
  },
});

export const updateBookingStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    bookingType: v.string(),
    nextStatus: v.string(),
    statusReason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const parsed = updateBookingStatusSchema.safeParse({
      bookingId: String(args.bookingId),
      bookingType: args.bookingType,
      nextStatus: args.nextStatus,
      statusReason: args.statusReason,
    });

    if (!parsed.success) {
      throw new Error(parsed.error.issues[0]?.message || "Invalid status update payload.");
    }

    const booking = await ctx.db.get(args.bookingId);
    if (!booking) {
      throw new Error("Booking not found.");
    }

    if (!booking.booking_type) {
      throw new Error("Booking type is missing.");
    }

    if (booking.booking_type !== args.bookingType) {
      throw new Error("Booking type mismatch.");
    }

    const bookingType = booking.booking_type as BookingTypeValue;
    const serviceBookingId = booking.booking_id;
    if (!serviceBookingId) {
      throw new Error("Booking reference is missing.");
    }

    const serviceExists = await getServiceBookingByType(
      ctx,
      bookingType,
      serviceBookingId,
    );

    if (!serviceExists) {
      throw new Error("Linked service booking record was not found.");
    }

    const currentStatus = booking.status as BookingStatusValue;
    const nextStatus = args.nextStatus as BookingStatusValue;
    const previousStatus = booking.previous_status as BookingStatusValue | undefined;

    const validTransitions = getValidTransitions(
      currentStatus,
      bookingType,
      previousStatus,
    );

    if (!validTransitions.includes(nextStatus)) {
      throw new Error(
        `Invalid transition from "${currentStatus}" to "${nextStatus}" for "${bookingType}".`,
      );
    }

    const trimmedReason = args.statusReason?.trim();
    const statusReason = trimmedReason && trimmedReason.length > 0 ? trimmedReason : undefined;

    const isMovingToException = exceptionBookingStatuses.includes(nextStatus);
    const isReturningFromException = isExceptionBookingStatus(currentStatus);
    const now = Date.now();

    const nextPreviousStatus = isMovingToException
      ? isExceptionBookingStatus(currentStatus)
        ? previousStatus
        : currentStatus
      : isReturningFromException
        ? undefined
        : booking.previous_status;

    await ctx.db.patch(args.bookingId, {
      status: nextStatus,
      updated_at: now,
      previous_status: nextPreviousStatus,
      status_reason: statusReason,
    });

    console.info("booking_status_changed", {
      bookingId: args.bookingId,
      bookingType,
      from: currentStatus,
      to: nextStatus,
      reason: statusReason,
      changedAt: now,
    });

    return {
      bookingId: args.bookingId,
      previousStatus: currentStatus,
      status: nextStatus,
      updatedAt: now,
    };
  },
});

const getServiceBookingByType = async (
  ctx: MutationCtx,
  bookingType: BookingTypeValue,
  bookingId: string,
) => {
  if (bookingType === BookingType.international_pet_transport) {
    return await ctx.db.get(bookingId as Id<"international_pet_transport">);
  }

  if (bookingType === BookingType.domestic_pet_transport) {
    return await ctx.db.get(bookingId as Id<"domestic_pet_transport">);
  }

  if (bookingType === BookingType.rabies_serology_test) {
    return await ctx.db.get(bookingId as Id<"rabies_serology_test">);
  }

  return null;
};

export const updateBookingDeal = mutation({
  args: {
    bookingId: v.id("bookings"),
    deal_status: v.string(),
    assigned_to: v.optional(v.union(v.id("users"), v.null())),
  },
  handler: async (ctx, args) => {
    const parsed = updateBookingDealSchema.safeParse({
      bookingId: String(args.bookingId),
      deal_status: args.deal_status,
      assigned_to:
        args.assigned_to === undefined
          ? undefined
          : args.assigned_to === null
            ? null
            : String(args.assigned_to),
    });

    if (!parsed.success) {
      throw new Error(
        parsed.error.issues[0]?.message || "Invalid booking deal payload.",
      );
    }

    const booking = await ctx.db.get(args.bookingId);
    if (!booking) {
      throw new Error("Booking not found.");
    }

    if (args.assigned_to && !(await ctx.db.get(args.assigned_to))) {
      throw new Error("Assigned user was not found.");
    }

    const now = Date.now();
    const patch: {
      deal_status: string;
      updated_at: number;
      assigned_to?: typeof args.assigned_to;
    } = {
      deal_status: parsed.data.deal_status,
      updated_at: now,
    };

    if (args.assigned_to !== undefined) {
      patch.assigned_to = args.assigned_to;
    }

    await ctx.db.patch(args.bookingId, patch);

    return {
      bookingId: args.bookingId,
      deal_status: parsed.data.deal_status,
      assigned_to:
        args.assigned_to !== undefined
          ? args.assigned_to
          : booking.assigned_to ?? null,
      updatedAt: now,
    };
  },
});
