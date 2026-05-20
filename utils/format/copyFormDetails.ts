import dayjs from "dayjs";

export const EMPTY_COPY_VALUE = "---";

type CountryLookup = Map<string, string>;

type OwnerDetailsInput = {
  owner_name?: string;
  email_address?: string;
  contact_number?: string;
  contact_form?: string;
  account_name?: string;
  account_link?: string;
};

type PetDetailsInput = {
  pet_name?: string;
  breed?: string;
  sex?: string;
  pet_birthday?: string;
  pet_age?: string;
  pet_weight?: string;
  pet_condition?: string;
  special_instructions?: string;
  image?: string;
};

type BookingCopyInput = {
  bookingType?: string;
  bookingLabel?: string;
  details: Record<string, unknown> | null;
  ownerDetails: OwnerDetailsInput | null;
  petDetails: (PetDetailsInput | null)[];
  countryNameByCode: CountryLookup;
};

type InquiryCopyInput = {
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  status?: string;
  created_at?: number;
  _creationTime: number;
  assigned_user_name?: string;
  read_at?: number | null;
};

const isEmpty = (value: unknown) =>
  value === null || value === undefined || value === "";

const displayValue = (value: unknown) => {
  if (isEmpty(value)) {
    return EMPTY_COPY_VALUE;
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : EMPTY_COPY_VALUE;
  }

  return String(value).trim() || EMPTY_COPY_VALUE;
};

const formatLabelValue = (label: string, value: unknown) => `${label}: ${displayValue(value)}`;

const COPY_DATE_FORMAT = "MMMM D, YYYY";

const formatCopyDate = (value: unknown) => {
  if (isEmpty(value)) {
    return EMPTY_COPY_VALUE;
  }

  const raw = String(value).trim();
  const parsed = dayjs(raw);

  if (parsed.isValid()) {
    return parsed.format(COPY_DATE_FORMAT);
  }

  return raw;
};

const formatCopyWeight = (value: unknown) => {
  if (isEmpty(value)) {
    return EMPTY_COPY_VALUE;
  }

  const trimmed = String(value).trim();

  if (/kg\b/i.test(trimmed)) {
    return trimmed;
  }

  return `${trimmed} kg`;
};

const resolveCountryName = (code: unknown, countryNameByCode: CountryLookup) => {
  if (isEmpty(code)) {
    return EMPTY_COPY_VALUE;
  }

  const normalized = String(code).trim();
  return countryNameByCode.get(normalized) || normalized;
};

const formatTravelDateAnswer = (value: unknown) => {
  if (isEmpty(value)) {
    return EMPTY_COPY_VALUE;
  }

  const normalized = String(value).trim().toLowerCase();
  if (normalized === "yes") {
    return "Yes";
  }

  if (normalized === "no") {
    return "No";
  }

  return displayValue(value);
};

const formatCompanionship = (value: unknown) => {
  if (isEmpty(value)) {
    return EMPTY_COPY_VALUE;
  }

  return String(value).replaceAll("_", " ");
};

const formatContactForm = (value: unknown) => {
  if (isEmpty(value)) {
    return EMPTY_COPY_VALUE;
  }

  return String(value).replaceAll("_", " ");
};

const buildAddressLine = (
  parts: {
    fullAddress?: unknown;
    city?: unknown;
    stateProvince?: unknown;
    postalCode?: unknown;
    countryCode?: unknown;
  },
  countryNameByCode: CountryLookup,
) => {
  const segments = [
    displayValue(parts.fullAddress) !== EMPTY_COPY_VALUE
      ? displayValue(parts.fullAddress)
      : null,
    displayValue(parts.city) !== EMPTY_COPY_VALUE ? displayValue(parts.city) : null,
    displayValue(parts.stateProvince) !== EMPTY_COPY_VALUE
      ? displayValue(parts.stateProvince)
      : null,
    displayValue(parts.postalCode) !== EMPTY_COPY_VALUE
      ? displayValue(parts.postalCode)
      : null,
    !isEmpty(parts.countryCode)
      ? resolveCountryName(parts.countryCode, countryNameByCode)
      : null,
  ].filter((segment) => segment && segment !== EMPTY_COPY_VALUE);

  return segments.length ? segments.join(", ") : EMPTY_COPY_VALUE;
};

