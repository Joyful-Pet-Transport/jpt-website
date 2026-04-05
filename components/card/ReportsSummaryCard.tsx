"use client";

import BodyText from "@/components/elements/text/BodyText";
import WhiteCard from "./WhiteCard";

type ReportsSummaryCardProps = {
  serviceLabel: string;
  totalBookings: number;
  completedBookings: number;
  pendingActiveBookings: number;
  cancelledBookings: number;
  completionRate: number;
  statusBreakdown: { status: string; count: number }[];
  getStatusBadgeClass: (status: string) => string;
  formatStatusLabel: (status: string) => string;
};

const ReportsSummaryCard = ({
  serviceLabel,
  totalBookings,
  completedBookings,
  pendingActiveBookings,
  cancelledBookings,
  completionRate,
  statusBreakdown,
  getStatusBadgeClass,
  formatStatusLabel,
}: ReportsSummaryCardProps) => {
  return (
    <WhiteCard className="h-full gap-4 border-blue-100">
      <div className="space-y-1">
        <BodyText
          size="xsmall"
          className="uppercase tracking-wide text-slate-500"
        >
          Service Type
        </BodyText>
        <BodyText weight="bold" className="text-lg text-[#17528A]">
          {serviceLabel}
        </BodyText>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Metric label="Total" value={totalBookings} />
        <Metric label="Completed" value={completedBookings} />
        <Metric label="Pending / Active" value={pendingActiveBookings} />
        <Metric label="Cancelled" value={cancelledBookings} />
        <Metric label="Completion" value={`${completionRate}%`} />
      </div>

      <div className="space-y-2 border-t border-slate-200 pt-3">
        <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
          Status Breakdown
        </BodyText>
        {!statusBreakdown.length && (
          <BodyText size="small" className="text-slate-500">
            No bookings in this period.
          </BodyText>
        )}
        <div className="flex flex-wrap gap-2">
          {statusBreakdown.map((status) => (
            <span
              key={`${serviceLabel}-${status.status}`}
              className={`rounded-full border px-2 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusBadgeClass(
                status.status,
              )}`}
            >
              {formatStatusLabel(status.status)} ({status.count})
            </span>
          ))}
        </div>
      </div>
    </WhiteCard>
  );
};

const Metric = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-2">
      <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
        {label}
      </BodyText>
      <BodyText size="small" weight="semibold" className="text-slate-900">
        {value}
      </BodyText>
    </div>
  );
};

export default ReportsSummaryCard;
