"use client";

import WhiteCard from "@/components/card/WhiteCard";
import BodyText from "@/components/elements/text/BodyText";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  BookingDealStatusValue,
  bookingDealStatusValues,
  normalizeDealStatus,
} from "@/utils/config/bookingStatus";
import { useMutation, useQuery } from "convex/react";
import { useMemo, useState } from "react";

type BookingDealChangerProps = {
  bookingId: Id<"bookings">;
  dealStatus?: string;
  assignedTo?: Id<"users"> | null;
};

const formatDealStatus = (value: string) =>
  value
    .replaceAll("_", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const BookingDealChanger = ({
  bookingId,
  dealStatus,
  assignedTo,
}: BookingDealChangerProps) => {
  const users = useQuery(api.tables.users.get);
  const updateBookingDeal = useMutation(api.mutations.bookings.updateBookingDeal);

  const [status, setStatus] = useState<BookingDealStatusValue>(
    normalizeDealStatus(dealStatus),
  );
  const [assignedUser, setAssignedUser] = useState<Id<"users"> | null>(
    assignedTo ?? null,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const teamMembers = useMemo(
    () =>
      (users || [])
        .filter((user) =>
          ["staff", "admin"].includes(String(user.role?.slug || "")),
        )
        .map((user) => ({
          id: user._id,
          label: user.name || user.email || user._id,
        })),
    [users],
  );

  const handleSave = async () => {
    try {
      setError(null);
      setSaved(false);
      setIsSaving(true);
      await updateBookingDeal({
        bookingId,
        deal_status: status,
        assigned_to: assignedUser,
      });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update booking.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <WhiteCard className="space-y-4">
      <BodyText weight="semibold" className="text-[#17528A]">
        Deal Status
      </BodyText>

      <div className="space-y-2">
        <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
          Status
        </BodyText>
        <select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value as BookingDealStatusValue);
            setSaved(false);
          }}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        >
          {bookingDealStatusValues.map((option) => (
            <option key={option} value={option}>
              {formatDealStatus(option)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
          Assigned User
        </BodyText>
        <select
          value={assignedUser ?? ""}
          onChange={(event) => {
            setAssignedUser(
              event.target.value ? (event.target.value as Id<"users">) : null,
            );
            setSaved(false);
          }}
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

      {error && (
        <BodyText size="small" className="text-red-600">
          {error}
        </BodyText>
      )}
      {saved && !error && (
        <BodyText size="small" className="text-emerald-600">
          Booking updated successfully.
        </BodyText>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={isSaving}
          className="rounded-lg border border-blue-200 bg-blue-600 px-3 py-1.5 text-sm text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </WhiteCard>
  );
};

export default BookingDealChanger;
