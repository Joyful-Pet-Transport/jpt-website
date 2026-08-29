"use client";

import WhiteCard from "@/components/card/WhiteCard";
import BodyText from "@/components/elements/text/BodyText";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import BookingStatusChanger from "./BookingStatusChanger";
import BookingDealChanger from "./BookingDealChanger";
import PetDetailsCard from "@/components/contents/pets/PetDetailsCard";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { copyBookingDetailsToClipboard } from "@/utils/format/copyFormDetails";
import { div } from "framer-motion/client";

type BookingDetailsContentProps = {
  id: Id<"bookings">;
};

type DetailRow = {
  label: string;
  key: string;
  value: unknown;
};

const formatDisplayDate = (dateStr: string): string => {
  const parsed = dayjs(dateStr.trim());
  return parsed.isValid() ? parsed.format("MMMM D, YYYY") : dateStr;
};

const formatDateValue = (value: unknown): unknown => {
  if (typeof value !== "string" || !value.trim()) return value;

  if (value.includes(" - ")) {
    const [start, end] = value.split(" - ").map((d) => d.trim());
    return `${formatDisplayDate(start)} - ${formatDisplayDate(end)}`;
  }

  return formatDisplayDate(value);
};

const formatTitleWords = (value: string): string =>
  value
    .replaceAll("_", " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const formatLocationAddress = (
  details: Record<string, unknown>,
  prefix: "origin" | "destination",
  countryNameByCode: Map<string, string>,
) => {
  const fullAddress = details[`${prefix}_full_address`];
  const city = details[`${prefix}_city`];
  const stateProvince = details[`${prefix}_state_province`];
  const postalCode = details[`${prefix}_postal_code`];
  const countryCode = details[`${prefix}_address_country`];

  const segments = [
    fullAddress,
    city,
    stateProvince,
    postalCode,
    countryCode && typeof countryCode === "string"
      ? countryNameByCode.get(countryCode) || countryCode
      : null,
  ]
    .map((segment) =>
      segment === null || segment === undefined || segment === ""
        ? null
        : String(segment).trim(),
    )
    .filter(Boolean);

  return segments.length ? segments.join(", ") : "-";
};

const getTravelDetailRows = (
  bookingType: string | undefined,
  details: Record<string, unknown>,
): DetailRow[] => {
  if (bookingType === "international_pet_transport") {
    return [
      {
        label: "Companionship",
        key: "companionship",
        value:
          typeof details.companionship === "string" &&
          details.companionship.length > 0
            ? details.companionship.charAt(0).toUpperCase() +
              details.companionship.slice(1)
            : details.companionship,
      },
      {
        label: "Has Travel Date",
        key: "travel_date",
        value: details.travel_date,
      },
      { label: "Travel Date", key: "date", value: details.date },
    ];
  }

  if (bookingType === "domestic_pet_transport") {
    return [
      {
        label: "Has Travel Date",
        key: "travel_date",
        value: details.travel_date,
      },
      {
        label: "Travel Date",
        key: "date",
        value: details.date,
      },
      {
        label: "Mode of Transport",
        key: "mode_of_transport",
        value: details.mode_of_transport,
      },
    ];
  }

  if (bookingType === "rabies_serology_test") {
    return [{ label: "Appointment Date", key: "date", value: details.date }];
  }

  return [];
};

const getOriginDetailRows = (
  bookingType: string | undefined,
  details: Record<string, unknown>,
  countryNameByCode: Map<string, string>,
): DetailRow[] => {
  if (bookingType === "international_pet_transport") {
    return [
      {
        label: "Country",
        key: "origin_country",
        value: details.origin_country,
      },
      {
        label: "Full Address",
        key: "origin_full_address",
        value: formatLocationAddress(details, "origin", countryNameByCode),
      },
    ];
  }

  if (bookingType === "domestic_pet_transport") {
    return [
      {
        label: "Full Address",
        key: "origin_full_address",
        value: details.origin_full_address || details.pickup_address,
      },
    ];
  }

  return [];
};

const getDestinationDetailRows = (
  bookingType: string | undefined,
  details: Record<string, unknown>,
  countryNameByCode: Map<string, string>,
): DetailRow[] => {
  if (bookingType === "international_pet_transport") {
    return [
      {
        label: "Country",
        key: "destination",
        value: details.destination,
      },
      {
        label: "Full Address",
        key: "destination_full_address",
        value: formatLocationAddress(details, "destination", countryNameByCode),
      },
    ];
  }

  if (bookingType === "domestic_pet_transport") {
    return [
      {
        label: "Full Address",
        key: "destination_full_address",
        value: details.destination_full_address || details.destination,
      },
    ];
  }

  return [];
};

