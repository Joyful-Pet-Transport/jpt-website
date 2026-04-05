"use client";

import ReportsSummaryCard from "@/components/card/ReportsSummaryCard";
import WhiteCard from "@/components/card/WhiteCard";
import DynamicButton from "@/components/elements/button/DynamicButton";
import BodyText from "@/components/elements/text/BodyText";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import {
  ReportsFiltersSchema,
  ReportsFiltersValues,
} from "@/components/schemas/ReportsFiltersSchema";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "convex/react";
import dayjs from "dayjs";
import { FileDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const TIME_PERIOD_OPTIONS: {
  label: string;
  value: ReportsFiltersValues["timePeriod"];
}[] = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "All Time", value: "all_time" },
];

const getStatusBadgeClass = (status: string) => {
  if (status === "completed") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "pending" || status === "preparing" || status === "approved") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (status === "in_transit" || status === "scheduled") {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (status === "cancelled" || status === "rejected") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  if (status === "delayed" || status === "issue") {
    return "border-orange-200 bg-orange-50 text-orange-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
};

const formatStatusLabel = (value: string) => value.replaceAll("_", " ");

type ReportsQueryResult = {
  time_period: ReportsFiltersValues["timePeriod"];
  period_label: string;
  period_start: number | null;
  period_end: number;
  generated_at: number;
  totals: {
    total_bookings: number;
    completed_bookings: number;
    pending_active_bookings: number;
    cancelled_bookings: number;
    completion_rate: number;
    status_breakdown: { status: string; count: number }[];
  };
  service_summaries: {
    booking_type: string;
    service_label: string;
    total_bookings: number;
    completed_bookings: number;
    pending_active_bookings: number;
    cancelled_bookings: number;
    completion_rate: number;
    status_breakdown: { status: string; count: number }[];
  }[];
  bookings_page: {
    _id: Id<"bookings">;
    _creationTime: number;
    booking_id?: string;
    booking_label?: string;
    booking_type?: string;
    service_label: string;
    status: string;
    updated_at?: number;
    owner_name: string;
  }[];
  continue_cursor: string | null;
  is_done: boolean;
};

const ReportsContent = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [cursorStack, setCursorStack] = useState<(string | null)[]>([null]);

  const reportsFilterForm = useForm<ReportsFiltersValues>({
    resolver: zodResolver(ReportsFiltersSchema),
    defaultValues: {
      timePeriod: "all_time",
    },
  });

  const {
    watch,
    setValue,
    formState: { errors },
  } = reportsFilterForm;

  const selectedTimePeriod = watch("timePeriod");
  const currentCursor = cursorStack[cursorStack.length - 1];

  const reportsResult = useQuery(api.tables.reports.getDashboardReports, {
    paginationOpts: { numItems: 10, cursor: currentCursor },
    time_period: selectedTimePeriod,
  }) as ReportsQueryResult | undefined;

  useEffect(() => {
    setCursorStack([null]);
  }, [selectedTimePeriod]);

  const periodDisplay = useMemo(() => {
    if (!reportsResult) {
      return "Loading date range...";
    }

    if (reportsResult.period_start === null) {
      return `All records up to ${dayjs(reportsResult.period_end).format("MMM DD, YYYY hh:mm A")}`;
    }

    return `${dayjs(reportsResult.period_start).format("MMM DD, YYYY hh:mm A")} - ${dayjs(reportsResult.period_end).format("MMM DD, YYYY hh:mm A")}`;
  }, [reportsResult]);

  const kpiCards = useMemo(
    () => [
      {
        label: "Total Bookings",
        value: reportsResult ? reportsResult.totals.total_bookings : "...",
        subtitle: "All services combined",
      },
      {
        label: "Completion Rate",
        value: reportsResult ? `${reportsResult.totals.completion_rate}%` : "...",
        subtitle: "Completed vs total bookings",
      },
      {
        label: "Pending Count",
        value: reportsResult ? reportsResult.totals.pending_active_bookings : "...",
        subtitle: "Active operational load",
      },
    ],
    [reportsResult],
  );

  const handleTimePeriodChange = (nextTimePeriod: ReportsFiltersValues["timePeriod"]) => {
    setValue("timePeriod", nextTimePeriod, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const hasPrev = cursorStack.length > 1;
  const hasNext =
    !!reportsResult?.continue_cursor && reportsResult.is_done === false;

  const handleNextPage = () => {
    if (!reportsResult?.continue_cursor || reportsResult.is_done) {
      return;
    }

    setCursorStack((prev) => [...prev, reportsResult.continue_cursor]);
  };

  const handlePreviousPage = () => {
    if (!hasPrev) {
      return;
    }

    setCursorStack((prev) => prev.slice(0, -1));
  };

  const handleExportToPdf = async () => {
    if (!reportsResult) {
      alert("Report data is still loading. Please try again in a moment.");
      return;
    }

    try {
      setIsExporting(true);
      const { jsPDF } = await import("jspdf");

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const page = {
        width: 210,
        height: 297,
        margin: 8,
      };

      const card = {
        x: page.margin,
        y: page.margin,
        width: page.width - page.margin * 2,
        height: page.height - page.margin * 2,
      };

      const addStyledPage = () => {
        doc.setFillColor(242, 244, 248);
        doc.rect(0, 0, page.width, page.height, "F");
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(card.x, card.y, card.width, card.height, 3, 3, "F");
      };

      addStyledPage();

      const leftPadding = card.x + 8;
      const rightLimit = card.x + card.width - 8;
      const cardBottom = card.y + card.height - 12;
      let y = card.y + 10;

      const ensureSpace = (neededSpace = 12) => {
        if (y + neededSpace <= cardBottom) {
          return;
        }

        doc.addPage();
        addStyledPage();
        y = card.y + 12;
      };

      const drawHeader = () => {
        doc.setFillColor(24, 82, 138);
        doc.roundedRect(card.x, card.y, card.width, 28, 3, 3, "F");
        doc.setFillColor(24, 82, 138);
        doc.rect(card.x, card.y + 20, card.width, 8, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(17);
        doc.setTextColor(255, 255, 255);
        doc.text("Dashboard Reports", leftPadding, card.y + 10);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(225, 236, 248);
        doc.text(`Period: ${reportsResult.period_label}`, leftPadding, card.y + 16);
        doc.text(
          `Generated: ${dayjs(reportsResult.generated_at).format("MMM DD, YYYY hh:mm A")}`,
          leftPadding,
          card.y + 21,
        );
        y = card.y + 36;
      };

      const drawKpiCards = () => {
        const cardWidth = (rightLimit - leftPadding - 6) / 2;
        const cardHeight = 20;
        const kpiEntries = [
          ["Total Bookings", String(reportsResult.totals.total_bookings)],
          ["Completion Rate", `${reportsResult.totals.completion_rate}%`],
          ["Pending / Active", String(reportsResult.totals.pending_active_bookings)],
        ];

        kpiEntries.forEach((entry, index) => {
          const row = Math.floor(index / 2);
          const column = index % 2;
          const x = leftPadding + column * (cardWidth + 6);
          const yOffset = y + row * (cardHeight + 4);

          doc.setFillColor(247, 249, 252);
          doc.setDrawColor(223, 229, 238);
          doc.roundedRect(x, yOffset, cardWidth, cardHeight, 2, 2, "FD");

          doc.setFont("helvetica", "bold");
          doc.setFontSize(8);
          doc.setTextColor(95, 103, 113);
          doc.text(entry[0], x + 3, yOffset + 6);

          doc.setFont("helvetica", "bold");
          doc.setFontSize(13);
          doc.setTextColor(24, 82, 138);
          doc.text(entry[1], x + 3, yOffset + 14);
        });

        const rowCount = Math.ceil(kpiEntries.length / 2);
        y += rowCount * cardHeight + (rowCount - 1) * 4 + 6;
      };

      const drawServiceBreakdown = () => {
        ensureSpace(20);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(24, 82, 138);
        doc.text("Service Breakdown", leftPadding, y);
        y += 5;

        reportsResult.service_summaries.forEach((summary) => {
          const statusText = summary.status_breakdown.length
            ? summary.status_breakdown
                .slice(0, 4)
                .map((item) => `${formatStatusLabel(item.status)} (${item.count})`)
                .join(", ")
            : "No bookings";

          const statusLines = doc.splitTextToSize(statusText, rightLimit - leftPadding - 6) as string[];
          const sectionHeight = 17 + statusLines.length * 3.8;

          ensureSpace(sectionHeight + 4);

          doc.setFillColor(247, 249, 252);
          doc.setDrawColor(223, 229, 238);
          doc.roundedRect(
            leftPadding - 1,
            y - 2,
            rightLimit - leftPadding + 2,
            sectionHeight,
            2,
            2,
            "FD",
          );

          doc.setFont("helvetica", "bold");
          doc.setFontSize(9.5);
          doc.setTextColor(24, 82, 138);
          doc.text(summary.service_label, leftPadding + 1, y + 3);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(8);
          doc.setTextColor(80, 87, 98);
          doc.text(
            `Total: ${summary.total_bookings}   Completed: ${summary.completed_bookings}   Pending/Active: ${summary.pending_active_bookings}   Cancelled: ${summary.cancelled_bookings}   Completion: ${summary.completion_rate}%`,
            leftPadding + 1,
            y + 8.5,
          );

          doc.text(statusLines, leftPadding + 1, y + 13);
          y += sectionHeight + 3;
        });
      };

      const drawDetailedTable = () => {
        ensureSpace(18);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(24, 82, 138);
        doc.text("Detailed Bookings Table", leftPadding, y);
        y += 5;

        const columns = [
          { label: "Booking", width: 26 },
          { label: "Owner", width: 32 },
          { label: "Service", width: 30 },
          { label: "Status", width: 24 },
          { label: "Created", width: 33 },
          { label: "Updated", width: 33 },
        ];
        const rowHeight = 7;

        const drawTableHeader = () => {
          doc.setFillColor(232, 242, 252);
          doc.setDrawColor(211, 226, 241);
          doc.roundedRect(leftPadding, y, rightLimit - leftPadding, rowHeight, 1, 1, "FD");

          let x = leftPadding + 1.5;
          columns.forEach((column) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(7.6);
            doc.setTextColor(24, 82, 138);
            doc.text(column.label, x, y + 4.6);
            x += column.width;
          });
          y += rowHeight + 1;
        };

        drawTableHeader();

        reportsResult.bookings_page.forEach((booking) => {
          if (y + rowHeight > cardBottom) {
            doc.addPage();
            addStyledPage();
            y = card.y + 12;
            drawTableHeader();
          }

          doc.setDrawColor(232, 236, 243);
          doc.line(leftPadding, y + rowHeight, rightLimit, y + rowHeight);

          const values = [
            booking.booking_label || booking.booking_id || booking._id,
            booking.owner_name || "Unknown Owner",
            booking.service_label || booking.booking_type || "Unknown Service",
            formatStatusLabel(booking.status || "unknown"),
            dayjs(booking._creationTime).format("MMM DD, YYYY"),
            dayjs(booking.updated_at || booking._creationTime).format("MMM DD, YYYY"),
          ];

          let x = leftPadding + 1.5;
          values.forEach((value, index) => {
            const maxTextWidth = columns[index].width - 3;
            const clippedValue = doc.splitTextToSize(String(value), maxTextWidth)[0] || "-";

            doc.setFont("helvetica", "normal");
            doc.setFontSize(7.2);
            doc.setTextColor(78, 85, 95);
            doc.text(clippedValue, x, y + 4.6);

            x += columns[index].width;
          });

          y += rowHeight;
        });
      };

      drawHeader();
      drawKpiCards();
      drawServiceBreakdown();
      drawDetailedTable();

      const totalPages = doc.getNumberOfPages();
      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
        doc.setPage(pageNumber);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(114, 123, 134);
        doc.text(
          `Joyful Pet Transport - Page ${pageNumber} of ${totalPages}`,
          card.x + 8,
          page.height - 6,
        );
      }

      const fileName = `reports-${selectedTimePeriod}-${dayjs().format("YYYYMMDD-HHmmss")}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error("Failed to export reports PDF:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DashboardHeading title="Reports">
      <WhiteCard className="gap-4 border-blue-100">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <BodyText weight="bold" className="text-2xl text-[#17528A]">
              Reports
            </BodyText>
            <BodyText size="small" className="text-slate-600">
              {periodDisplay}
            </BodyText>
          </div>

          <DynamicButton
            type="default"
            size="medium"
            className="flex w-full px-4! sm:w-auto"
            onPress={() => void handleExportToPdf()}
            disabled={isExporting || !reportsResult}
          >
            <span className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              {isExporting ? "Exporting..." : "Export to PDF"}
            </span>
          </DynamicButton>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="space-y-2 border-t border-slate-200 pt-4"
        >
          <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
            Time Period
          </BodyText>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {TIME_PERIOD_OPTIONS.map((option) => (
              <DynamicButton
                key={option.value}
                type={selectedTimePeriod === option.value ? "default" : "outline"}
                size="medium"
                className="w-full px-4! sm:w-auto"
                onPress={() => handleTimePeriodChange(option.value)}
              >
                {option.label}
              </DynamicButton>
            ))}
          </div>
          {errors.timePeriod?.message && (
            <BodyText size="xsmall" className="text-rose-600">
              {errors.timePeriod.message}
            </BodyText>
          )}
        </form>
      </WhiteCard>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {kpiCards.map((card) => (
          <WhiteCard key={card.label} className="gap-1 border-blue-100">
            <BodyText
              size="xsmall"
              className="uppercase tracking-wide text-slate-500"
            >
              {card.label}
            </BodyText>
            <BodyText weight="bold" className="text-3xl text-[#17528A]">
              {card.value}
            </BodyText>
            <BodyText size="xsmall" className="text-slate-500">
              {card.subtitle}
            </BodyText>
          </WhiteCard>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(reportsResult?.service_summaries || []).map((summary) => (
          <ReportsSummaryCard
            key={summary.booking_type}
            serviceLabel={summary.service_label}
            totalBookings={summary.total_bookings}
            completedBookings={summary.completed_bookings}
            pendingActiveBookings={summary.pending_active_bookings}
            cancelledBookings={summary.cancelled_bookings}
            completionRate={summary.completion_rate}
            statusBreakdown={summary.status_breakdown}
            getStatusBadgeClass={getStatusBadgeClass}
            formatStatusLabel={formatStatusLabel}
          />
        ))}
      </div>

      <WhiteCard className="gap-4 border-blue-100">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <BodyText weight="semibold" className="text-lg text-[#17528A]">
            Detailed Bookings Report
          </BodyText>
          {reportsResult && (
            <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
              Generated {dayjs(reportsResult.generated_at).format("MMM DD, YYYY hh:mm A")}
            </BodyText>
          )}
        </div>

        {!reportsResult && (
          <BodyText size="small" className="text-slate-500">
            Loading report data...
          </BodyText>
        )}

        {reportsResult && reportsResult.bookings_page.length === 0 && (
          <BodyText size="small" className="text-slate-500">
            No booking records found for the selected period.
          </BodyText>
        )}

        {reportsResult && reportsResult.bookings_page.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-[980px] w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Booking ID / Label
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Owner Name
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Service Type
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Status
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Created Date
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Updated Date
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportsResult.bookings_page.map((booking, index) => (
                    <tr
                      key={booking._id}
                      className={
                        index % 2 === 0
                          ? "border-b border-slate-200 bg-white"
                          : "border-b border-slate-200 bg-slate-50/40"
                      }
                    >
                      <td className="px-3 py-2">
                        <BodyText size="small" className="text-slate-800">
                          {booking.booking_label || booking.booking_id || booking._id}
                        </BodyText>
                      </td>
                      <td className="px-3 py-2">
                        <BodyText size="small" className="text-slate-700">
                          {booking.owner_name}
                        </BodyText>
                      </td>
                      <td className="px-3 py-2">
                        <BodyText size="small" className="text-slate-700">
                          {booking.service_label}
                        </BodyText>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`inline-flex rounded-full border px-2 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusBadgeClass(
                            booking.status,
                          )}`}
                        >
                          {formatStatusLabel(booking.status)}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <BodyText size="small" className="text-slate-700">
                          {dayjs(booking._creationTime).format("MMM DD, YYYY hh:mm A")}
                        </BodyText>
                      </td>
                      <td className="px-3 py-2">
                        <BodyText size="small" className="text-slate-700">
                          {dayjs(booking.updated_at || booking._creationTime).format(
                            "MMM DD, YYYY hh:mm A",
                          )}
                        </BodyText>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <Link
                          href={`/dashboard/bookings/${booking._id}`}
                          className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 transition-all hover:bg-blue-50"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between gap-2">
              <BodyText size="small" className="text-slate-500">
                Page {cursorStack.length}
              </BodyText>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={!hasPrev}
                  className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm text-blue-700 transition-all hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={!hasNext}
                  className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm text-blue-700 transition-all hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </WhiteCard>
    </DashboardHeading>
  );
};

export default ReportsContent;
