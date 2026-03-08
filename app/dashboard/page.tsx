"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import BaseTable from "@/components/elements/table/BaseTable";
import Heading from "@/components/elements/text/Heading";
import { api } from "@/convex/_generated/api";
import { Pet } from "@/models/pet";
import { Role } from "@/models/role";
import { useGetCurrentUser } from "@/utils/hooks/useGetCurrentUser";
import { useResponsive } from "@/utils/hooks/useWindowsDimensions";
import { useQuery } from "convex/react";
import { FC } from "react";

const DashboardPage = () => {
  const { user } = useGetCurrentUser();
  const responsive = useResponsive();
  const UserTable: FC = () => {
    const users = useQuery(api.tables.users.get);

    if (user?.role?.slug != "admin") return;

    return (
      <div>
        <BaseTable
          headers={[
            { label: "Name", key: "name" },
            { label: "Email", key: "email" },
            {
              label: "Role",
              key: "role",
              parse: (value: Role) => {
                return value.name;
              },
            },
          ]}
          heading="Users"
          hasActions={false}
          data={users}
        />
      </div>
    );
  };

  const InternationalPetTransportTable: FC = () => {
    const booking = useQuery(api.tables.international_pet_transport.get);
    return (
      <div>
        <BaseTable
          headers={[
            {
              key: "_creationTime",
              label: "Booked On",
              parse: (value: number) => new Date(value).toLocaleString(),
            },

            { key: "owner_name", label: "Owner Name" },
            { key: "contact_form", label: "Contact Form" },
            { key: "account_name", label: "Account Name" },
            { key: "account_link", label: "Account Link" },
            { key: "contact_number", label: "Contact Number" },
            { key: "email_address", label: "Email Address" },

            { key: "companionship", label: "Companionship" },
            { key: "travel_date", label: "Has Travel Date" },
            { key: "date", label: "Selected Date" },

            { key: "origin_country", label: "Origin Country" },
            { key: "origin_full_address", label: "Origin Address" },
            { key: "destination", label: "Destination Country" },
            { key: "destination_full_address", label: "Destination Address" },

            {
              key: "pet_details",
              label: "Pets",
              parse: (value: Pet[]) =>
                value.map((pet) => pet.pet_name).join(", "),
            },
          ]}
          heading="International Pet Relocation Bookings"
          hasActions={false}
          data={booking}
        />
      </div>
    );
  };

  return (
    <PageWrapperContainer removeBg disableLayout>
      <div
        className={`flex flex-col h-screen bg-neutral-100 rounded-4xl ${responsive.isTabletOrMobile ? "mx-4" : "mx-8"}`}
      >
        <BoxedContainer>
          <Heading size="medium">Dashboard</Heading>
          <UserTable />
          <InternationalPetTransportTable />
        </BoxedContainer>
      </div>
    </PageWrapperContainer>
  );
};

export default DashboardPage;
