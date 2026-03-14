"use client";

import ConvexTable from "@/components/elements/table/ConvexTable";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { RotateCcw } from "lucide-react";

const CountryListPage = () => {
  const toggleAvailability = useMutation(
    api.mutations.available_countries.toggleAvailability,
  );

  const handleToggle = async (row: any) => {
    await toggleAvailability({
      id: row._id,
    });
  };

  return (
    <DashboardHeading title="Country List">
      <ConvexTable
        query={api.tables.available_countries.getPaginated}
        pagination={10}
        searchable={true}
        headers={[
          { label: "Name", key: "name" },
          { label: "Code", key: "code" },
          {
            label: "Available",
            key: "available",
            parse: (value: boolean) => {
              return value ? "Yes" : "No";
            },
          },
        ]}
        actions={[
          {
            label: "Toggle",
            icon: <RotateCcw className="h-4 w-4" />,
            onPress: handleToggle,
          },
        ]}
      />
    </DashboardHeading>
  );
};

export default CountryListPage;