const getInternationalFlowLabel = (details: Record<string, unknown>) => {
  const destination = String(details.destination || "").toUpperCase();
  if (destination === "PH") {
    return "INTERNATIONAL IMPORT";
  }

  const originCountry = String(details.origin_country || "").toUpperCase();
  if (originCountry === "PH") {
    return "INTERNATIONAL EXPORT";
  }

  return "INTERNATIONAL";
};

const getBookingTypeHeading = (
  bookingType: string | undefined,
  bookingLabel: string | undefined,
  details: Record<string, unknown> | null,
) => {
  if (bookingType === "international_pet_transport" && details) {
    return getInternationalFlowLabel(details);
  }

  if (bookingType === "domestic_pet_transport") {
    return "DOMESTIC";
  }

  if (bookingType === "rabies_serology_test") {
    return "RABIES SEROLOGY";
  }

  if (bookingLabel?.trim()) {
    return bookingLabel.trim().toUpperCase();
  }

  if (bookingType) {
    return bookingType.replaceAll("_", " ").toUpperCase();
  }

  return "BOOKING";
};

const getBookingSummaryLine = (
  bookingType: string | undefined,
  details: Record<string, unknown> | null,
  countryNameByCode: CountryLookup,
) => {
  if (!details) {
    return EMPTY_COPY_VALUE;
  }

  if (bookingType === "international_pet_transport") {
    const origin = resolveCountryName(details.origin_country, countryNameByCode);
    const destination = resolveCountryName(details.destination, countryNameByCode);
    const companionship = formatCompanionship(details.companionship);

    return `${origin} - ${destination} (${companionship})`;
  }

  if (bookingType === "domestic_pet_transport") {
    const pickup = displayValue(details.pickup_address);
    const destination = displayValue(details.destination);
    const mode = displayValue(details.mode_of_transport).replaceAll("_", " ");

    return `${pickup} - ${destination} (${mode})`;
  }

  if (bookingType === "rabies_serology_test") {
    return formatCopyDate(details.date);
  }

  return EMPTY_COPY_VALUE;
};

const buildOwnerSection = (ownerDetails: OwnerDetailsInput | null, details: Record<string, unknown> | null) => {
  const ownerName = ownerDetails?.owner_name ?? details?.owner_name;
  const email = ownerDetails?.email_address ?? details?.email_address;
  const contactNumber = ownerDetails?.contact_number ?? details?.contact_number;
  const contactForm = ownerDetails?.contact_form ?? details?.contact_form;
  const accountName = ownerDetails?.account_name ?? details?.account_name;
  const accountLink = ownerDetails?.account_link ?? details?.account_link;

  return [
    "OWNER DETAILS:",
    formatLabelValue("Owner Name", ownerName),
    formatLabelValue("Email Address", email),
    formatLabelValue("Contact Number", contactNumber),
    formatLabelValue("Contact Form", formatContactForm(contactForm)),
    formatLabelValue("Account Name", accountName),
    formatLabelValue("Account Link", accountLink),
    "",
  ];
};

const buildTravelSection = (
  bookingType: string | undefined,
  details: Record<string, unknown> | null,
) => {
  const lines = ["TRAVEL DETAILS:"];

  if (bookingType === "international_pet_transport" && details) {
    lines.push(
      formatLabelValue("Companionship", formatCompanionship(details.companionship)),
      formatLabelValue("Have Travel date", formatTravelDateAnswer(details.travel_date)),
      formatLabelValue("Date", formatCopyDate(details.date)),
    );
  } else if (bookingType === "domestic_pet_transport" && details) {
    lines.push(
      formatLabelValue("Companionship", EMPTY_COPY_VALUE),
      formatLabelValue("Have Travel date", formatTravelDateAnswer(details.travel_date)),
      formatLabelValue("Date", formatCopyDate(details.date)),
      formatLabelValue(
        "Mode of Transport",
        displayValue(details.mode_of_transport).replaceAll("_", " "),
      ),
    );
  } else if (bookingType === "rabies_serology_test" && details) {
    lines.push(
      formatLabelValue("Companionship", EMPTY_COPY_VALUE),
      formatLabelValue("Have Travel date", EMPTY_COPY_VALUE),
      formatLabelValue("Date", formatCopyDate(details.date)),
    );
  } else {
    lines.push(
      formatLabelValue("Companionship", EMPTY_COPY_VALUE),
      formatLabelValue("Have Travel date", EMPTY_COPY_VALUE),
      formatLabelValue("Date", EMPTY_COPY_VALUE),
    );
  }

  lines.push("");
  return lines;
};

