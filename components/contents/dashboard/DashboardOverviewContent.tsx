"use client";

import WhiteCard from "@/components/card/WhiteCard";
import BodyText from "@/components/elements/text/BodyText";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

type DashboardBookingRow = {
  _id: string;
  _creationTime: number;
  booking_label?: string;
  booking_type?: string;
  owner_name?: string;
  status: string;
  updated_at?: number;
};

type BookingRecord = {
  _creationTime: number;
  booking_type?: string;
  status: string;
  updated_at?: number;
};

type InquiryRecord = {
  _id: string;
  _creationTime: number;
  email: string;
  first_name: string;
  last_name: string;
  message: string;
};

type KpiCard = {
  label: string;
  subtitle: string;
  value: number | string;
  featured?: boolean;
};

type DistributionItem = {
  label: string;
  count: number;
  percent: number;
};

type AlertItem = {
  key: string;
  level: "warning" | "critical" | "healthy";
  message: string;
};

const QUICK_ACTIONS = [
  { label: "View Bookings", href: "/dashboard/bookings" },
  { label: "Open Inquiries", href: "/dashboard/inquiries" },
  { label: "Manage Users", href: "/dashboard/users" },
  { label: "View Pets", href: "/dashboard/pets" },
  { label: "Country Availability", href: "/dashboard/countries" },
  { label: "Reports", href: "/dashboard/reports" },
];

const BOOKING_TYPE_LABELS: Record<string, string> = {
  international_pet_transport: "International",
  domestic_pet_transport: "Domestic",
  rabies_serology_test: "Rabies",
};

const TERMINAL_BOOKING_STATUSES = new Set([
  "completed",
  "cancelled",
  "rejected",
]);

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

const formatBookingType = (value?: string) => {
  if (!value) {
    return "Unknown";
  }

  return BOOKING_TYPE_LABELS[value] || value.replaceAll("_", " ");
};

const formatLabel = (value: string) => value.replaceAll("_", " ");

const toPercent = (count: number, total: number) =>
  total > 0 ? Math.round((count / total) * 100) : 0;

const truncate = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
};

