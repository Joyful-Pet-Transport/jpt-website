"use client";

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
        <BodyText>Loading booking details...</BodyText>
      </DashboardHeading>
    );
  }

  if (!bookingDetails) {
    return (
      <DashboardHeading title="Booking Details">
        <BodyText>Booking not found.</BodyText>
      </DashboardHeading>
    );
  }

  const { booking, details, pet_details } = bookingDetails;

  return (
    <DashboardHeading title="Booking Details">
      <div className="space-y-6">
        <div className="rounded-xl border border-blue-200 bg-white p-4">
          <BodyText weight="semibold" className="mb-2 text-blue-700">
            Summary
          </BodyText>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <BodyText>Type: {booking.booking_label}</BodyText>
            <BodyText>Status: {booking.status}</BodyText>
            <BodyText>
              Updated On: {dayjs(booking.updated_at).format("MMM DD, YYYY hh:mm A")}
            </BodyText>
            <BodyText>Booking ID: {booking.booking_id}</BodyText>
          </div>
        </div>

        {details ? (
          <div className="rounded-xl border border-blue-200 bg-white p-4">
            <BodyText weight="semibold" className="mb-2 text-blue-700">
              Booking Information
            </BodyText>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {Object.entries(details)
                .filter(([key]) => !["_id", "_creationTime", "pets"].includes(key))
                .map(([key, value]) => (
                  <BodyText key={key}>
                    {key.replaceAll("_", " ")}: {String(value)}
                  </BodyText>
                ))}
            </div>
          </div>
        ) : (
          <BodyText>No booking details available.</BodyText>
        )}

        <div className="rounded-xl border border-blue-200 bg-white p-4">
          <BodyText weight="semibold" className="mb-3 text-blue-700">
            Pet Details
          </BodyText>

          {!pet_details?.length && <BodyText>No pets listed for this booking.</BodyText>}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {pet_details?.map((pet) => {
              if (!pet) return null;

              return (
                <div key={pet._id} className="rounded-lg border border-neutral-200 p-3">
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
                    <BodyText>Name: {pet.pet_name}</BodyText>
                    <BodyText>Breed: {pet.breed}</BodyText>
                    <BodyText>Sex: {pet.sex}</BodyText>
                    <BodyText>Birthday: {pet.pet_birthday}</BodyText>
                    <BodyText>Age: {pet.pet_age}</BodyText>
                    <BodyText>Weight: {pet.pet_weight}</BodyText>
                    <BodyText>
                      Condition: {pet.pet_condition ? pet.pet_condition : "-"}
                    </BodyText>
                    <BodyText>
                      Special Instructions: {pet.special_instructions || "-"}
                    </BodyText>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardHeading>
  );
};

export default BookingDetailsContent;
