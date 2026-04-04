"use client";

import ConvexTable from "@/components/elements/table/ConvexTable";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import { api } from "@/convex/_generated/api";
import dayjs from "dayjs";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const BookingsPage = () => {
  const router = useRouter();

  return (
    <DashboardHeading title="bookings">
      <ConvexTable
        query={api.tables.bookings.getPaginated}
        headers={[
          { key: "owner_name", label: "Owner Name" },
          { key: "email_address", label: "Owner Email" },
          { key: "contact_form", label: "Contact Form" },
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
