import { paginationOptsValidator } from "convex/server";
import { query } from "./../_generated/server";
import { v } from "convex/values";
import { Id } from "../_generated/dataModel";
import type { InquiryStatusValue } from "../../components/schemas/inquiry-admin-schema";
import { searchInquiries } from "../../utils/format/inquirySearch";

const inquiryStatuses: InquiryStatusValue[] = [
  "new",
  "assigned",
  "replied",
  "closed",
];

const toInquiryStatus = (value?: string) =>
  inquiryStatuses.includes(value as InquiryStatusValue)
    ? (value as InquiryStatusValue)
    : "new";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const inquiries = await ctx.db.query("contact_us").order("desc").collect();

    return await Promise.all(
      inquiries.map(async (inquiry) => {
        const assignedUser = inquiry.assigned_to
          ? await ctx.db.get(inquiry.assigned_to)
          : null;

        return {
          ...inquiry,
          status: toInquiryStatus(inquiry.status),
          created_at: inquiry.created_at ?? inquiry._creationTime,
          read_at: inquiry.read_at ?? null,
          assigned_to: inquiry.assigned_to ?? null,
          assigned_user_name:
            assignedUser?.name || assignedUser?.email || "Unassigned",
        };
      }),
    );
  },
});

export const getPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
    status: v.optional(v.string()),
    sort_order: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const search = args.search?.trim() ?? "";
    const status = args.status?.trim().toLowerCase();
    const order = args.sort_order === "oldest" ? "asc" : "desc";

    let q = ctx.db.query("contact_us").order(order);

    if (status && inquiryStatuses.includes(status as InquiryStatusValue)) {
      q = q.filter((q) => q.eq(q.field("status"), status));
    }

    const result =
      search === ""
        ? await q.paginate(args.paginationOpts)
        : searchInquiries(await q.collect(), search, args.paginationOpts);

    const page = await Promise.all(
      result.page.map(async (inquiry) => {
        const assignedUser = inquiry.assigned_to
          ? await ctx.db.get(inquiry.assigned_to as Id<"users">)
          : null;

        return {
          ...inquiry,
          status: toInquiryStatus(inquiry.status),
          created_at: inquiry.created_at ?? inquiry._creationTime,
          read_at: inquiry.read_at ?? null,
          assigned_to: inquiry.assigned_to ?? null,
          assigned_user_name:
            assignedUser?.name || assignedUser?.email || "Unassigned",
        };
      }),
    );

    return {
      ...result,
      page,
    };
  },
});

export const getUnreadCount = query({
  args: {},
  handler: async (ctx) => {
    const inquiries = await ctx.db.query("contact_us").collect();
    const unread = inquiries.filter((inquiry) => inquiry.read_at == null);

    return unread.length;
  },
});
