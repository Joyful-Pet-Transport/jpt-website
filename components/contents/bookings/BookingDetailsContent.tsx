"use client";

import WhiteCard from "@/components/card/WhiteCard";
import BodyText from "@/components/elements/text/BodyText";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import dayjs from "dayjs";
import Image from "next/image";

type BookingDetailsContentProps = {
  id: Id<"bookings">;
};

const BookingDetailsContent = ({ id }: BookingDetailsContentProps) => {
  const bookingDetails = useQuery(api.tables.bookings.getById, { id });

  if (bookingDetails === undefined) {
    return (
      <DashboardHeading title="Booking Details">
        <BodyText size="small">Loading booking details...</BodyText>
      </DashboardHeading>
    );
  }

  if (!bookingDetails) {
    return (
      <DashboardHeading title="Booking Details">
        <BodyText size="small">Booking not found.</BodyText>
      </DashboardHeading>
    );
  }

  const { booking, details, pet_details } = bookingDetails;

  return (
    <DashboardHeading back="hehe" title="Booking Details">
      <WhiteCard>
        <BodyText weight="semibold">Summary</BodyText>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <BodyText size="small">Type: {booking.booking_label}</BodyText>
          <BodyText size="small">Status: {booking.status}</BodyText>
          <BodyText size="small">
            Updated On:{" "}
            {dayjs(booking.updated_at).format("MMM DD, YYYY hh:mm A")}
          </BodyText>
          <BodyText size="small">Booking ID: {booking.booking_id}</BodyText>
        </div>
      </WhiteCard>

      {details ? (
        <WhiteCard>
          <BodyText weight="semibold">Booking Information</BodyText>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {Object.entries(details)
              .filter(
                ([key]) => !["_id", "_creationTime", "pets"].includes(key),
              )
              .map(([key, value]) => (
                <BodyText size="small" key={key}>
                  {key.replaceAll("_", " ")}: {String(value)}
                </BodyText>
              ))}
          </div>
        </WhiteCard>
      ) : (
        <BodyText size="small">No booking details available.</BodyText>
      )}

      <WhiteCard>
        <BodyText weight="semibold" className="mb-3 text-blue-700">
          Pet Details
        </BodyText>

        {!pet_details?.length && (
          <BodyText size="small">No pets listed for this booking.</BodyText>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {pet_details?.map((pet) => {
            if (!pet) return null;

            return (
              <WhiteCard key={pet._id}>
                <div className="relative mb-3 h-48 w-full overflow-hidden rounded-md bg-neutral-100">
                  <Image
                    src={pet.image}
                    alt={pet.pet_name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="space-y-1">
                  <BodyText size="small">Name: {pet.pet_name}</BodyText>
                  <BodyText size="small">Breed: {pet.breed}</BodyText>
                  <BodyText size="small">Sex: {pet.sex}</BodyText>
                  <BodyText size="small">Birthday: {pet.pet_birthday}</BodyText>
                  <BodyText size="small">Age: {pet.pet_age}</BodyText>
                  <BodyText size="small">Weight: {pet.pet_weight}</BodyText>
                  <BodyText size="small">
                    Condition: {pet.pet_condition ? pet.pet_condition : "-"}
                  </BodyText>
                  <BodyText size="small">
                    Special Instructions: {pet.special_instructions || "-"}
                  </BodyText>
                </div>
              </WhiteCard>
            );
          })}
        </div>
      </WhiteCard>
    </DashboardHeading>
  );
};

export default BookingDetailsContent;