const DashboardOverviewContent = () => {
  const router = useRouter();

  const bookingsRaw = useQuery(api.tables.bookings.get);
  const usersRaw = useQuery(api.tables.users.get);
  const petsRaw = useQuery(api.tables.pet_details.get);
  const inquiriesRaw = useQuery(api.tables.contact_us.get);
  const recentBookingsResult = useQuery(api.tables.bookings.getPaginated, {
    paginationOpts: { numItems: 8, cursor: null },
  });

  const allBookings = useMemo(
    () => (bookingsRaw || []) as BookingRecord[],
    [bookingsRaw],
  );
  const allInquiries = useMemo(
    () => (inquiriesRaw || []) as InquiryRecord[],
    [inquiriesRaw],
  );
  const recentBookings = useMemo(
    () => (recentBookingsResult?.page || []) as DashboardBookingRow[],
    [recentBookingsResult?.page],
  );

  const isKpiLoading =
    bookingsRaw === undefined ||
    usersRaw === undefined ||
    petsRaw === undefined ||
    inquiriesRaw === undefined;

  const pendingBookings = allBookings.filter(
    (booking) => booking.status === "pending",
  ).length;

  const kpiCards = useMemo<KpiCard[]>(
    () => [
      {
        label: "Total Bookings",
        value: isKpiLoading ? "..." : allBookings.length,
        subtitle: "All booking records",
        featured: true,
      },
      {
        label: "Inquiry Queue",
        value: isKpiLoading ? "..." : allInquiries.length,
        subtitle: "Uses all inquiries (no unread flag)",
        featured: true,
      },
      {
        label: "Pending Bookings",
        value: isKpiLoading ? "..." : pendingBookings,
        subtitle: "Needs immediate action",
      },
      {
        label: "Registered Users",
        value: isKpiLoading ? "..." : usersRaw?.length || 0,
        subtitle: "Staff and customers",
      },
      {
        label: "Registered Pets",
        value: isKpiLoading ? "..." : petsRaw?.length || 0,
        subtitle: "Linked pet profiles",
      },
      {
        label: "Rabies Titer Test",
        value: "-",
        subtitle: "Coming soon",
      },
    ],
    [
      allBookings.length,
      allInquiries.length,
      isKpiLoading,
      pendingBookings,
      petsRaw?.length,
      usersRaw?.length,
    ],
  );

  const statusDistribution = useMemo<DistributionItem[]>(() => {
    if (!allBookings.length) {
      return [];
    }

    const byStatus: Record<string, number> = {};

    allBookings.forEach((booking) => {
      byStatus[booking.status] = (byStatus[booking.status] || 0) + 1;
    });

    return Object.entries(byStatus)
      .map(([status, count]) => ({
        label: formatLabel(status),
        count,
        percent: toPercent(count, allBookings.length),
      }))
      .sort((a, b) => b.count - a.count);
  }, [allBookings]);

  const serviceDistribution = useMemo<DistributionItem[]>(() => {
    if (!allBookings.length) {
      return [];
    }

    const byService: Record<string, number> = {};

    allBookings.forEach((booking) => {
      const key = booking.booking_type || "unknown";
      byService[key] = (byService[key] || 0) + 1;
    });

    return Object.entries(byService)
      .map(([type, count]) => ({
        label: formatBookingType(type),
        count,
        percent: toPercent(count, allBookings.length),
      }))
      .sort((a, b) => b.count - a.count);
  }, [allBookings]);

  const recentInquiries = useMemo(
    () =>
      [...allInquiries]
        .sort((a, b) => b._creationTime - a._creationTime)
        .slice(0, 6),
    [allInquiries],
  );

  const alerts = useMemo<AlertItem[]>(() => {
    const items: AlertItem[] = [];

    const cancelledBookings = allBookings.filter(
      (booking) =>
        booking.status === "cancelled" || booking.status === "rejected",
    ).length;
    const cancellationRate = allBookings.length
      ? cancelledBookings / allBookings.length
      : 0;

    const staleActiveBookings = allBookings.filter(
      (booking) =>
        !TERMINAL_BOOKING_STATUSES.has(booking.status) && !booking.updated_at,
    ).length;

    if (pendingBookings >= 8) {
      items.push({
        key: "pending-backlog",
        level: "critical",
        message: `${pendingBookings} bookings are still pending.`,
      });
    }

    if (allInquiries.length >= 10) {
      items.push({
        key: "inquiry-backlog",
        level: "warning",
        message: `${allInquiries.length} inquiries need triage.`,
      });
    }

    if (cancellationRate >= 0.2 && cancelledBookings >= 3) {
      items.push({
        key: "cancellation-rate",
        level: "warning",
        message: `Cancellation/rejection rate is ${Math.round(cancellationRate * 100)}%.`,
      });
    }

    if (staleActiveBookings > 0) {
      items.push({
        key: "stale-active",
        level: "warning",
        message: `${staleActiveBookings} active bookings have no update in 3+ days.`,
      });
    }

    if (!items.length) {
      items.push({
        key: "healthy",
        level: "healthy",
        message: "No critical alerts right now. Operations look stable.",
      });
    }

    return items;
  }, [allBookings, allInquiries.length, pendingBookings]);

  const featuredCards = kpiCards.filter((card) => card.featured);
  const regularCards = kpiCards.filter((card) => !card.featured);
  return (
    <DashboardHeading title="Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left — 2 featured boxes side by side */}
        <div className="grid grid-cols-2 gap-4">
          {kpiCards
            .filter((card) => card.featured)
            .map((card) => (
              <WhiteCard
                key={card.label}
                className="gap-2 border-blue-100 p-6 aspect-square flex flex-col justify-center"
              >
                <BodyText
                  size="xsmall"
                  className="uppercase tracking-wide text-slate-500"
                >
                  {card.label}
                </BodyText>
                <BodyText
                  weight="bold"
                  className="text-5xl md:text-6xl text-[#17528A] leading-tight"
                >
                  {card.value}
                </BodyText>
                <BodyText size="xsmall" className="text-slate-500">
                  {card.subtitle}
                </BodyText>
              </WhiteCard>
            ))}
        </div>

        {/* Right — 2x2 grid of regular boxes */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {kpiCards
            .filter((card) => !card.featured)
            .map((card) => (
              <WhiteCard
                key={card.label}
                className="gap-1 border-blue-100 justify-center p-3"
              >
                <BodyText
                  size="xsmall"
                  className="uppercase tracking-wide text-slate-500"
                >
                  {card.label}
                </BodyText>
                <BodyText
                  weight="bold"
                  className="text-2xl text-[#17528A] leading-tight"
                >
                  {card.value}
                </BodyText>
                <BodyText size="xsmall" className="text-slate-500">
                  {card.subtitle}
                </BodyText>
              </WhiteCard>
            ))}
        </div>
      </div>

      <WhiteCard className="border-blue-100">
        <div className="flex flex-wrap items-center gap-2">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-blue-700 transition-all hover:bg-blue-50"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </WhiteCard>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <WhiteCard className="space-y-3 xl:col-span-2">
          <BodyText weight="semibold" className="text-lg text-[#17528A]">
            Recent Bookings Activity
          </BodyText>
          {recentBookingsResult === undefined && (
            <BodyText size="small" className="text-slate-500">
              Loading recent bookings...
            </BodyText>
          )}
          {!recentBookingsResult && recentBookings.length === 0 && (
            <BodyText size="small" className="text-slate-500">
              No recent bookings found.
            </BodyText>
          )}
          {recentBookings.length > 0 && (
            <div className="space-y-2">
              {recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50/80 p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <BodyText
                      size="small"
                      weight="semibold"
                      className="text-slate-900"
                    >
                      {booking.booking_label || booking._id}
                    </BodyText>
                    <BodyText size="xsmall" className="text-slate-600">
                      {formatBookingType(booking.booking_type)} -{" "}
                      {booking.owner_name || "Owner unavailable"}
                    </BodyText>
                    <BodyText size="xsmall" className="text-slate-500">
                      Updated{" "}
                      {dayjs(
                        booking.updated_at || booking._creationTime,
                      ).format("MMM DD, YYYY hh:mm A")}
                    </BodyText>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full border px-2 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusBadgeClass(
                        booking.status,
                      )}`}
                    >
                      {formatLabel(booking.status)}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/dashboard/bookings/${booking._id}`)
                      }
                      className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700 transition-all hover:bg-blue-50"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </WhiteCard>

        <WhiteCard className="space-y-3">
          <BodyText weight="semibold" className="text-lg text-[#17528A]">
            Booking Status Distribution
          </BodyText>
          {!statusDistribution.length && (
            <BodyText size="small" className="text-slate-500">
              No booking data available yet.
            </BodyText>
          )}
          {statusDistribution.map((status) => (
            <div key={status.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <BodyText size="xsmall" className="uppercase text-slate-600">
                  {status.label}
                </BodyText>
                <BodyText size="xsmall" className="text-slate-600">
                  {status.count} ({status.percent}%)
                </BodyText>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-[#17528A]"
                  style={{ width: `${status.percent}%` }}
                />
              </div>
            </div>
          ))}
        </WhiteCard>

        <WhiteCard className="space-y-3 xl:col-span-2">
          <div className="flex items-center justify-between gap-2">
            <BodyText weight="semibold" className="text-lg text-[#17528A]">
              Inquiry Management Queue
            </BodyText>
            <Link
              href="/dashboard/inquiries"
              className="rounded-lg border border-blue-200 bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 transition-all hover:bg-blue-50"
            >
              View All
            </Link>
          </div>
          {!recentInquiries.length && (
            <BodyText size="small" className="text-slate-500">
              No inquiries received yet.
            </BodyText>
          )}
          {recentInquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className="rounded-xl border border-slate-200 bg-slate-50/80 p-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <BodyText
                  size="small"
                  weight="semibold"
                  className="text-slate-900"
                >
                  {inquiry.first_name} {inquiry.last_name}
                </BodyText>
                <BodyText size="xsmall" className="text-slate-500">
                  {dayjs(inquiry._creationTime).format("MMM DD, YYYY hh:mm A")}
                </BodyText>
              </div>
              <BodyText size="xsmall" className="text-slate-600">
                {inquiry.email}
              </BodyText>
              <BodyText size="small" className="text-slate-700">
                {truncate(inquiry.message, 140)}
              </BodyText>
            </div>
          ))}
        </WhiteCard>

        <WhiteCard className="space-y-3">
          <BodyText weight="semibold" className="text-lg text-[#17528A]">
            Service Popularity
          </BodyText>
          {!serviceDistribution.length && (
            <BodyText size="small" className="text-slate-500">
              No booking data available yet.
            </BodyText>
          )}
          {serviceDistribution.map((service) => (
            <div key={service.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <BodyText size="xsmall" className="uppercase text-slate-600">
                  {service.label}
                </BodyText>
                <BodyText size="xsmall" className="text-slate-600">
                  {service.count} ({service.percent}%)
                </BodyText>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-[#F37E48]"
                  style={{ width: `${service.percent}%` }}
                />
              </div>
            </div>
          ))}
        </WhiteCard>

        <WhiteCard className="space-y-3 xl:col-span-2">
          <BodyText weight="semibold" className="text-lg text-[#17528A]">
            System Alerts
          </BodyText>
          {alerts.map((alert) => (
            <div
              key={alert.key}
              className={`rounded-xl border p-3 ${
                alert.level === "critical"
                  ? "border-rose-200 bg-rose-50"
                  : alert.level === "warning"
                    ? "border-amber-200 bg-amber-50"
                    : "border-emerald-200 bg-emerald-50"
              }`}
            >
              <BodyText
                size="small"
                className={
                  alert.level === "critical"
                    ? "text-rose-700"
                    : alert.level === "warning"
                      ? "text-amber-700"
                      : "text-emerald-700"
                }
              >
                {alert.message}
              </BodyText>
            </div>
          ))}
        </WhiteCard>
      </div>
    </DashboardHeading>
  );
};

export default DashboardOverviewContent;