const buildOriginSection = (
  bookingType: string | undefined,
  details: Record<string, unknown> | null,
  countryNameByCode: CountryLookup,
) => {
  const lines = ["ORIGIN DETAILS:"];

  if (bookingType === "international_pet_transport" && details) {
    lines.push(
      formatLabelValue(
        "Origin Country",
        resolveCountryName(details.origin_country, countryNameByCode),
      ),
      formatLabelValue(
        "Origin Full Address",
        buildAddressLine(
          {
            fullAddress: details.origin_full_address,
            city: details.origin_city,
            stateProvince: details.origin_state_province,
            postalCode: details.origin_postal_code,
            countryCode: details.origin_address_country,
          },
          countryNameByCode,
        ),
      ),
    );
  } else if (bookingType === "domestic_pet_transport" && details) {
    lines.push(
      formatLabelValue("Origin Country", EMPTY_COPY_VALUE),
      formatLabelValue("Origin Full Address", details.origin_full_address || details.pickup_address),
    );
  } else {
    lines.push(
      formatLabelValue("Origin Country", EMPTY_COPY_VALUE),
      formatLabelValue("Origin Full Address", EMPTY_COPY_VALUE),
    );
  }

  lines.push("");
  return lines;
};

const buildDestinationSection = (
  bookingType: string | undefined,
  details: Record<string, unknown> | null,
  countryNameByCode: CountryLookup,
) => {
  const lines = ["DESTINATION DETAILS:", ""];

  if (bookingType === "international_pet_transport" && details) {
    lines.push(
      formatLabelValue(
        "Destination Country",
        resolveCountryName(details.destination, countryNameByCode),
      ),
      formatLabelValue(
        "Destination Full Address",
        buildAddressLine(
          {
            fullAddress: details.destination_full_address,
            city: details.destination_city,
            stateProvince: details.destination_state_province,
            postalCode: details.destination_postal_code,
            countryCode: details.destination_address_country,
          },
          countryNameByCode,
        ),
      ),
    );
  } else if (bookingType === "domestic_pet_transport" && details) {
    lines.push(
      formatLabelValue("Destination Country", EMPTY_COPY_VALUE),
      formatLabelValue(
        "Destination Full Address",
        details.destination_full_address || details.destination,
      ),
    );
  } else {
    lines.push(
      formatLabelValue("Destination Country", EMPTY_COPY_VALUE),
      formatLabelValue("Destination Full Address", EMPTY_COPY_VALUE),
    );
  }

  lines.push("");
  return lines;
};

const buildPetSections = (petDetails: (PetDetailsInput | null)[]) => {
  const pets = petDetails.filter((pet): pet is PetDetailsInput => Boolean(pet));

  if (!pets.length) {
    return [
      "PET DETAILS:",
      formatLabelValue("Name", EMPTY_COPY_VALUE),
      formatLabelValue("Breed", EMPTY_COPY_VALUE),
      formatLabelValue("Sex", EMPTY_COPY_VALUE),
      formatLabelValue("Birthday", EMPTY_COPY_VALUE),
      formatLabelValue("Age", EMPTY_COPY_VALUE),
      formatLabelValue("Weight", EMPTY_COPY_VALUE),
      formatLabelValue("Medical Condition", EMPTY_COPY_VALUE),
      formatLabelValue("Special Instructions", EMPTY_COPY_VALUE),
      "",
    ];
  }

  return pets.flatMap((pet, index) => {
    const heading =
      pets.length > 1 ? `PET DETAILS (${index + 1}):` : "PET DETAILS:";

    return [
      heading,
      formatLabelValue("Name", pet.pet_name),
      formatLabelValue("Breed", pet.breed),
      formatLabelValue("Sex", pet.sex),
      formatLabelValue("Birthday", formatCopyDate(pet.pet_birthday)),
      formatLabelValue("Age", pet.pet_age),
      formatLabelValue("Weight", formatCopyWeight(pet.pet_weight)),
      formatLabelValue("Medical Condition", pet.pet_condition),
      formatLabelValue("Special Instructions", pet.special_instructions),
      // pet.image ? formatLabelValue("Image", pet.image) : formatLabelValue("Image", EMPTY_COPY_VALUE),
      // "",
    ];
  });
};

