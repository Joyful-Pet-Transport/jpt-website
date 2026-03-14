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
import dayjs from "dayjs";
import { FC } from "react";

const DashboardPage = () => {
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
    <BoxedContainer>
      <Heading size="medium">Dashboard</Heading>
      <InternationalPetTransportTable />
      <DomesticPetTransportTable />
      <RabiesSerologyTest />
      <PetsTable />
      <InquiryTable />
    </BoxedContainer>
  );
};

export default DashboardPage;
