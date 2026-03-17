"use client";

import WhiteCard from "@/components/card/WhiteCard";
import BodyText from "@/components/elements/text/BodyText";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

type BookingDetailsContentProps = {
  id: Id<"bookings">;
};

const BookingDetailsContent = ({ id }: BookingDetailsContentProps) => {
  const router = useRouter();
  const bookingDetails = useQuery(api.tables.bookings.getById, { id });
  const countries = useQuery(api.tables.available_countries.getAll);

  if (bookingDetails === undefined) {
    return (
      <DashboardHeading title="Booking Details">
        <BodyText size="small">Loading booking details...</BodyText>
      </DashboardHeading>
    );
  }

  if (!bookingDetails) {
    return (
      <DashboardHeading title="Booking Details" back="/dashboard/bookings">
        <BodyText size="small">Booking not found.</BodyText>
      </DashboardHeading>
    );
  }

  const { booking, details, pet_details } = bookingDetails;
  const isInternationalBooking =
    booking.booking_type === "international_pet_transport";

  const countryNameByCode = new Map(
    (countries || []).map((country) => [country.code, country.name]),
  );

  const formatDetailsValue = (key: string, value: unknown) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    if (
      isInternationalBooking &&
      (key === "origin_country" || key === "destination") &&
      typeof value === "string"
    ) {
      return countryNameByCode.get(value) || value;
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (Array.isArray(value)) {
      return value.length ? value.join(", ") : "-";
    }

    return String(value);
  };

  return (
    <DashboardHeading back="/dashboard/bookings" title="Booking Details">
      <WhiteCard className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <BodyText weight="bold" className="text-2xl text-[#17528A]">
            {booking.booking_label}
          </BodyText>
          <div className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1">
            <BodyText
              size="xsmall"
              className="uppercase tracking-wide text-blue-700"
            >
              Last updated {dayjs(booking.updated_at).format("MMM DD, YYYY")}
            </BodyText>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Info label="Status" value={booking.status} />
          <Info label="Type" value={booking.booking_type.replaceAll("_", " ")} />
          <Info label="Booking ID" value={String(booking.booking_id)} />
          <Info
            label="Created"
            value={dayjs(booking._creationTime).format("MMM DD, YYYY hh:mm A")}
          />
        </div>
      </WhiteCard>

      {details ? (
        <WhiteCard>
          <BodyText weight="semibold" className="mb-4 text-lg text-[#17528A]">
            Booking Information
          </BodyText>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Object.entries(details)
              .filter(
                ([key]) => !["_id", "_creationTime", "pets"].includes(key),
              )
              .map(([key, value]) => (
                <Info
                  key={key}
                  label={key.replaceAll("_", " ")}
                  value={formatDetailsValue(key, value)}
                />
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
              <WhiteCard
                key={pet._id}
                onClick={() => router.push(`/dashboard/pets/${pet._id}`)}
                className="cursor-pointer border border-transparent transition hover:border-blue-200 hover:shadow-md"
              >
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
                  <BodyText weight="semibold" className="text-[#17528A]">
                    {pet.pet_name}
                  </BodyText>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <Info label="Breed" value={pet.breed} />
                    <Info label="Sex" value={pet.sex} />
                    <Info label="Birthday" value={pet.pet_birthday} />
                    <Info label="Age" value={pet.pet_age} />
                  </div>
                </div>
              </WhiteCard>
            );
          })}
        </div>
      </WhiteCard>
    </DashboardHeading>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
      <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
        {label}
      </BodyText>
      <BodyText size="small" className="break-words text-slate-900">
        {value}
      </BodyText>
    </div>
  );
};

export default BookingDetailsContent;
