"use client";

import ConvexTable from "@/components/elements/table/ConvexTable";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import { api } from "@/convex/_generated/api";
import dayjs from "dayjs";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const BookingsPage = () => {
  const router = useRouter();
  const [bookingType, setBookingType] = useState<string>("");
  const queryArgs = useMemo(
    () => ({
      booking_type: bookingType || undefined,
    }),
    [bookingType],
  );

  const filters = [
    { label: "All", value: "" },
    { label: "International", value: "international_pet_transport" },
    { label: "Domestic", value: "domestic_pet_transport" },
    { label: "Rabies", value: "rabies_serology_test" },
  ];

  return (
    <DashboardHeading title="bookings">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {filters.map((filter) => {
          const active = bookingType === filter.value;

          return (
            <button
              key={filter.value || "all"}
              type="button"
              onClick={() => setBookingType(filter.value)}
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
      <ConvexTable
        query={api.tables.bookings.getPaginated}
        queryArgs={queryArgs}
        headers={[
          { key: "owner_name", label: "Owner Name" },
          { key: "email_address", label: "Owner Email" },
          { key: "contact_number", label: "Contact #" },
          { key: "account_name", label: "Account Name" },
          { key: "account_link", label: "Account Link" },
          { key: "status", label: "Status" },
          {
            key: "updated_at",
            label: "Updated On",
            parse: (value: number) =>
              dayjs(value).format("MMM DD, YYYY hh:mm A"),
          },
        ]}
        actions={[
          {
            label: "View",
            icon: <Eye className="h-4 w-4" />,
            onPress: (row) => router.push(`/dashboard/bookings/${row._id}`),
          },
        ]}
      />
    </DashboardHeading>
  );
};

export default BookingsPage;
