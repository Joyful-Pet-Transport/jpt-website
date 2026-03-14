"use client";

import ConvexTable from "@/components/elements/table/ConvexTable";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import { api } from "@/convex/_generated/api";

const InquiriesPage = () => {
  return (
    <DashboardHeading title="Inquiries">
      <ConvexTable
        query={api.tables.contact_us.getPaginated}
        headers={[
          { key: "first_name", label: "First Name" },
          { key: "last_name", label: "Last Name" },
          { key: "email", label: "Email" },
          { key: "message", label: "Message" },
        ]}
      />
    </DashboardHeading>
  );
};

export default InquiriesPage;
