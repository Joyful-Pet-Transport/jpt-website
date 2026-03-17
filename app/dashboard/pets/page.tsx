"use client";

import ConvexTable from "@/components/elements/table/ConvexTable";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import { api } from "@/convex/_generated/api";
import dayjs from "dayjs";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const PetsPage = () => {
  const router = useRouter();

  return (
    <DashboardHeading title="Registered Pets">
      <ConvexTable
        query={api.tables.pet_details.getPaginated}
        pagination={10}
        headers={[
          {
            key: "_creationTime",
            label: "Registered",
            parse: (value: number) => dayjs(value).format("MMM DD, YYYY hh:mm A"),
          },
          { key: "pet_name", label: "Name" },
          { key: "breed", label: "Breed" },
          { key: "sex", label: "Sex" },
          { key: "pet_age", label: "Age" },
          { key: "pet_weight", label: "Weight" },
        ]}
        actions={[
          {
            label: "View",
            icon: <Eye className="h-4 w-4" />,
            onPress: (row) => router.push(`/dashboard/pets/${row._id}`),
          },
        ]}
      />
    </DashboardHeading>
  );
};

export default PetsPage;
