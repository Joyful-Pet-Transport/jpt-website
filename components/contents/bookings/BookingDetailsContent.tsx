"use client";

import WhiteCard from "@/components/card/WhiteCard";
import BodyText from "@/components/elements/text/BodyText";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import BookingStatusChanger from "./BookingStatusChanger";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type BookingDetailsContentProps = {
  id: Id<"bookings">;
};

const BookingDetailsContent = ({ id }: BookingDetailsContentProps) => {
  const router = useRouter();
  const [isExporting, setIsExporting] = useState(false);
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

  const { booking, details, pet_details, owner_details } = bookingDetails;
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

  const handleExportToPdf = async () => {
    try {
      setIsExporting(true);
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const detailsRecord = (details || {}) as Record<string, unknown>;

      const getCardTitle = () => {
        if (booking.booking_type === "international_pet_transport") {
          const destination = String(detailsRecord.destination || "").toUpperCase();
          return destination === "PH" ? "Import" : "Export";
        }

        if (booking.booking_type === "domestic_pet_transport") {
          return "Domestic";
        }

        if (booking.booking_type === "rabies_serology_test") {
          return "Rabies Serology Test";
        }

        return booking.booking_label || "Booking";
      };

      const safeValue = (key: string, value: unknown) =>
        formatDetailsValue(key, value) === "-" ? "-" : formatDetailsValue(key, value);

      const page = {
        width: 210,
        height: 297,
        margin: 8,
      };

      const card = {
        x: page.margin,
        y: page.margin,
        width: page.width - page.margin * 2,
        height: page.height - page.margin * 2,
      };
      const addStyledPage = () => {
        doc.setFillColor(242, 244, 248);
        doc.rect(0, 0, page.width, page.height, "F");
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(card.x, card.y, card.width, card.height, 3, 3, "F");
      };

      addStyledPage();

      let y = card.y + 12;
      const leftPadding = card.x + 8;
      const rightLimit = card.x + card.width - 8;
      const lineHeight = 5;
      const labelWidth = 36;

      const ensureSpace = (needed = 14) => {
        if (y + needed <= card.y + card.height - 10) {
          return;
        }
        doc.addPage();
        addStyledPage();
        y = card.y + 12;
      };

      const drawHeader = () => {
        const chipPaddingX = 2.8;
        const chipGap = 2;
        const chipHeight = 8;
        const chipTop = card.y + 6;
        const chipTextSize = 7.6;
        const maxChipWidth = 56;
        const chipLabels = [
          (booking.booking_type || "-").replaceAll("_", " ").toUpperCase(),
          (booking.status || "-").replaceAll("_", " ").toUpperCase(),
        ];

        doc.setFont("helvetica", "bold");
        doc.setFontSize(chipTextSize);
        const measureChip = (raw: string) => {
          let text = raw.trim();
          while (text.length > 1 && doc.getTextWidth(text) + chipPaddingX * 2 > maxChipWidth) {
            text = `${text.slice(0, -2)}…`;
          }
          const width = Math.min(maxChipWidth, doc.getTextWidth(text) + chipPaddingX * 2);
          return { text, width };
        };

        const chips = chipLabels.map(measureChip);
        const chipsTotalWidth = chips.reduce((acc, chip) => acc + chip.width, 0) + chipGap;
        const stackChips = chipsTotalWidth > 82;
        const headerHeight = stackChips ? 30 : 24;

        doc.setFillColor(24, 82, 138);
        doc.roundedRect(card.x, card.y, card.width, headerHeight, 3, 3, "F");
        doc.setFillColor(24, 82, 138);
        doc.rect(card.x, card.y + (headerHeight - 8), card.width, 8, "F");

        const titleMaxWidth = stackChips ? card.width - 18 : card.width - chipsTotalWidth - 26;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(255, 255, 255);
        const headerTitle = doc.splitTextToSize(getCardTitle(), titleMaxWidth)[0] || getCardTitle();
        doc.text(headerTitle, leftPadding, card.y + 10);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(225, 236, 248);
        doc.text(
          dayjs(booking.updated_at || booking._creationTime).format("MMM D, YYYY h:mm A"),
          leftPadding,
          card.y + 17,
        );

        const drawChip = (text: string, x: number, yPos: number, width: number) => {
          doc.setFillColor(232, 242, 252);
          doc.roundedRect(x, yPos, width, chipHeight, 2, 2, "F");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(chipTextSize);
          doc.setTextColor(24, 82, 138);
          doc.text(text, x + chipPaddingX, yPos + 5.3);
        };

        if (stackChips) {
          drawChip(chips[0].text, rightLimit - chips[0].width, chipTop, chips[0].width);
          drawChip(
            chips[1].text,
            rightLimit - chips[1].width,
            chipTop + chipHeight + 2,
            chips[1].width,
          );
        } else {
          const statusX = rightLimit - chips[1].width;
          const typeX = statusX - chipGap - chips[0].width;
          drawChip(chips[0].text, typeX, chipTop, chips[0].width);
          drawChip(chips[1].text, statusX, chipTop, chips[1].width);
        }

        y = card.y + headerHeight + 6;
      };

      const drawSectionCard = (
        title: string,
        rows: { label: string; value: unknown; key: string }[],
      ) => {
        const rowMetrics = rows.map((row) => {
          const value = String(safeValue(row.key, row.value));
          const lines = doc.splitTextToSize(value, rightLimit - leftPadding - labelWidth - 6) as string[];
          return { row, lines };
        });

        const contentHeight = rowMetrics.reduce(
          (acc, item) => acc + Math.max(4.5, item.lines.length * 3.7),
          0,
        );
        const sectionHeight = Math.max(18, contentHeight + 14);

        ensureSpace(sectionHeight + 6);

        doc.setFillColor(247, 249, 252);
        doc.setDrawColor(223, 229, 238);
        doc.roundedRect(leftPadding - 3, y - 4, rightLimit - leftPadding + 6, sectionHeight, 2.5, 2.5, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(24, 82, 138);
        doc.text(title, leftPadding, y + 1);

        let sectionY = y + 7;
        rowMetrics.forEach(({ row, lines }) => {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(8.2);
          doc.setTextColor(50, 57, 66);
          doc.text(`${row.label}:`, leftPadding, sectionY);

          doc.setFont("helvetica", "normal");
          doc.setTextColor(75, 82, 92);
          doc.text(lines, leftPadding + labelWidth, sectionY);
          sectionY += Math.max(4.5, lines.length * 3.7);
        });

        y += sectionHeight + 4;
      };

      const toDataUrl = async (url: string) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch pet image for PDF.");
        }

        const blob = await response.blob();
        return await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(String(reader.result || ""));
          reader.onerror = () => reject(new Error("Failed to read pet image."));
          reader.readAsDataURL(blob);
        });
      };

      drawHeader();

      drawSectionCard("Travel Details", [
        { label: "Companionship", value: detailsRecord.companionship, key: "companionship" },
        {
          label: "Has Travel Date",
          value:
            detailsRecord.travel_date === "yes"
              ? "Yes"
              : detailsRecord.travel_date === "no"
                ? "No"
                : detailsRecord.travel_date,
          key: "travel_date",
        },
        { label: "Selected Date", value: detailsRecord.date, key: "date" },
        {
          label: "Mode Of Transport",
          value: detailsRecord.mode_of_transport || "-",
          key: "mode_of_transport",
        },
      ]);

      drawSectionCard("Owner Details", [
        {
          label: "Owner's Name",
          value: owner_details?.owner_name || detailsRecord.owner_name,
          key: "owner_name",
        },
        {
          label: "Contact Number",
          value: owner_details?.contact_number || detailsRecord.contact_number,
          key: "contact_number",
        },
        {
          label: "Email Address",
          value: owner_details?.email_address || detailsRecord.email_address,
          key: "email_address",
        },
        {
          label: "Contact Form",
          value: owner_details?.contact_form || detailsRecord.contact_form,
          key: "contact_form",
        },
        {
          label: "Account Name",
          value: owner_details?.account_name || detailsRecord.account_name,
          key: "account_name",
        },
        {
          label: "Account Link",
          value: owner_details?.account_link || detailsRecord.account_link,
          key: "account_link",
        },
      ]);

      drawSectionCard("Origin Details", [
        { label: "Origin Country", value: detailsRecord.origin_country, key: "origin_country" },
        { label: "Origin Address", value: detailsRecord.origin_full_address, key: "origin_full_address" },
      ]);

      drawSectionCard("Destination Details", [
        { label: "Destination Country", value: detailsRecord.destination, key: "destination" },
        {
          label: "Destination Address",
          value: detailsRecord.destination_full_address || detailsRecord.destination,
          key: "destination_full_address",
        },
      ]);

      if (!pet_details?.length) {
        drawSectionCard("Pet Details", [
          { label: "Pet's Name", value: "-", key: "pet_name" },
          { label: "Breed", value: "-", key: "breed" },
          { label: "Sex", value: "-", key: "sex" },
        ]);
      } else {
        for (let index = 0; index < pet_details.length; index += 1) {
          const pet = pet_details[index];
          if (!pet) {
            continue;
          }

          const imageWidth = 40;
          const imageHeight = 30;
          const sectionTopY = y;

          drawSectionCard(`Pet Details ${index + 1}`, [
            { label: "Pet's Name", value: pet.pet_name, key: "pet_name" },
            { label: "Breed", value: pet.breed, key: "breed" },
            { label: "Sex", value: pet.sex, key: "sex" },
            { label: "Birthday", value: pet.pet_birthday, key: "pet_birthday" },
            { label: "Age", value: pet.pet_age, key: "pet_age" },
            { label: "Weight (kg)", value: pet.pet_weight, key: "pet_weight" },
            { label: "Medical Condition", value: pet.pet_condition || "-", key: "pet_condition" },
            {
              label: "Special Instructions",
              value: pet.special_instructions || "-",
              key: "special_instructions",
            },
          ]);

          if (pet.image) {
            try {
              const imageData = await toDataUrl(pet.image);
              const format = imageData.includes("image/png") ? "PNG" : "JPEG";
              const imageX = rightLimit - imageWidth - 2;
              const imageY = sectionTopY + 8;
              doc.setDrawColor(222, 228, 236);
              doc.roundedRect(imageX - 1, imageY - 1, imageWidth + 2, imageHeight + 2, 1.5, 1.5, "S");
              doc.addImage(imageData, format, imageX, imageY, imageWidth, imageHeight);
            } catch (imageError) {
              console.warn("Unable to render pet image in PDF:", imageError);
            }
          }
        }
      }

      const fileName = `booking-${booking._id}-${dayjs().format("YYYYMMDD-HHmmss")}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error("Failed to export booking PDF:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
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
              Last updated{" "}
              {booking.updated_at
                ? dayjs(booking.updated_at).format("MMM DD, YYYY")
                : "-"}
            </BodyText>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => void handleExportToPdf()}
            disabled={isExporting}
            className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-blue-700 transition-all hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isExporting ? "Exporting..." : "Export PDF"}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Info label="Status" value={booking.status} />
          <Info
            label="Type"
            value={booking.booking_type?.replaceAll("_", " ") ?? "-"}
          />
          <Info label="Booking ID" value={String(booking.booking_id)} />
          <Info
            label="Created"
            value={dayjs(booking._creationTime).format("MMM DD, YYYY hh:mm A")}
          />
        </div>
      </WhiteCard>

      <BookingStatusChanger
        bookingId={booking._id}
        currentStatus={booking.status}
        bookingType={booking.booking_type}
        previousStatus={booking.previous_status}
        updatedAt={booking.updated_at}
      />

      <WhiteCard>
        <BodyText weight="semibold" className="mb-4 text-lg text-[#17528A]">
          Owner Details
        </BodyText>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Info
            label="Owner Name"
            value={formatDetailsValue("owner_name", owner_details?.owner_name)}
          />
          <Info
            label="Email Address"
            value={formatDetailsValue("email_address", owner_details?.email_address)}
          />
          <Info
            label="Contact Number"
            value={formatDetailsValue("contact_number", owner_details?.contact_number)}
          />
          <Info
            label="Contact Form"
            value={formatDetailsValue("contact_form", owner_details?.contact_form)}
          />
          <Info
            label="Account Name"
            value={formatDetailsValue("account_name", owner_details?.account_name)}
          />
          <Info
            label="Account Link"
            value={formatDetailsValue("account_link", owner_details?.account_link)}
          />
        </div>
      </WhiteCard>

      {details ? (
        <WhiteCard>
          <BodyText weight="semibold" className="mb-4 text-lg text-[#17528A]">
            Booking Information
          </BodyText>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {Object.entries(details)
              .filter(
                ([key]) =>
                  ![
                    "_id",
                    "_creationTime",
                    "pets",
                    "userId",
                    "owner_name",
                    "email_address",
                    "contact_form",
                    "contact_number",
                    "account_name",
                    "account_link",
                  ].includes(key),
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
                onPress={() => router.push(`/dashboard/pets/${pet._id}`)}
                className="cursor-pointer border transition hover:border-blue-200 hover:shadow-md"
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
      <BodyText
        size="xsmall"
        className="uppercase tracking-wide text-slate-500"
      >
        {label}
      </BodyText>
      <BodyText size="small" className="break-words text-slate-900">
        {value}
      </BodyText>
    </div>
  );
};

export default BookingDetailsContent;
