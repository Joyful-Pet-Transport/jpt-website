import { FC, useCallback, useState } from "react";
import { getData as getCountryListData } from "country-list";
import FormContainer from "../containers/FormContainer";
import BodyText from "../elements/text/BodyText";
import { FieldPath, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectFormInput from "../elements/input/SelectInput/SelectFormInput";
import { LuMapPin, LuMapPinCheckInside } from "react-icons/lu";
import DynamicButton from "../elements/button/DynamicButton";
import RadioFormInput from "../elements/input/RadioInput/RadioFormInput";
import DateFormInput from "../elements/input/DateInput/DateFormInput";
import FormInput from "../elements/input/TextInput/FormInput";
import ImageFormInput from "../elements/input/ImageInput/ImageFormInput";
import { useResponsive } from "@/utils/hooks/useWindowsDimensions";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import useModal from "@/utils/hooks/useModal";
import BookedSuccessfullyModal from "../modals/BookedSuccessfullyModal";
import InternationalRelocationFormSchema from "../schemas/international-pet-relocation-schema";
import { useRouter } from "next/navigation";
import PetDetails from "./sections/PetDetails";
import FormButtons from "./sections/Buttons";
import z from "zod";

type InternationalPetRelocationFormProps = {
  type: string;
};

// ─── Country Data Hook ───────────────────────────────────────────────────────────

const useCountryData = () => {
  const availableCountries =
    useQuery(api.tables.available_countries.getAvailable)?.map((country) => ({
      label: country.name,
      value: country.code,
    })) ?? [];

  const allCountries =
    useQuery(api.tables.available_countries.getAll)?.map((country) => ({
      label: country.name,
      value: country.code,
    })) ?? [];

  const philippinesCode =
    allCountries.find((c) => c.label === "Philippines")?.value ?? "PH";

  return { availableCountries, allCountries, philippinesCode };
};

// ─── Progress ───────────────────────────────────────────────────────────────

const Progress: FC<{ step: 0 | 1 | 2 | 3 | 4 | 5 | 6 }> = ({ step }) => {
  const percentage = (step / 6) * 100;

  return (
    <div className="w-full max-w-96 h-3 rounded-full bg-neutral-200 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-300 ease-in-out"
        style={{
          width: `${percentage}%`,
          background: "linear-gradient(to right, #FF905D, #41B2F6)",
        }}
      />
    </div>
  );
};

const internationalRelocationStepFields = {
  1: ["origin_country", "destination"],
  2: [
    "origin_full_address",
    "origin_city",
    "origin_state_province",
    "origin_postal_code",
    "origin_address_country",
    "destination_full_address",
    "destination_city",
    "destination_state_province",
    "destination_postal_code",
    "destination_address_country",
  ],
  3: ["companionship", "travel_date", "date"],
  4: [
    "owner_name",
    "contact_number",
    "contact_form",
    "email_address",
    "account_name",
    "account_link",
  ],
} as const;

// ─── Disclaimer ─────────────────────────────────────────────────────────────

const Disclaimer: FC<{ onAgree: () => void }> = ({ onAgree }) => {
  return (
    <FormContainer className="justify-center items-center">
      <BodyText
        size="large"
        weight="semibold"
        className="text-center uppercase"
      >
        privacy notice and consent statement
      </BodyText>
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <BodyText className="text-center">
          At <span className="italic font-bold">Joyful Pet Transport</span>, we
          are committed to protecting your personal information.
        </BodyText>
        <BodyText className="text-center">
          By proceeding with this form, you acknowledge and agree that all
          information collected — including your personal details, contact
          information, pet details, and travel documents — will be used solely
          for the purpose of processing your pet's transport arrangements,
          documentation, and compliance with local and international travel
          regulations.
        </BodyText>
        <BodyText className="text-center">
          All information provided will be handled with strict confidentiality
          and in accordance with applicable data privacy laws. We do not share
          your information with unauthorized third parties.
        </BodyText>
        <BodyText className="text-center">
          By continuing, you voluntarily consent to the collection, use, and
          processing of your data for pet transport services.
        </BodyText>
      </div>
      <div className="flex flex-col justify-center items-center max-w-2xl mx-auto gap-2">
        <DynamicButton size="medium" onPress={onAgree}>
          I AGREE
        </DynamicButton>
        <BodyText
          size="xsmall"
          className="text-center"
          textColor="text-neutral-500"
        >
          By clicking this button, you confirm that you have read the Privacy
          Notice and Consent Statement and consent to the collection and use of
          your personal information for your pet's transport.
        </BodyText>
      </div>
    </FormContainer>
  );
};

// ─── Destination ─────────────────────────────────────────────────────────────

type DestinationProps = {
  control: any;
  type: "import" | "export";
  step: number;
  setStep: (s: 0 | 1 | 2 | 3 | 4 | 5 | 6) => void;
  onSubmit: () => void;
  loading: boolean;
  availableCountries: { label: string; value: string }[];
  allCountries: { label: string; value: string }[];
};

const Destination: FC<DestinationProps> = ({
  control,
  type,
  step,
  setStep,
  onSubmit,
  loading,
  availableCountries,
  allCountries,
}) => {
  const destinationOptions =
    type === "export"
      ? availableCountries.filter((country) => country.value !== "PH")
      : availableCountries;

  return (
    <FormContainer>
      <BodyText size="large" weight="semibold" className="text-center">
        DESTINATION
      </BodyText>
      <BodyText size="medium" weight="semibold" className="uppercase">
        Where are the origin and destination countries?
      </BodyText>
      <div className="flex gap-6 lg:px-10">
        <div className="flex flex-col justify-end items-center gap-4 pb-2">
          <LuMapPin className="text-2xl text[#5B5959]" />
          <div className="flex flex-col gap-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full" />
            <div className="w-2 h-2 bg-gray-300 rounded-full" />
            <div className="w-2 h-2 bg-gray-300 rounded-full" />
          </div>
          <LuMapPinCheckInside className="text-2xl text-[#E86B31]" />
        </div>
        <div className="flex flex-col flex-1 gap-6">
          <SelectFormInput
            label="ORIGIN COUNTRY"
            name="origin_country"
            control={control}
            options={allCountries}
            disabled={type === "export"}
            required
          />
          <SelectFormInput
            label="DESTINATION COUNTRY"
            name="destination"
            control={control}
            options={destinationOptions}
            disabled={type === "import"}
            required
          />
        </div>
      </div>
      <FormButtons
        step={step}
        setStep={setStep}
        onSubmit={onSubmit}
        loading={loading}
        maxSteps={6}
      />
    </FormContainer>
  );
};

// ─── DestinationFullAddress ─────────────────────────────────────────────────────────────

type DestinationFullAddressProps = {
  control: any;
  step: number;
  setStep: (s: 0 | 1 | 2 | 3 | 4 | 5 | 6) => void;
  onSubmit: () => void;
  loading: boolean;
};

const DestinationFullAddress: FC<DestinationFullAddressProps> = ({
  control,
  step,
  setStep,
  onSubmit,
  loading,
}) => {
  return (
    <FormContainer>
      <BodyText size="large" weight="semibold" className="text-center">
        DESTINATION (FULL ADDRESSES)
      </BodyText>
      <BodyText size="medium" weight="semibold" className="uppercase">
        What are the full addresses of the origin and destination?
      </BodyText>

      <div className="flex flex-col gap-6">
        <FormInput
          name="origin_full_address"
          label="ORIGIN FULL ADDRESS*"
          placeholder="Enter Address"
          control={control}
          widthFull
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            name="origin_city"
            label="CITY/DISTRICT"
            placeholder="Enter City/District"
            control={control}
            widthFull
            required
          />
          <FormInput
            name="origin_state_province"
            label="STATE/PROVINCE"
            placeholder="Enter State/Province"
            control={control}
            widthFull
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            name="origin_postal_code"
            label="POSTAL CODE"
            placeholder="Enter Postal Code"
            control={control}
            widthFull
            required
          />
          <FormInput
            name="origin_address_country"
            label="COUNTRY"
            placeholder="Enter Country"
            control={control}
            widthFull
            required
          />
        </div>

        <FormInput
          name="destination_full_address"
          label="DESTINATION FULL ADDRESS*"
          placeholder="Enter Address"
          control={control}
          widthFull
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            name="destination_city"
            label="CITY/DISTRICT"
            placeholder="Enter City/District"
            control={control}
            widthFull
            required
          />
          <FormInput
            name="destination_state_province"
            label="STATE/PROVINCE"
            placeholder="Enter State/Province"
            control={control}
            widthFull
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            name="destination_postal_code"
            label="POSTAL CODE"
            placeholder="Enter Postal Code"
            control={control}
            widthFull
            required
          />
          <FormInput
            name="destination_address_country"
            label="COUNTRY"
            placeholder="Enter Country"
            control={control}
            widthFull
            required
          />
        </div>
      </div>
      <FormButtons
        step={step}
        setStep={setStep}
        onSubmit={onSubmit}
        loading={loading}
        maxSteps={6}
      />
    </FormContainer>
  );
};

// ─── TravelDetails ───────────────────────────────────────────────────────────

type TravelDetailsProps = {
  control: any;
  travelDate: string;
  dateType: "specific" | "range";
  step: number;
  setStep: (s: 0 | 1 | 2 | 3 | 4 | 5 | 6) => void;
  onSubmit: () => void;
  loading: boolean;
};

const TravelDetails: FC<TravelDetailsProps> = ({
  control,
  travelDate,
  dateType,
  step,
  setStep,
  onSubmit,
  loading,
}) => {
  return (
    <FormContainer>
      <BodyText size="large" weight="semibold" className="text-center">
        TRAVEL DETAILS
      </BodyText>
      <div className="flex flex-col gap-4 w-full">
        <RadioFormInput
          name="companionship"
          label="WILL YOUR PET TRAVEL WITH YOU OR ALONE?"
          control={control}
          options={[
            {
              label: "Travels WITH you (Accompanied or same flight)",
              value: "with",
            },
            {
              label: "Travels ALONE (Cargo/ Customs release)",
              value: "alone",
            },
          ]}
          required
        />
        <RadioFormInput
          name="travel_date"
          label="DO YOU HAVE A SPECIFIC TARGET TRAVEL DATE?"
          control={control}
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          required
        />
        <DateFormInput
          name="date"
          label={
            travelDate
              ? travelDate === "yes"
                ? "SPECIFIC TRAVEL DATE"
                : "ESTIMATED TRAVEL DATE"
              : "TRAVEL DATE"
          }
          control={control}
          dateType={dateType}
          disabled={!travelDate}
          required
        />
      </div>
      <FormButtons
        step={step}
        setStep={setStep}
        onSubmit={onSubmit}
        loading={loading}
        maxSteps={6}
      />
    </FormContainer>
  );
};

// ─── OwnerDetails ────────────────────────────────────────────────────────────

type OwnerDetailsProps = {
  control: any;
  step: number;
  setStep: (s: 0 | 1 | 2 | 3 | 4 | 5 | 6) => void;
  onSubmit: () => void;
  loading: boolean;
};

const OwnerDetails: FC<OwnerDetailsProps> = ({
  control,
  step,
  setStep,
  onSubmit,
  loading,
}) => {
  return (
    <FormContainer>
      <BodyText size="large" weight="semibold" className="text-center">
        OWNER DETAILS
      </BodyText>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          name="owner_name"
          label="OWNER'S NAME"
          placeholder="Enter owner's name"
          control={control}
          required
          className="w-full"
        />
        <FormInput
          name="contact_number"
          label="CONTACT NUMBER"
          placeholder="Enter contact number"
          control={control}
          required
          className="w-full"
        />
        <RadioFormInput
          name="contact_form"
          label="WHERE CAN WE CONTACT YOU?"
          control={control}
          options={[
            { label: "Facebook Messenger", value: "facebook" },
            { label: "WhatsApp", value: "whatsapp" },
            { label: "Viber", value: "viber" },
            { label: "Telegram", value: "telegram" },
          ]}
          required
        />
        <FormInput
          name="email_address"
          label="ACTIVE EMAIL ADDRESS"
          placeholder="Enter active email address"
          control={control}
          required
          className="w-full"
        />
        <FormInput
          name="account_name"
          label="ACCOUNT NAME"
          placeholder="Enter account name"
          control={control}
          required
          className="w-full"
        />
        <FormInput
          name="account_link"
          label="LINK"
          placeholder="Enter link"
          className="w-full"
          control={control}
        />
      </div>
      <FormButtons
        step={step}
        setStep={setStep}
        onSubmit={onSubmit}
        loading={loading}
        maxSteps={6}
      />
    </FormContainer>
  );
};

// ─── PetIndexDetails ─────────────────────────────────────────────────────────

// ─── PetDetails ──────────────────────────────────────────────────────────────

// ─── Review ──────────────────────────────────────────────────────────────────

type ReviewProps = {
  control: any;
  fields: any[];
  travelDate: string;
  dateType: "specific" | "range";
  step: number;
  setStep: (s: 0 | 1 | 2 | 3 | 4 | 5 | 6) => void;
  onSubmit: () => void;
  loading: boolean;
  availableCountries: { label: string; value: string }[];
  allCountries: { label: string; value: string }[];
};

const ReviewPetAgeInputs: FC<{ index: number; control: any }> = ({
  index,
  control,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <BodyText weight="semibold">AGE</BodyText>
      <div className="flex items-center gap-2 w-full">
        <FormInput
          name={`pets.${index}.pet_age_years`}
          label="YEARS"
          placeholder="Enter years"
          control={control}
          disabled
          required
        />
        <BodyText className="text-neutral-500">&</BodyText>
        <FormInput
          name={`pets.${index}.pet_age_months`}
          label="MONTHS"
          placeholder="Enter months"
          control={control}
          disabled
          required
        />
      </div>
    </div>
  );
};

const Review: FC<ReviewProps> = ({
  control,
  fields,
  travelDate,
  dateType,
  step,
  setStep,
  onSubmit,
  loading,
  availableCountries,
  allCountries,
}) => {
  const responsive = useResponsive();

  return (
    <FormContainer>
      <div
        className={`grid pb-8 ${responsive.isTabletOrMobile ? "grid-cols-1 gap-12" : "grid-cols-2 gap-4"}`}
      >
        <div className="flex flex-col gap-4">
          <BodyText size="large" weight="semibold" className="text-center">
            DESTINATION
          </BodyText>
          <div className="flex flex-col gap-4">
            <SelectFormInput
              label="ORIGIN COUNTRY"
              name="origin_country"
              control={control}
              options={allCountries}
              disabled
              required
            />
            <SelectFormInput
              label="DESTINATION"
              name="destination"
              control={control}
              options={availableCountries}
              disabled
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <BodyText size="large" weight="semibold" className="text-center">
            TRAVEL DETAILS
          </BodyText>
          <RadioFormInput
            name="companionship"
            label="WILL YOUR PET TRAVEL WITH YOU OR ALONE?"
            control={control}
            options={[
              {
                label: "Travels WITH you (Accompanied or same flight)",
                value: "with",
              },
              {
                label: "Travels ALONE (Cargo/ Customs release)",
                value: "alone",
              },
            ]}
            required
            disabled
          />
          <RadioFormInput
            name="travel_date"
            label="DO YOU HAVE A SPECIFIC TARGET TRAVEL DATE?"
            control={control}
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            required
            disabled
          />
          <DateFormInput
            name="date"
            label={
              travelDate
                ? travelDate === "yes"
                  ? "SPECIFIC TRAVEL DATE"
                  : "ESTIMATED TRAVEL DATE"
                : "TRAVEL DATE"
            }
            control={control}
            dateType={dateType}
            disabled
            required
          />
        </div>
      </div>

      <BodyText className="text-center" size="large" weight="semibold">
        DESTINATION
      </BodyText>
      <BodyText className="uppercase" size="medium" weight="semibold">
        What are the full addresses of the origin and destination?
      </BodyText>
      <FormInput
        name="origin_full_address"
        label="ORIGIN FULL ADDRESS*"
        placeholder="Enter Address"
        control={control}
        widthFull
        required
        disabled
      />
      <div
        className={`grid ${responsive.isTabletOrMobile ? "grid-cols-1 gap-6" : "grid-cols-2 gap-4"}`}
      >
        <FormInput
          name="origin_city"
          label="CITY/DISTRICT"
          placeholder="Enter City/District"
          control={control}
          widthFull
          required
          disabled
        />
        <FormInput
          name="origin_state_province"
          label="STATE/PROVINCE"
          placeholder="Enter State/Province"
          control={control}
          widthFull
          required
          disabled
        />
      </div>
      <div
        className={`grid ${responsive.isTabletOrMobile ? "grid-cols-1 gap-6" : "grid-cols-2 gap-4"}`}
      >
        <FormInput
          name="origin_postal_code"
          label="POSTAL CODE"
          placeholder="Enter Postal Code"
          control={control}
          widthFull
          required
          disabled
        />
        <FormInput
          name="origin_address_country"
          label="COUNTRY"
          placeholder="Enter Country"
          control={control}
          widthFull
          required
          disabled
        />
      </div>
      <FormInput
        name="destination_full_address"
        label="DESTINATION FULL ADDRESS*"
        placeholder="Enter Address"
        control={control}
        widthFull
        required
        disabled
      />
      <div
        className={`grid ${responsive.isTabletOrMobile ? "grid-cols-1 gap-6" : "grid-cols-2 gap-4"}`}
      >
        <FormInput
          name="destination_city"
          label="CITY/DISTRICT"
          placeholder="Enter City/District"
          control={control}
          widthFull
          required
          disabled
        />
        <FormInput
          name="destination_state_province"
          label="STATE/PROVINCE"
          placeholder="Enter State/Province"
          control={control}
          widthFull
          required
          disabled
        />
      </div>
      <div
        className={`grid ${responsive.isTabletOrMobile ? "grid-cols-1 gap-6" : "grid-cols-2 gap-4"}`}
      >
        <FormInput
          name="destination_postal_code"
          label="POSTAL CODE"
          placeholder="Enter Postal Code"
          control={control}
          widthFull
          required
          disabled
        />
        <FormInput
          name="destination_address_country"
          label="COUNTRY"
          placeholder="Enter Country"
          control={control}
          widthFull
          required
          disabled
        />
      </div>

      <BodyText className="text-center" size="large" weight="semibold">
        OWNER DETAILS
      </BodyText>
      <div
        className={`grid ${responsive.isTabletOrMobile ? "grid-cols-1 gap-6" : "grid-cols-2 gap-4"}`}
      >
        <div className="flex flex-col gap-6">
          <FormInput
            name="owner_name"
            label="OWNER'S NAME"
            placeholder="Enter owner's name"
            control={control}
            widthFull
            disabled
            required
          />
          <RadioFormInput
            name="contact_form"
            label="WHERE CAN WE CONTACT YOU?"
            control={control}
            disabled
            options={[
              { label: "Facebook Messenger", value: "facebook" },
              { label: "WhatsApp", value: "whatsapp" },
              { label: "Viber", value: "viber" },
              { label: "Telegram", value: "telegram" },
            ]}
            required
          />
        </div>
        <div className="flex flex-col gap-6">
          <FormInput
            name="contact_number"
            label="CONTACT NUMBER"
            placeholder="Enter contact number"
            control={control}
            widthFull
            disabled
            required
          />
          <FormInput
            name="email_address"
            label="ACTIVE EMAIL ADDRESS"
            placeholder="Enter active email address"
            control={control}
            widthFull
            disabled
            required
          />
        </div>
      </div>

      <div
        className={`grid pb-8 ${responsive.isTabletOrMobile ? "grid-cols-1 gap-6" : "grid-cols-2 gap-4"}`}
      >
        <FormInput
          name="account_name"
          label="ACCOUNT NAME"
          placeholder="Enter account name"
          control={control}
          widthFull
          disabled
          required
          className="w-full"
        />
        <FormInput
          name="account_link"
          label="LINK"
          placeholder="Enter link"
          className="w-full"
          control={control}
          widthFull
          disabled
        />
      </div>

      {fields.map((field, index) => (
        <div className="flex flex-col gap-6" key={field.id}>
          <BodyText className="text-center" size="large" weight="semibold">
            PET {index !== 0 && index + 1} DETAILS
          </BodyText>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row w-full gap-6">
              <FormInput
                name={`pets.${index}.pet_name`}
                label="PET'S NAME"
                placeholder="Enter pet's name"
                control={control}
                widthFull
                disabled
                className="w-full"
                required
              />
              <FormInput
                name={`pets.${index}.breed`}
                label="BREED"
                placeholder="Enter pet's breed"
                control={control}
                widthFull
                disabled
                className="w-full"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row w-full gap-6">
              <FormInput
                name={`pets.${index}.sex`}
                label="SEX"
                placeholder="Enter pet's gender (or sex)"
                control={control}
                widthFull
                disabled
                className="w-full"
                required
              />
              <FormInput
                name={`pets.${index}.pet_weight`}
                label="PET'S ESTIMATED WEIGHT"
                control={control}
                widthFull
                disabled
                placeholder="Enter pet's estimated weight"
                className="w-full"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row w-full gap-6">
              <DateFormInput
                name={`pets.${index}.pet_birthday`}
                label="DATE OF BIRTH"
                placeholder="Enter pet's birthday"
                control={control}
                widthFull
                disabled
                className="w-full"
                enableYearSelect
                required
              />
              <ReviewPetAgeInputs index={index} control={control} />
            </div>
          </div>
          <FormInput
            name={`pets.${index}.pet_condition`}
            label="MEDICAL CONDITION THAT WE SHOULD BE AWARE OF:"
            placeholder="Enter pets' medical condition that we should be aware of"
            control={control}
            disabled
            keyboardType="paragraph"
            widthFull
          />
          <FormInput
            name={`pets.${index}.special_instructions`}
            label="PLEASE NOTE SPECIAL INSTRUCTIONS FOR YOUR PET:"
            placeholder="E.g. Prefers male handlers, aggressive towards cats or other dogs, etc."
            control={control}
            disabled
            keyboardType="paragraph"
            widthFull
          />
          <ImageFormInput
            name={`pets.${index}.pet_image`}
            label="UPLOAD PET PHOTO"
            control={control}
            disabled
            widthFull
            required
          />
        </div>
      ))}

      <FormButtons
        step={step}
        setStep={setStep}
        onSubmit={onSubmit}
        loading={loading}
        maxSteps={6}
      />
    </FormContainer>
  );
};

// ─── RelocationForm ──────────────────────────────────────────────────────────

const RelocationForm: FC<{ type: "import" | "export" }> = ({ type }) => {
  const { availableCountries, allCountries, philippinesCode } =
    useCountryData();
  const [step, setCurrentStep] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const modal = useModal();
  const router = useRouter();
  type InternationalRelocationFormValues = z.infer<
    typeof InternationalRelocationFormSchema
  >;

  const createPetDetails = useMutation(
    api.mutations.pet_details.createPetDetails,
  );
  const generateUploadUrl = useMutation(
    api.mutations.pet_details.generateUploadUrl,
  );
  const bookInternationalPetTransport = useMutation(
    api.mutations.international_pet_transport.bookInternationalPetTransport,
  );

  const createInternationalRelocationForm = useForm<InternationalRelocationFormValues>({
    resolver: zodResolver(InternationalRelocationFormSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      origin_country: type === "export" ? philippinesCode : "",
      destination: type === "import" ? philippinesCode : "",
      companionship: "",
      travel_date: "",
      date: "",
      owner_name: "",
      contact_form: "",
      account_name: "",
      account_link: "",
      contact_number: "",
      email_address: "",
      pets: [
        {
          pet_name: "",
          breed: "",
          sex: "",
          pet_birthday: "",
          pet_age_years: "",
          pet_age_months: "",
          pet_weight: "",
          pet_condition: "",
          special_instructions: "",
          pet_image: [],
        },
      ],
      origin_full_address: "",
      destination_full_address: "",
      origin_city: "",
      origin_state_province: "",
      origin_postal_code: "",
      origin_address_country: "",
      destination_city: "",
      destination_state_province: "",
      destination_postal_code: "",
      destination_address_country: "",
    },
  });

  const control = createInternationalRelocationForm.control;

  const { fields, append, remove } = useFieldArray({ control, name: "pets" });

  const travelDate = useWatch({ control, name: "travel_date" });
  const dateType = travelDate === "yes" ? "specific" : "range";

  const scrollToFirstError = useCallback(() => {
    const firstError = document.querySelector("[data-error='true']");
    if (firstError) {
      firstError.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  const setStep = useCallback(
    async (nextStep: 0 | 1 | 2 | 3 | 4 | 5 | 6) => {
      if (nextStep <= step) {
        setCurrentStep(nextStep);
        return;
      }

      if (step === 5) {
        const isPetsStepValid = await createInternationalRelocationForm.trigger("pets");
        if (!isPetsStepValid) {
          scrollToFirstError();
          return;
        }
        setCurrentStep(nextStep);
        return;
      }

      const fieldsToValidate = internationalRelocationStepFields[
        step as keyof typeof internationalRelocationStepFields
      ] as FieldPath<InternationalRelocationFormValues>[] | undefined;
      if (!fieldsToValidate || fieldsToValidate.length === 0) {
        setCurrentStep(nextStep);
        return;
      }

      const isStepValid = await createInternationalRelocationForm.trigger(fieldsToValidate);
      if (!isStepValid) {
        scrollToFirstError();
        return;
      }

      setCurrentStep(nextStep);
    },
    [createInternationalRelocationForm, scrollToFirstError, step],
  );

  const handleSubmit = async () => {
    const isValid = await createInternationalRelocationForm.trigger();
    if (!isValid) {
      scrollToFirstError();
      return;
    }

    createInternationalRelocationForm.handleSubmit(async (data) => {
      try {
        setLoading(true);
        const petIds = [];

        for (const pet of data.pets) {
          let petImageId: string | undefined;

          if (
            pet.pet_image &&
            pet.pet_image.length > 0 &&
            pet.pet_image[0] instanceof File
          ) {
            const uploadUrl = await generateUploadUrl({});
            const response = await fetch(uploadUrl, {
              method: "POST",
              headers: { "Content-Type": pet.pet_image[0].type },
              body: pet.pet_image[0],
            });

            if (!response.ok) throw new Error("Failed to upload image");

            const { storageId } = await response.json();
            petImageId = storageId;
          }

          if (!petImageId) {
            throw new Error("Pet image upload is required");
          }

          const petData: any = {
            pet_name: pet.pet_name,
            breed: pet.breed,
            sex: pet.sex,
            pet_birthday: pet.pet_birthday,
            pet_age: `${pet.pet_age_years}y ${pet.pet_age_months}m`,
            pet_weight: pet.pet_weight,
            pet_image: petImageId,
          };

          if (pet.pet_condition) petData.pet_condition = pet.pet_condition;
          if (pet.special_instructions)
            petData.special_instructions = pet.special_instructions;

          const petId = await createPetDetails(petData);
          petIds.push(petId);
        }

        const bookingData = {
          origin_country: data.origin_country,
          destination: data.destination,
          companionship: data.companionship,
          travel_date: data.travel_date,
          date: data.date,
          owner_name: data.owner_name,
          contact_form: data.contact_form,
          account_name: data.account_name,
          account_link: data.account_link,
          contact_number: data.contact_number,
          email_address: data.email_address,
          origin_full_address: data.origin_full_address,
          origin_city: data.origin_city,
          origin_state_province: data.origin_state_province,
          origin_postal_code: data.origin_postal_code,
          origin_address_country: data.origin_address_country,
          destination_full_address: data.destination_full_address,
          destination_city: data.destination_city,
          destination_state_province: data.destination_state_province,
          destination_postal_code: data.destination_postal_code,
          destination_address_country: data.destination_address_country,
          pets: petIds,
        };

        const bookingId = await bookInternationalPetTransport(bookingData);
        console.log("Booking created successfully:", bookingId);
        createInternationalRelocationForm.reset();
        modal.setModalComponent(<BookedSuccessfullyModal />, "large");
        modal.setShown(true);
        setTimeout(() => {
          modal.setShown(false);
          router.push("/");
        }, 3000);
      } catch (error) {
        console.error("Error creating booking:", error);
        alert(
          `Error: ${error instanceof Error ? error.message : "Failed to create booking"}`,
        );
      } finally {
        setLoading(false);
      }
    })();
  };

  const sharedButtonProps = {
    step,
    setStep,
    onSubmit: handleSubmit,
    loading,
    maxSteps: 6,
  };

  return (
    <div className="flex flex-col w-full items-center gap-8">
      {step === 0 && <Disclaimer onAgree={() => setCurrentStep(1)} />}
      {step === 1 && (
        <Destination
          control={control}
          type={type}
          availableCountries={availableCountries}
          allCountries={allCountries}
          {...sharedButtonProps}
        />
      )}
      {step === 2 && (
        <DestinationFullAddress control={control} {...sharedButtonProps} />
      )}
      {step === 3 && (
        <TravelDetails
          control={control}
          travelDate={travelDate}
          dateType={dateType}
          {...sharedButtonProps}
        />
      )}
      {step === 4 && <OwnerDetails control={control} {...sharedButtonProps} />}
      {step === 5 && (
        <PetDetails
          control={control}
          fields={fields}
          append={append}
          remove={remove}
          {...sharedButtonProps}
        />
      )}
      {step === 6 && (
        <Review
          control={control}
          fields={fields}
          travelDate={travelDate}
          dateType={dateType}
          availableCountries={availableCountries}
          allCountries={allCountries}
          {...sharedButtonProps}
        />
      )}
      <Progress step={step} />
    </div>
  );
};

// ─── InternationalPetRelocationForm ──────────────────────────────────────────

const InternationalPetRelocationForm: FC<
  InternationalPetRelocationFormProps
> = ({ type }) => {
  if (type === "import") return <RelocationForm type="import" />;
  if (type === "export") return <RelocationForm type="export" />;

  return (
    <FormContainer className="justify-center items-center">
      <BodyText weight="bold">Invalid Form</BodyText>
    </FormContainer>
  );
};

export default InternationalPetRelocationForm;
