"use client";

import BodyText from "@/components/elements/text/BodyText";
import ConvexTable from "@/components/elements/table/ConvexTable";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import {
  deleteInquirySchema,
  inquiryStatusValues,
  InquiryStatusValue,
  markInquiryAsReadSchema,
  updateContactUsStatusSchema,
} from "@/components/schemas/inquiry-admin-schema";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useModal from "@/utils/hooks/useModal";
import { useMutation, useQuery } from "convex/react";
import dayjs from "dayjs";
import { copyInquiryDetailsToClipboard } from "@/utils/format/copyFormDetails";
import { Check, Copy, Eye, Mail, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type InquiryRow = {
  _id: Id<"contact_us">;
  _creationTime: number;
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  status?: string;
  created_at?: number;
  assigned_to?: Id<"users"> | null;
  assigned_user_name?: string;
  read_at?: number | null;
};

type TeamMemberOption = {
  id: Id<"users">;
  label: string;
};

type ToastState = {
  message: string;
  type: "success" | "error";
};

const statusFilters: { label: string; value: "" | InquiryStatusValue }[] = [
  { label: "All", value: "" },
  { label: "New", value: "new" },
  { label: "Assigned", value: "assigned" },
  { label: "Replied", value: "replied" },
  { label: "Closed", value: "closed" },
];

const normalizeStatus = (status?: string): InquiryStatusValue => {
  if (inquiryStatusValues.includes(status as InquiryStatusValue)) {
    return status as InquiryStatusValue;
  }

  return "new";
};

const toTitleCase = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

const truncateMessage = (value: string, maxLength = 100) => {
  if (!value || value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trimEnd()}...`;
};

const getStatusBadgeClass = (status: InquiryStatusValue) => {
  if (status === "new") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  if (status === "assigned") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (status === "replied") {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  return "border-slate-200 bg-slate-100 text-slate-600";
};

const InquiriesContent = () => {
  const modal = useModal();
  const users = useQuery(api.tables.users.get);
  const unreadCount = useQuery(api.tables.contact_us.getUnreadCount);
  const updateStatus = useMutation(api.mutations.contact_us.updateContactUsStatus);
  const markAsRead = useMutation(api.mutations.contact_us.markInquiryAsRead);
  const deleteInquiry = useMutation(api.mutations.contact_us.deleteInquiry);

  const [statusFilter, setStatusFilter] = useState<"" | InquiryStatusValue>("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [toast, setToast] = useState<ToastState | null>(null);

  const teamMembers = useMemo<TeamMemberOption[]>(() => {
    return (users || [])
      .filter((user) =>
        ["staff", "admin"].includes(String(user.role?.slug || "")),
      )
      .map((user) => ({
        id: user._id,
        label: user.name || user.email || user._id,
      }));
  }, [users]);

  const queryArgs = useMemo(
    () => ({
      status: statusFilter || undefined,
      sort_order: sortOrder,
    }),
    [sortOrder, statusFilter],
  );

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timeout);
  }, [toast]);

  const showToast = (message: string, type: "success" | "error" = "success") =>
    setToast({ message, type });

  const closeModal = () => modal.setShown(false);

  const handleUpdateStatus = async (
    inquiryId: Id<"contact_us">,
    status: InquiryStatusValue,
    assignedTo?: Id<"users"> | null,
    options?: { silent?: boolean },
  ) => {
    const validation = updateContactUsStatusSchema.safeParse({
      inquiryId: String(inquiryId),
      status,
      assigned_to:
        assignedTo === undefined
          ? undefined
          : assignedTo === null
            ? null
            : String(assignedTo),
    });

    if (!validation.success) {
      showToast(validation.error.issues[0]?.message || "Invalid status update.", "error");
      return false;
    }

    try {
      const payload: {
        inquiryId: Id<"contact_us">;
        status: InquiryStatusValue;
        assigned_to?: Id<"users"> | null;
      } = {
        inquiryId,
        status,
      };

      if (assignedTo !== undefined) {
        payload.assigned_to = assignedTo;
      }

      await updateStatus(payload);

      if (!options?.silent) {
        showToast("Inquiry status updated successfully.");
      }

      return true;
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Failed to update inquiry status.",
        "error",
      );
      return false;
    }
  };

  const handleMarkAsRead = async (
    inquiryId: Id<"contact_us">,
    options?: { silent?: boolean },
  ) => {
    const validation = markInquiryAsReadSchema.safeParse({
      inquiryId: String(inquiryId),
    });

    if (!validation.success) {
      showToast(validation.error.issues[0]?.message || "Invalid read request.", "error");
      return null;
    }

    try {
      const result = await markAsRead({ inquiryId });

      if (!options?.silent) {
        showToast("Inquiry marked as read.");
      }

      return result.read_at ?? null;
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Failed to mark inquiry as read.",
        "error",
      );
      return null;
    }
  };

  const handleDeleteInquiry = async (inquiryId: Id<"contact_us">) => {
    const validation = deleteInquirySchema.safeParse({
      inquiryId: String(inquiryId),
    });

    if (!validation.success) {
      showToast(validation.error.issues[0]?.message || "Invalid delete request.", "error");
      return false;
    }

    try {
      await deleteInquiry({ inquiryId });
      showToast("Inquiry deleted successfully.");
      closeModal();
      return true;
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to delete inquiry.", "error");
      return false;
    }
  };

  const openDeleteModal = (row: InquiryRow) => {
    modal.setModalComponent(
      <DeleteInquiryModal
        inquiry={row}
        onCancel={closeModal}
        onDelete={() => void handleDeleteInquiry(row._id)}
      />,
      "normal",
      undefined,
      "mt-4",
    );
    modal.setShown(true);
  };

  const openStatusModal = (row: InquiryRow) => {
    modal.setModalComponent(
      <InquiryStatusModal
        inquiry={row}
        teamMembers={teamMembers}
        onCancel={closeModal}
        onSubmit={async (status, assignedTo) => {
          const updated = await handleUpdateStatus(row._id, status, assignedTo);
          if (updated) {
            closeModal();
          }
        }}
      />,
      "normal",
      undefined,
      "mt-4",
    );
    modal.setShown(true);
  };

  const openPreviewModal = (row: InquiryRow) => {
    modal.setModalComponent(
      <InquiryPreviewModal
        inquiry={row}
        teamMembers={teamMembers}
        onClose={closeModal}
        onStatusUpdate={handleUpdateStatus}
        onMarkAsRead={handleMarkAsRead}
        onNotify={showToast}
      />,
      "large",
      undefined,
      "mt-4",
    );
    modal.setShown(true);
  };

  return (
    <DashboardHeading title="Inquiries">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {statusFilters.map((filter) => {
            const active = statusFilter === filter.value;

            return (
              <button
                key={filter.value || "all"}
                type="button"
                onClick={() => setStatusFilter(filter.value)}
                className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${
                  active
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700">
            Unread {unreadCount ?? 0}
          </span>
          <button
            type="button"
            onClick={() => setSortOrder("newest")}
            className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${
              sortOrder === "newest"
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
            }`}
          >
            Newest
          </button>
          <button
            type="button"
            onClick={() => setSortOrder("oldest")}
            className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${
              sortOrder === "oldest"
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
            }`}
          >
            Oldest
          </button>
        </div>
      </div>

      <ConvexTable
        query={api.tables.contact_us.getPaginated}
        queryArgs={queryArgs}
        searchable={true}
        headers={[
          {
            key: "first_name",
            label: "Name",
            parse: (value: string, row?: InquiryRow) => {
              const isRead = row?.read_at != null;
              const fullName = `${value || ""} ${row?.last_name || ""}`.trim();

              return (
                <span className={isRead ? "text-slate-400" : "font-semibold text-slate-900"}>
                  {fullName || "-"}
                </span>
              );
            },
          },
          {
            key: "email",
            label: "Email",
            parse: (value: string, row?: InquiryRow) => (
              <span className={row?.read_at != null ? "text-slate-400" : "font-semibold text-slate-900"}>
                {value}
              </span>
            ),
          },
          {
            key: "message",
            label: "Message Preview",
            parse: (value: string, row?: InquiryRow) => (
              <span className={row?.read_at != null ? "text-slate-400" : "font-semibold text-slate-900"}>
                {truncateMessage(value || "")}
              </span>
            ),
          },
          {
            key: "created_at",
            label: "Submitted",
            parse: (value: number, row?: InquiryRow) =>
              dayjs(value || row?._creationTime).format("MMM DD, YYYY hh:mm A"),
          },
          {
            key: "status",
            label: "Status",
            parse: (value: string) => {
              const status = normalizeStatus(value);

              return (
                <span
                  className={`inline-flex rounded-full border px-2 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusBadgeClass(
                    status,
                  )}`}
                >
                  {toTitleCase(status)}
                </span>
              );
            },
          },
          {
            key: "assigned_user_name",
            label: "Assigned To",
            parse: (value: string | undefined) => value || "Unassigned",
          },
          {
            key: "read_at",
            label: "Read",
            parse: (value: number | null) =>
              value == null ? (
                <span className="font-semibold text-rose-600">Unread</span>
              ) : (
                <span className="text-slate-400">Read</span>
              ),
          },
        ]}
        actions={[
          {
            label: "View",
            icon: <Eye className="h-4 w-4" />,
            onPress: (row) => openPreviewModal(row as InquiryRow),
          },
          {
            label: "Mark as Read",
            icon: <Check className="h-4 w-4" />,
            onPress: (row) => void handleMarkAsRead((row as InquiryRow)._id),
          },
          {
            label: "Change Status",
            icon: <RefreshCw className="h-4 w-4" />,
            onPress: (row) => openStatusModal(row as InquiryRow),
          },
          {
            label: "Delete",
            icon: <Trash2 className="h-4 w-4" />,
            onPress: (row) => openDeleteModal(row as InquiryRow),
          },
        ]}
      />

      {toast && (
        <div className="fixed right-4 top-4 z-120">
          <div
            className={`rounded-lg border px-4 py-3 shadow-md ${
              toast.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            <BodyText size="small">{toast.message}</BodyText>
          </div>
        </div>
      )}
    </DashboardHeading>
  );
};

