"use client";

import WhiteCard from "@/components/card/WhiteCard";
import DynamicButton from "@/components/elements/button/DynamicButton";
import BodyText from "@/components/elements/text/BodyText";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  BookingStatusValue,
  BookingTypeValue,
  destructiveBookingStatuses,
  getValidTransitions,
} from "@/utils/config/bookingStatus";
import useModal from "@/utils/hooks/useModal";
import { useMutation } from "convex/react";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

type BookingStatusChangerProps = {
  bookingId: Id<"bookings">;
  currentStatus: string;
  bookingType?: string;
  previousStatus?: string;
  updatedAt?: number;
};

const BookingStatusChanger = ({
  bookingId,
  currentStatus,
  bookingType,
  previousStatus,
  updatedAt,
}: BookingStatusChangerProps) => {
  const modal = useModal();
  const updateBookingStatus = useMutation(api.mutations.bookings.updateBookingStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusReason, setStatusReason] = useState("");

  const normalizedStatus = currentStatus as BookingStatusValue;
  const normalizedBookingType = bookingType as BookingTypeValue | undefined;
  const normalizedPreviousStatus = previousStatus as BookingStatusValue | undefined;

  const transitions = useMemo(() => {
    if (!normalizedBookingType) {
      return [];
    }

    return getValidTransitions(
      normalizedStatus,
      normalizedBookingType,
      normalizedPreviousStatus,
    );
  }, [normalizedBookingType, normalizedPreviousStatus, normalizedStatus]);

  const handleSubmit = async (nextStatus: BookingStatusValue) => {
    if (!normalizedBookingType) {
      setError("Booking type is missing.");
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);
      await updateBookingStatus({
        bookingId,
        bookingType: normalizedBookingType,
        nextStatus,
        statusReason: statusReason.trim() || undefined,
      });

      setStatusReason("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update booking status.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const requestStatusChange = (nextStatus: BookingStatusValue) => {
    if (destructiveBookingStatuses.includes(nextStatus)) {
      modal.setModalComponent(
        <ConfirmStatusChangeModal
          nextStatus={nextStatus}
          onCancel={() => modal.setShown(false)}
          onConfirm={async () => {
            await handleSubmit(nextStatus);
            modal.setShown(false);
          }}
          loading={isSubmitting}
        />,
        "normal",
      );
      modal.setShown(true);
      return;
    }

    void handleSubmit(nextStatus);
  };

  return (
    <WhiteCard className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <BodyText weight="semibold" className="text-[#17528A]">
          Status Management
        </BodyText>
        <BodyText size="xsmall" className="uppercase tracking-wide text-blue-700">
          Last updated{" "}
          {updatedAt ? dayjs(updatedAt).format("MMM DD, YYYY hh:mm A") : "-"}
        </BodyText>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
        <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
          Current status
        </BodyText>
        <BodyText size="small" className="text-slate-900">
          {currentStatus.replaceAll("_", " ")}
        </BodyText>
      </div>

      <div className="space-y-2">
        <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
          Status reason (optional)
        </BodyText>
        <Textarea
          value={statusReason}
          onChange={(event) => setStatusReason(event.target.value)}
          placeholder="Add context for delayed, issue, cancelled, or rejected changes."
          className="min-h-20 border-slate-200 bg-white text-sm"
          maxLength={500}
        />
      </div>

      {error && <BodyText size="small" className="text-red-600">{error}</BodyText>}

      <div className="flex flex-wrap gap-2">
        {transitions.map((nextStatus) => (
          <button
            key={nextStatus}
            type="button"
            onClick={() => requestStatusChange(nextStatus)}
            disabled={isSubmitting}
            className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm capitalize text-blue-700 transition-all hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {nextStatus.replaceAll("_", " ")}
          </button>
        ))}
      </div>

      {!transitions.length && (
        <BodyText size="small" className="text-neutral-500">
          This booking is read-only for status updates.
        </BodyText>
      )}
    </WhiteCard>
  );
};

type ConfirmStatusChangeModalProps = {
  nextStatus: BookingStatusValue;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
  loading?: boolean;
};

const ConfirmStatusChangeModal = ({
  nextStatus,
  onCancel,
  onConfirm,
  loading = false,
}: ConfirmStatusChangeModalProps) => {
  return (
    <div className="mt-4 space-y-4">
      <BodyText size="small" className="text-neutral-700">
        Are you sure you want to set this booking to{" "}
        <span className="font-semibold">{nextStatus.replaceAll("_", " ")}</span>?
      </BodyText>
      <div className="flex flex-wrap justify-end gap-2">
        <DynamicButton
          type="outline"
          size="medium"
          className="min-w-24 px-4"
          onPress={onCancel}
          disabled={loading}
        >
          Cancel
        </DynamicButton>
        <DynamicButton
          type="default"
          size="medium"
          className="min-w-24 px-4"
          onPress={() => void onConfirm()}
          disabled={loading}
        >
          Confirm
        </DynamicButton>
      </div>
    </div>
  );
};

export default BookingStatusChanger;