const BookingDetailsContent = ({ id }: BookingDetailsContentProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timeout);
  }, [toast]);
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
  const detailsRecord = (details || {}) as Record<string, unknown>;
  const travelDetailRows = getTravelDetailRows(
    booking.booking_type,
    detailsRecord,
  );
  const originDetailRows = getOriginDetailRows(
    booking.booking_type,
    detailsRecord,
    countryNameByCode,
  );
  const destinationDetailRows = getDestinationDetailRows(
    booking.booking_type,
    detailsRecord,
    countryNameByCode,
  );
  const showLocationDetails =
    originDetailRows.length > 0 || destinationDetailRows.length > 0;

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

    if (key === "travel_date" && typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      if (normalized === "yes") {
        return "Yes";
      }
      if (normalized === "no") {
        return "No";
      }
    }

    if (key === "date") {
      const formatted = formatDateValue(value);
      if (typeof formatted === "string" && formatted.trim()) {
        return formatted;
      }
    }

    if (
      (key === "companionship" ||
        key === "mode_of_transport" ||
        key === "contact_form") &&
      typeof value === "string"
    ) {
      const normalized = value.replaceAll("_", " ");
      return normalized.length > 0
        ? normalized.charAt(0).toUpperCase() + normalized.slice(1)
        : normalized;
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (Array.isArray(value)) {
      return value.length ? value.join(", ") : "-";
    }

    return String(value);
  };

  const handleCopyAllDetails = async () => {
    try {
      setIsCopying(true);
      await copyBookingDetailsToClipboard({
        bookingType: booking.booking_type,
        bookingLabel: booking.booking_label,
        details: (details || null) as Record<string, unknown> | null,
        ownerDetails: owner_details,
        petDetails: pet_details || [],
        countryNameByCode,
      });
      setToast({ message: "Copied to clipboard", type: "success" });
    } catch (error) {
      setToast({
        message:
          error instanceof Error
            ? error.message
            : "Failed to copy booking details.",
        type: "error",
      });
    } finally {
      setIsCopying(false);
    }
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
          const destination = String(
            detailsRecord.destination || "",
          ).toUpperCase();
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
        formatDetailsValue(key, value) === "-"
          ? "-"
          : formatDetailsValue(key, value);

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
          while (
            text.length > 1 &&
            doc.getTextWidth(text) + chipPaddingX * 2 > maxChipWidth
          ) {
            text = `${text.slice(0, -2)}…`;
          }
          const width = Math.min(
            maxChipWidth,
            doc.getTextWidth(text) + chipPaddingX * 2,
          );
          return { text, width };
        };

        const chips = chipLabels.map(measureChip);
        const chipsTotalWidth =
          chips.reduce((acc, chip) => acc + chip.width, 0) + chipGap;
        const stackChips = chipsTotalWidth > 82;
        const headerHeight = stackChips ? 30 : 24;

        doc.setFillColor(24, 82, 138);
        doc.roundedRect(card.x, card.y, card.width, headerHeight, 3, 3, "F");
        doc.setFillColor(24, 82, 138);
        doc.rect(card.x, card.y + (headerHeight - 8), card.width, 8, "F");

        const titleMaxWidth = stackChips
          ? card.width - 18
          : card.width - chipsTotalWidth - 26;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(255, 255, 255);
        const headerTitle =
          doc.splitTextToSize(getCardTitle(), titleMaxWidth)[0] ||
          getCardTitle();
        doc.text(headerTitle, leftPadding, card.y + 10);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(225, 236, 248);
        doc.text(
          dayjs(booking.updated_at || booking._creationTime).format(
            "MMM D, YYYY h:mm A",
          ),
          leftPadding,
          card.y + 17,
        );

        const drawChip = (
          text: string,
          x: number,
          yPos: number,
          width: number,
        ) => {
          doc.setFillColor(232, 242, 252);
          doc.roundedRect(x, yPos, width, chipHeight, 2, 2, "F");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(chipTextSize);
          doc.setTextColor(24, 82, 138);
          doc.text(text, x + chipPaddingX, yPos + 5.3);
        };

        if (stackChips) {
          drawChip(
            chips[0].text,
            rightLimit - chips[0].width,
            chipTop,
            chips[0].width,
          );
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
          const lines = doc.splitTextToSize(
            value,
            rightLimit - leftPadding - labelWidth - 6,
          ) as string[];
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
        doc.roundedRect(
          leftPadding - 3,
          y - 4,
          rightLimit - leftPadding + 6,
          sectionHeight,
          2.5,
          2.5,
          "FD",
        );

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
        {
          label: "Companionship",
          value: detailsRecord.companionship,
          key: "companionship",
        },
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
        {
          label: "Origin Country",
          value: detailsRecord.origin_country,
          key: "origin_country",
        },
        {
          label: "Origin Address",
          value: detailsRecord.origin_full_address,
          key: "origin_full_address",
        },
      ]);

      drawSectionCard("Destination Details", [
        {
          label: "Destination Country",
          value: detailsRecord.destination,
          key: "destination",
        },
        {
          label: "Destination Address",
          value:
            detailsRecord.destination_full_address || detailsRecord.destination,
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
            {
              label: "Medical Condition",
              value: pet.pet_condition || "-",
              key: "pet_condition",
            },
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
              doc.roundedRect(
                imageX - 1,
                imageY - 1,
                imageWidth + 2,
                imageHeight + 2,
                1.5,
                1.5,
                "S",
              );
              doc.addImage(
                imageData,
                format,
                imageX,
                imageY,
                imageWidth,
                imageHeight,
              );
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                  ? dayjs(booking.updated_at).format("MMMM DD, YYYY")
                  : "-"}
              </BodyText>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Info
              label="Status"
              value={booking.status ? formatTitleWords(booking.status) : "-"}
            />
            <Info
              label="Type"
              value={
                booking.booking_type
                  ? formatTitleWords(booking.booking_type)
                  : "-"
              }
            />
            <Info label="Booking ID" value={String(booking.booking_id)} />
            <Info
              label="Created"
              value={
                booking._creationTime
                  ? dayjs(booking._creationTime).format("MMMM DD, YYYY")
                  : "-"
              }
            />
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => void handleCopyAllDetails()}
              disabled={isCopying || isExporting}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCopying ? "Copying..." : "Copy All Details"}
            </button>
            <button
              type="button"
              onClick={() => void handleExportToPdf()}
              disabled={isExporting || isCopying}
              className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-blue-700 transition-all hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isExporting ? "Exporting..." : "Export PDF"}
            </button>
          </div>
        </WhiteCard>

        <BookingStatusChanger
          bookingId={booking._id}
          currentStatus={
            booking.status ? formatTitleWords(booking.status) : "-"
          }
          bookingType={booking.booking_type}
          previousStatus={booking.previous_status}
          updatedAt={booking.updated_at}
        />

        <BookingDealChanger
          bookingId={booking._id}
          dealStatus={booking.deal_status}
          assignedTo={booking.assigned_to}
        />
      </div>

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
            value={formatDetailsValue(
              "email_address",
              owner_details?.email_address,
            )}
          />
          <Info
            label="Contact Number"
            value={formatDetailsValue(
              "contact_number",
              owner_details?.contact_number,
            )}
          />
          <Info
            label="Contact Form"
            value={formatDetailsValue(
              "contact_form",
              owner_details?.contact_form,
            )}
          />
          <Info
            label="Account Name"
            value={formatDetailsValue(
              "account_name",
              owner_details?.account_name,
            )}
          />
          <Info
            label="Account Link"
            value={formatDetailsValue(
              "account_link",
              owner_details?.account_link,
            )}
          />
        </div>
      </WhiteCard>

      {details ? (
        <>
          {travelDetailRows.length > 0 && (
            <WhiteCard>
              <BodyText
                weight="semibold"
                className="mb-4 text-lg text-[#17528A]"
              >
                Travel Details
              </BodyText>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {travelDetailRows.map((row) => (
                  <Info
                    key={row.key}
                    label={row.label}
                    value={formatDetailsValue(row.key, row.value)}
                  />
                ))}
              </div>
            </WhiteCard>
          )}

          {showLocationDetails && (
            <WhiteCard>
              <BodyText
                weight="semibold"
                className="mb-4 text-lg text-[#17528A]"
              >
                Locations
              </BodyText>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {originDetailRows.length > 0 && (
                  <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                    <BodyText
                      weight="semibold"
                      className="text-base text-[#17528A]"
                    >
                      Origin
                    </BodyText>
                    <div className="grid grid-cols-1 gap-4">
                      {originDetailRows.map((row) => (
                        <Info
                          key={row.key}
                          label={row.label}
                          value={formatDetailsValue(row.key, row.value)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {destinationDetailRows.length > 0 && (
                  <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                    <BodyText
                      weight="semibold"
                      className="text-base text-[#17528A]"
                    >
                      Destination
                    </BodyText>
                    <div className="grid grid-cols-1 gap-4">
                      {destinationDetailRows.map((row) => (
                        <Info
                          key={row.key}
                          label={row.label}
                          value={formatDetailsValue(row.key, row.value)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </WhiteCard>
          )}
        </>
      ) : (
        <BodyText size="small">No booking details available.</BodyText>
      )}

      <WhiteCard className="space-y-4">
        <BodyText weight="semibold" className="text-lg text-[#17528A]">
          Pet Details
        </BodyText>

        {!pet_details?.length && (
          <BodyText size="small">No pets listed for this booking.</BodyText>
        )}

        <div className="space-y-6">
          {pet_details?.map((pet, index) => {
            if (!pet) {
              return null;
            }

            return (
              <div key={pet._id} className="space-y-3">
                {pet_details.length > 1 && (
                  <BodyText
                    weight="semibold"
                    className="text-base text-[#17528A]"
                  >
                    Pet {index + 1}
                  </BodyText>
                )}
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <PetDetailsCard pet={pet} />
                </div>
              </div>
            );
          })}
        </div>
      </WhiteCard>

      {toast && (
        <div className="fixed right-4 top-4 z-120">
          <div
            className={`rounded-lg border px-4 py-3 shadow-md ${
              toast.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            <BodyText size="small">{toast.message}</BodyText>
          </div>
        </div>
      )}
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
      <BodyText size="small" className="break-all text-slate-900">
        {value}
      </BodyText>
    </div>
  );
};

export default BookingDetailsContent;
