"use client";

import BaseTable from "@/components/elements/table/BaseTable";
import ConvexTable from "@/components/elements/table/ConvexTable";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import { api } from "@/convex/_generated/api";
import { Pet } from "@/models/pet";
import { useQuery } from "convex/react";
import dayjs from "dayjs";
import { FC } from "react";

const BookingsPage = () => {
  const InternationalPetTransportTable: FC = () => {
    const booking = useQuery(api.tables.international_pet_transport.get);
    return (
      <div>
        <BaseTable
          headers={[
            {
              key: "_creationTime",
              label: "Booked On",
              parse: (value: number) =>
                dayjs(value).format("MMM DD, YYYY hh:mm A"),
              sortable: true,
            },

            { key: "owner_name", label: "Owner Name" },
            { key: "contact_form", label: "Contact Form" },
            { key: "account_name", label: "Account Name" },
            { key: "account_link", label: "Account Link" },
            { key: "contact_number", label: "Contact #" },
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
                value
                  ?.filter((pet): pet is Pet => pet != null)
                  .map((pet) => pet.pet_name)
                  .join(", ") ?? "",
            },
          ]}
          heading="International Pet Relocation Bookings"
          hasActions={false}
          data={booking}
        />
      </div>
    );
  };

  const DomesticPetTransportTable: FC = () => {
    const booking = useQuery(api.tables.domestic_pet_transport.get);
    return (
      <div>
        <BaseTable
          headers={[
            {
              key: "_creationTime",
              label: "Booked On",
              parse: (value: number) =>
                dayjs(value).format("MMM DD, YYYY hh:mm A"),
              sortable: true,
            },

            { key: "owner_name", label: "Owner Name" },

            { key: "pickup_address", label: "Pickup Address" },
            { key: "destination", label: "Destination" },

            { key: "contact_form", label: "Contact Form" },
            { key: "account_name", label: "Account Name" },
            { key: "account_link", label: "Account Link" },
            { key: "contact_number", label: "Contact #" },
            { key: "email_address", label: "Email Address" },

            { key: "travel_date", label: "Has Travel Date" },
            { key: "date", label: "Selected Date" },

            { key: "mode_of_transport", label: "Mode of Transport" },

            {
              key: "pet_details",
              label: "Pets",
              parse: (value?: Pet[]) =>
                value?.map((p) => p.pet_name).join(", ") ?? "",
            },

            { key: "origin_full_address", label: "Origin Address" },
            { key: "destination_full_address", label: "Destination Address" },
          ]}
          heading="Domestic Pet Relocation Bookings"
          hasActions={false}
          data={booking}
        />
      </div>
    );
  };

  const RabiesSerologyTest: FC = () => {
    const booking = useQuery(api.tables.rabies_serology_test.get);
    return (
      <div>
        <BaseTable
          headers={[
            {
              key: "_creationTime",
              label: "Booked On",
              parse: (value: number) =>
                dayjs(value).format("MMM DD, YYYY hh:mm A"),
              sortable: true,
            },

            { key: "owner_name", label: "Owner Name" },

            { key: "contact_form", label: "Contact Form" },
            { key: "account_name", label: "Account Name" },
            { key: "account_link", label: "Account Link" },
            { key: "contact_number", label: "Contact #" },
            { key: "email_address", label: "Email Address" },

            {
              key: "date",
              label: "Test Date",
              parse: (value: string) => dayjs(value).format("MMM DD, YYYY"),
            },

            {
              key: "pet_details",
              label: "Pets",
              parse: (value?: Pet[]) =>
                value?.map((p) => p.pet_name).join(", ") ?? "",
            },
          ]}
          heading="Rabies Serology Test Bookings"
          hasActions={false}
          data={booking}
        />
      </div>
    );
  };

  return (
    <DashboardHeading title="bookings">
      <ConvexTable
        query={api.tables.bookings.getPaginated}
        headers={[
          { key: "booking_label", label: "Type" },
          { key: "status", label: "Status" },
          {
            key: "updated_at",
            label: "Updated On",
            parse: (value: string) =>
              dayjs(value).format("MMM DD, YYYY hh:mm A"),
          },
        ]}
      />
      <InternationalPetTransportTable />
      <DomesticPetTransportTable />
      <RabiesSerologyTest />
    </DashboardHeading>
  );
};

export default BookingsPage;