type InquiryPreviewModalProps = {
  inquiry: InquiryRow;
  teamMembers: TeamMemberOption[];
  onClose: () => void;
  onStatusUpdate: (
    inquiryId: Id<"contact_us">,
    status: InquiryStatusValue,
    assignedTo?: Id<"users"> | null,
  ) => Promise<boolean>;
  onMarkAsRead: (
    inquiryId: Id<"contact_us">,
    options?: { silent?: boolean },
  ) => Promise<number | null>;
  onNotify: (message: string, type?: "success" | "error") => void;
};

const InquiryPreviewModal = ({
  inquiry,
  teamMembers,
  onClose,
  onStatusUpdate,
  onMarkAsRead,
  onNotify,
}: InquiryPreviewModalProps) => {
  const [status, setStatus] = useState<InquiryStatusValue>(
    normalizeStatus(inquiry.status),
  );
  const [assignedTo, setAssignedTo] = useState<Id<"users"> | null>(
    inquiry.assigned_to ?? null,
  );
  const [readAt, setReadAt] = useState<number | null>(inquiry.read_at ?? null);
  const [isSaving, setIsSaving] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    if (readAt != null) {
      return;
    }

    let active = true;

    void onMarkAsRead(inquiry._id, { silent: true }).then((timestamp) => {
      if (!active) {
        return;
      }

      if (timestamp) {
        setReadAt(timestamp);
      }
    });

    return () => {
      active = false;
    };
  }, [inquiry._id, onMarkAsRead, readAt]);

  const handleSave = async () => {
    setIsSaving(true);
    const updated = await onStatusUpdate(inquiry._id, status, assignedTo);
    setIsSaving(false);

    if (!updated) {
      return;
    }
  };

  const handleReply = () => {
    const subject = encodeURIComponent("Re: Your Joyful Pet Transport Inquiry");
    window.open(`mailto:${inquiry.email}?subject=${subject}`, "_blank");
  };

  const handleCopyEmail = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard is unavailable in this browser.");
      }

      await navigator.clipboard.writeText(inquiry.email);
      onNotify("Email copied to clipboard.");
    } catch (error) {
      onNotify(
        error instanceof Error ? error.message : "Failed to copy email address.",
        "error",
      );
    }
  };

  const handleCopyAllDetails = async () => {
    try {
      setIsCopying(true);
      await copyInquiryDetailsToClipboard(inquiry);
      onNotify("Copied to clipboard");
    } catch (error) {
      onNotify(
        error instanceof Error ? error.message : "Failed to copy inquiry details.",
        "error",
      );
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <BodyText weight="semibold" className="text-slate-900">
              {inquiry.first_name} {inquiry.last_name}
            </BodyText>
            <BodyText size="small" className="text-slate-600">
              {inquiry.email}
            </BodyText>
          </div>
          <div className="text-right">
            <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
              Submitted
            </BodyText>
            <BodyText size="small" className="text-slate-700">
              {dayjs(inquiry.created_at || inquiry._creationTime).format(
                "MMM DD, YYYY hh:mm A",
              )}
            </BodyText>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
          Message
        </BodyText>
        <BodyText size="small" className="mt-1 whitespace-pre-wrap text-slate-800">
          {inquiry.message}
        </BodyText>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
            Status
          </BodyText>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as InquiryStatusValue)}
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          >
            {inquiryStatusValues.map((option) => (
              <option key={option} value={option}>
                {toTitleCase(option)}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
            Assigned User
          </BodyText>
          <select
            value={assignedTo ?? ""}
            onChange={(event) =>
              setAssignedTo(
                event.target.value ? (event.target.value as Id<"users">) : null,
              )
            }
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Unassigned</option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
          Read Status
        </BodyText>
        <BodyText
          size="small"
          className={
            readAt == null ? "mt-1 font-semibold text-rose-600" : "mt-1 text-slate-600"
          }
        >
          {readAt == null
            ? "Unread"
            : `Read on ${dayjs(readAt).format("MMM DD, YYYY hh:mm A")}`}
        </BodyText>
      </div>

      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleReply}
            className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm text-blue-700 transition-all hover:bg-blue-50"
          >
            <Mail className="h-4 w-4" />
            Reply
          </button>
          <button
            type="button"
            onClick={() => void handleCopyAllDetails()}
            disabled={isCopying}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Copy className="h-4 w-4" />
            {isCopying ? "Copying..." : "Copy All Details"}
          </button>
          <button
            type="button"
            onClick={() => void handleCopyEmail()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition-all hover:bg-slate-50"
          >
            <Copy className="h-4 w-4" />
            Copy Email
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition-all hover:bg-slate-50"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={isSaving}
            className="rounded-lg border border-blue-200 bg-blue-600 px-3 py-1.5 text-sm text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

type InquiryStatusModalProps = {
  inquiry: InquiryRow;
  teamMembers: TeamMemberOption[];
  onCancel: () => void;
  onSubmit: (
    status: InquiryStatusValue,
    assignedTo?: Id<"users"> | null,
  ) => Promise<void>;
};

const InquiryStatusModal = ({
  inquiry,
  teamMembers,
  onCancel,
  onSubmit,
}: InquiryStatusModalProps) => {
  const [status, setStatus] = useState<InquiryStatusValue>(
    normalizeStatus(inquiry.status),
  );
  const [assignedTo, setAssignedTo] = useState<Id<"users"> | null>(
    inquiry.assigned_to ?? null,
  );
  const [isSaving, setIsSaving] = useState(false);

  return (
    <div className="space-y-4">
      <BodyText size="small" className="text-slate-700">
        Update status for{" "}
        <span className="font-semibold">
          {inquiry.first_name} {inquiry.last_name}
        </span>
        .
      </BodyText>

      <div className="space-y-2">
        <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
          Status
        </BodyText>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as InquiryStatusValue)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        >
          {inquiryStatusValues.map((option) => (
            <option key={option} value={option}>
              {toTitleCase(option)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
          Assigned User
        </BodyText>
        <select
          value={assignedTo ?? ""}
          onChange={(event) =>
            setAssignedTo(
              event.target.value ? (event.target.value as Id<"users">) : null,
            )
          }
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Unassigned</option>
          {teamMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition-all hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={isSaving}
          onClick={async () => {
            setIsSaving(true);
            await onSubmit(status, assignedTo);
            setIsSaving(false);
          }}
          className="rounded-lg border border-blue-200 bg-blue-600 px-3 py-1.5 text-sm text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Update"}
        </button>
      </div>
    </div>
  );
};

type DeleteInquiryModalProps = {
  inquiry: InquiryRow;
  onCancel: () => void;
  onDelete: () => void;
};

const DeleteInquiryModal = ({
  inquiry,
  onCancel,
  onDelete,
}: DeleteInquiryModalProps) => {
  return (
    <div className="space-y-4">
      <BodyText size="small" className="text-slate-700">
        Are you sure you want to delete the inquiry from{" "}
        <span className="font-semibold">
          {inquiry.first_name} {inquiry.last_name}
        </span>
        ? This action cannot be undone.
      </BodyText>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition-all hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg border border-rose-200 bg-rose-600 px-3 py-1.5 text-sm text-white transition-all hover:bg-rose-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default InquiriesContent;