export const formatBookingDetailsText = ({
  bookingType,
  bookingLabel,
  details,
  ownerDetails,
  petDetails,
  countryNameByCode,
}: BookingCopyInput) => {
  const detailsRecord = (details || {}) as Record<string, unknown>;
  const heading = getBookingTypeHeading(bookingType, bookingLabel, details);
  const summaryLine = getBookingSummaryLine(bookingType, details, countryNameByCode);

  return [
    heading,
    summaryLine,
    "",
    ...buildOwnerSection(ownerDetails, details),
    ...buildTravelSection(bookingType, details),
    ...buildOriginSection(bookingType, detailsRecord, countryNameByCode),
    ...buildDestinationSection(bookingType, detailsRecord, countryNameByCode),
    ...buildPetSections(petDetails),
  ]
    .join("\n")
    .trimEnd();
};

export const formatInquiryDetailsText = (inquiry: InquiryCopyInput) => {
  const submittedAt = inquiry.created_at || inquiry._creationTime;

  return [
    "NEW INQUIRY",
    "",
    formatLabelValue("Full Name", [inquiry.first_name, inquiry.last_name].filter(Boolean).join(" ")),
    formatLabelValue("Email Address", inquiry.email),
    formatLabelValue(
      "Submitted",
      dayjs(submittedAt).format(`${COPY_DATE_FORMAT} hh:mm A`),
    ),
    "",
    "MESSAGE:",
    displayValue(inquiry.message),
  ]
    .join("\n")
    .trimEnd();
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const buildHtmlFromPlainText = (plainText: string, imageUrls: string[]) => {
  const textHtml = escapeHtml(plainText).replaceAll("\n", "<br />");
  const imagesHtml = imageUrls
    .map(
      (url, index) =>
        `<p><strong>Pet Image ${index + 1}:</strong><br /><img src="${escapeHtml(url)}" alt="Pet image ${index + 1}" style="max-width:320px;height:auto;" /></p>`,
    )
    .join("");

  return `<div><pre style="font-family:Consolas,monospace;white-space:pre-wrap;">${textHtml}</pre>${imagesHtml}</div>`;
};

export const copyTextToClipboard = async (plainText: string, imageUrls: string[] = []) => {
  if (!navigator.clipboard) {
    throw new Error("Clipboard is unavailable in this browser.");
  }

  const uniqueImageUrls = [...new Set(imageUrls.filter(Boolean))];

  if (!uniqueImageUrls.length) {
    await navigator.clipboard.writeText(plainText);
    return;
  }

  const html = buildHtmlFromPlainText(plainText, uniqueImageUrls);
  const clipboardItems: Record<string, Blob> = {
    "text/plain": new Blob([plainText], { type: "text/plain" }),
    "text/html": new Blob([html], { type: "text/html" }),
  };

  try {
    const response = await fetch(uniqueImageUrls[0]);
    if (response.ok) {
      const imageBlob = await response.blob();
      const imageType = imageBlob.type || "image/png";
      if (imageType.startsWith("image/")) {
        clipboardItems[imageType] = imageBlob;
      }
    }
  } catch {
    // Rich text + image URL in plain text is still available.
  }

  await navigator.clipboard.write([new ClipboardItem(clipboardItems)]);
};

export const copyBookingDetailsToClipboard = async (input: BookingCopyInput) => {
  const plainText = formatBookingDetailsText(input);
  const imageUrls = input.petDetails
    .filter((pet): pet is PetDetailsInput => Boolean(pet?.image))
    .map((pet) => pet.image as string);

  await copyTextToClipboard(plainText, imageUrls);
};

export const copyInquiryDetailsToClipboard = async (inquiry: InquiryCopyInput) => {
  const plainText = formatInquiryDetailsText(inquiry);
  await copyTextToClipboard(plainText);
};
