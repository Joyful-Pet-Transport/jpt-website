"use client";

import BaseTable from "@/components/elements/table/BaseTable";
import BodyText from "@/components/elements/text/BodyText";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import dayjs from "dayjs";
import { FC } from "react";

const DashboardPage = () => {
  const PetsTable: FC = () => {
    const pets = useQuery(api.tables.pet_details.get);

    return (
      <div>
        <BaseTable
          headers={[
            { key: "pet_name", label: "Pet Name" },
            { key: "breed", label: "Breed" },
            { key: "sex", label: "Sex" },
            {
              key: "pet_birthday",
              label: "Birthday",
              parse: (value: string) =>
                value ? dayjs(value).format("MMM DD, YY") : "",
            },
            { key: "pet_age", label: "Age" },
            { key: "pet_weight", label: "Weight (kg)" },
          ]}
          heading="All Registered Pets"
          hasActions={false}
          data={pets}
        />
      </div>
    );
  };

  const InquiryTable: FC = () => {
    const inquiries = useQuery(api.tables.contact_us.get);

    return (
      <div>
        <BaseTable
          headers={[
            {
              key: "_creationTime",
              label: "Inquired On",
              parse: (value: number) =>
                dayjs(value).format("MMM DD, YYYY hh:mm A"),
              sortable: true,
            },
            { key: "email", label: "Email" },
            { key: "first_name", label: "Name" },
            { key: "last_name", label: "Last Name" },
            { key: "message", label: "Message" },
          ]}
          heading="All Inquiries"
          hasActions={false}
          data={inquiries}
        />
      </div>
    );
  };

  return (
    <DashboardHeading title="Dashboard">
      {/* <PetsTable />
      <InquiryTable /> */}
      <BodyText>Widgets comming soon</BodyText>
    </DashboardHeading>
  );
};

export default DashboardPage;
