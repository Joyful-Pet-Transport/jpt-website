import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { internal } from "../_generated/api";
import {
  InquiryStatus,
  deleteInquirySchema,
  markInquiryAsReadSchema,
  updateContactUsStatusSchema,
} from "../../components/schemas/inquiry-admin-schema";

export const createContactUs = mutation({
  args: {
    first_name: v.string(),
    last_name: v.string(),
    email: v.string(),
    message: v.string(),
  },

  handler: async (ctx, args) => {
    const now = Date.now();

    const newCreateContactUs = await ctx.db.insert("contact_us", {
      first_name: args.first_name,
      last_name: args.last_name,
      email: args.email,
      message: args.message,
      status: InquiryStatus.new,
      created_at: now,
      assigned_to: null,
      read_at: null,
    });

    await ctx.scheduler.runAfter(
      0,
      internal.actions.contact_us.sendInquiryEmails,
      {
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email,
        message: args.message,
      },
    );

    return newCreateContactUs;
  },
});

export const updateContactUsStatus = mutation({
  args: {
    inquiryId: v.id("contact_us"),
    status: v.string(),
    assigned_to: v.optional(v.union(v.id("users"), v.null())),
  },
  handler: async (ctx, args) => {
    const parsed = updateContactUsStatusSchema.safeParse({
      inquiryId: String(args.inquiryId),
      status: args.status,
      assigned_to:
        args.assigned_to === undefined
          ? undefined
          : args.assigned_to === null
            ? null
            : String(args.assigned_to),
    });

    if (!parsed.success) {
      throw new Error(
        parsed.error.issues[0]?.message || "Invalid inquiry status payload.",
      );
    }

    const inquiry = await ctx.db.get(args.inquiryId);
    if (!inquiry) {
      throw new Error("Inquiry not found.");
    }

    if (args.assigned_to && !(await ctx.db.get(args.assigned_to))) {
      throw new Error("Assigned user was not found.");
    }

    const patch: {
      status: "new" | "assigned" | "replied" | "closed";
      assigned_to?: typeof args.assigned_to;
    } = {
      status: parsed.data.status,
    };

    if (args.assigned_to !== undefined) {
      patch.assigned_to = args.assigned_to;
    }

    await ctx.db.patch(args.inquiryId, patch);

    return {
      inquiryId: args.inquiryId,
      status: parsed.data.status,
      assigned_to:
        args.assigned_to !== undefined
          ? args.assigned_to
          : inquiry.assigned_to ?? null,
    };
  },
});

export const markInquiryAsRead = mutation({
  args: {
    inquiryId: v.id("contact_us"),
  },
  handler: async (ctx, args) => {
    const parsed = markInquiryAsReadSchema.safeParse({
      inquiryId: String(args.inquiryId),
    });

    if (!parsed.success) {
      throw new Error(
        parsed.error.issues[0]?.message || "Invalid inquiry read payload.",
      );
    }

    const inquiry = await ctx.db.get(args.inquiryId);
    if (!inquiry) {
      throw new Error("Inquiry not found.");
    }

    if (inquiry.read_at) {
      return {
        inquiryId: args.inquiryId,
        read_at: inquiry.read_at,
      };
    }

    const read_at = Date.now();
    await ctx.db.patch(args.inquiryId, { read_at });

    return {
      inquiryId: args.inquiryId,
      read_at,
    };
  },
});

export const deleteInquiry = mutation({
  args: {
    inquiryId: v.id("contact_us"),
  },
  handler: async (ctx, args) => {
    const parsed = deleteInquirySchema.safeParse({
      inquiryId: String(args.inquiryId),
    });

    if (!parsed.success) {
      throw new Error(
        parsed.error.issues[0]?.message || "Invalid inquiry delete payload.",
      );
    }

    const inquiry = await ctx.db.get(args.inquiryId);
    if (!inquiry) {
      throw new Error("Inquiry not found.");
    }

    await ctx.db.delete(args.inquiryId);

    return {
      inquiryId: args.inquiryId,
      deleted: true,
    };
  },
});
