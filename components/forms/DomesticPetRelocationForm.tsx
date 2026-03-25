import { FC, useState, useCallback } from "react";
import FormContainer from "../containers/FormContainer";
import BodyText from "../elements/text/BodyText";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuMapPin, LuMapPinCheckInside } from "react-icons/lu";
import DynamicButton from "../elements/button/DynamicButton";
import RadioFormInput from "../elements/input/RadioInput/RadioFormInput";
import DateFormInput from "../elements/input/DateInput/DateFormInput";
import FormInput from "../elements/input/TextInput/FormInput";
import ImageFormInput from "../elements/input/ImageInput/ImageFormInput";
import { useResponsive } from "@/utils/hooks/useWindowsDimensions";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import useModal from "@/utils/hooks/useModal";
import BookedSuccessfullyModal from "../modals/BookedSuccessfullyModal";
import DomesticRelocationFormSchema from "../schemas/domestic-pet-relocation-schema";
import IconSelectFormInput from "../elements/input/SelectInput/IconSelectFormInput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PetDetails from "./sections/PetDetails";
import FormButtons from "./sections/Buttons";

// ─── RenderIcon ──────────────────────────────────────────────────────────────

const RenderIcon: FC<{ path: string }> = ({ path }) => {
  return (
    <Image src={path} alt="Transport mode icon" width={200} height={200} />
  );
};

// ─── Progress ────────────────────────────────────────────────────────────────

const Progress: FC<{ step: 0 | 1 | 2 | 3 | 4 }> = ({ step }) => {
  const percentage = (step / 4) * 100;

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

// ─── Disclaimer ──────────────────────────────────────────────────────────────

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

// ─── OwnerDetails ─────────────────────────────────────────────────────────────

type OwnerDetailsProps = {
  control: any;
  travelDate: string;
  dateType: "specific" | "range";
  step: number;
  setStep: (s: 0 | 1 | 2 | 3 | 4) => void;
  onSubmit: () => void;
  loading: boolean;
};

const OwnerDetails: FC<OwnerDetailsProps> = ({
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
        OWNER DETAILS
      </BodyText>
      <FormInput
        name="owner_name"
        label="OWNER'S NAME"
        placeholder="Enter owner's name"
        control={control}
        required
      />
      <div className="flex gap-6 md:px-10">
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
          <FormInput
            label="PICK-UP ADDRESS"
            placeholder="Enter pick-up address"
            name="pickup_address"
            control={control}
            required
          />
          <FormInput
            label="DESTINATION ADDRESS"
            placeholder="Enter destination Address"
            name="destination"
            control={control}
            required
          />
        </div>
      </div>
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
      <div className="flex flex-col md:flex-row w-full gap-4">
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
      <FormInput
        name="contact_number"
        label="CONTACT NUMBER"
        placeholder="Enter contact number"
        control={control}
        required
      />
      <FormInput
        name="email_address"
        label="ACTIVE EMAIL ADDRESS"
        placeholder="Enter active email address"
        control={control}
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
      <FormButtons
        step={step}
        setStep={setStep}
        onSubmit={onSubmit}
        loading={loading}
        maxSteps={4}
      />
    </FormContainer>
  );
};

// ─── ModeOfTransport ──────────────────────────────────────────────────────────

type ModeOfTransportProps = {
  control: any;
  step: number;
  setStep: (s: 0 | 1 | 2 | 3 | 4) => void;
  onSubmit: () => void;
  loading: boolean;
  type?: string;
};

const ModeOfTransport: FC<ModeOfTransportProps> = ({
  control,
  step,
  setStep,
  onSubmit,
  loading,
  type,
}) => {
  return (
    <FormContainer className="max-w-3xl!">
      <IconSelectFormInput
        label="CHOOSE THE MODE OF TRANSPORT"
        name="mode_of_transport"
        control={control}
        options={[
          {
            label: "Land",
            value: "land",
            icon: <RenderIcon path="/images/icons/transport/car.png" />,
          },
          {
            label: "Air",
            value: "air",
            icon: <RenderIcon path="/images/icons/transport/airplane.png" />,
          },
          {
            label: "Sea",
            value: "sea",
            icon: <RenderIcon path="/images/icons/transport/ship.png" />,
          },
        ]}
      />
      <FormButtons
        step={step}
        setStep={setStep}
        onSubmit={onSubmit}
        loading={loading}
        maxSteps={4}
      />
    </FormContainer>
  );
};

// ─── PetIndexDetails ──────────────────────────────────────────────────────────

// ─── PetDetails ───────────────────────────────────────────────────────────────

// ─── Review ───────────────────────────────────────────────────────────────────

type ReviewProps = {
  control: any;
  fields: any[];
  travelDate: string;
  dateType: "specific" | "range";
  step: number;
  setStep: (s: 0 | 1 | 2 | 3 | 4) => void;
  onSubmit: () => void;
  loading: boolean;
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
}) => {
  const responsive = useResponsive();

  return (
    <FormContainer>
      <BodyText className="text-center" size="large" weight="semibold">
        REVIEW FORM
      </BodyText>
      <div
        className={`grid ${responsive.isTabletOrMobile ? "grid-cols-1 gap-12" : "grid-cols-2 gap-4"}`}
      >
        <div className="flex flex-col gap-12">
          <BodyText size="large" weight="semibold">
            DESTINATION
          </BodyText>
          <div className="flex gap-6 md:pl-10">
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
              <FormInput
                label="PICK-UP ADDRESS"
                placeholder="Enter pick-up address"
                name="pickup_address"
                control={control}
                required
                disabled
              />
              <FormInput
                label="DESTINATION ADDRESS"
                placeholder="Enter destination Address"
                name="destination"
                control={control}
                required
                disabled
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <BodyText size="large" weight="semibold">
            TRAVEL DETAILS
          </BodyText>
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
            widthFull
            disabled
            required
          />
          <IconSelectFormInput
            label="CHOOSE THE MODE OF TRANSPORT"
            name="mode_of_transport"
            control={control}
            onlySelected
            disabled
            required
            noSelectedLabel="No mode of transport selected"
            options={[
              {
                label: "Land",
                value: "land",
                icon: <RenderIcon path="/images/icons/transport/car.png" />,
              },
              {
                label: "Air",
                value: "air",
                icon: (
                  <RenderIcon path="/images/icons/transport/airplane.png" />
                ),
              },
              {
                label: "Sea",
                value: "sea",
                icon: <RenderIcon path="/images/icons/transport/ship.png" />,
              },
            ]}
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
        placeholder="Enter the full address"
        control={control}
        keyboardType="paragraph"
        widthFull
        required
      />
      <FormInput
        name="destination_full_address"
        label="DESTINATION FULL ADDRESS*"
        placeholder="Enter the full address"
        control={control}
        keyboardType="paragraph"
        widthFull
        required
      />

      <BodyText className="text-center" size="large" weight="semibold">
        OWNER DETAILS
      </BodyText>
      <div
        className={`grid ${responsive.isTabletOrMobile ? "grid-cols-1 gap-12" : "grid-cols-2 gap-4"}`}
      >
        <div className="flex flex-col gap-12">
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
          <FormInput
            name="contact_number"
            label="CONTACT NUMBER"
            placeholder="Enter contact number"
            control={control}
            widthFull
            disabled
            required
          />
        </div>
        <div className="flex flex-col gap-12">
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

      {fields.map((field, index) => (
        <div className="flex flex-col gap-12" key={field.id}>
          <BodyText className="text-center" size="large" weight="semibold">
            PET {index !== 0 && index + 1} DETAILS
          </BodyText>
          <div
            className={`grid ${responsive.isTabletOrMobile ? "grid-cols-1 gap-12" : "grid-cols-2 gap-4"}`}
          >
            <div className="flex flex-col gap-12">
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
              <div className="flex gap-2">
                <FormInput
                  name={`pets.${index}.pet_age_years`}
                  placeholder="Enter years"
                  label="YEARS"
                  control={control}
                  required
                  disabled
                />
                <BodyText className="text-neutral-500">&</BodyText>
                <FormInput
                  name={`pets.${index}.pet_age_months`}
                  placeholder="Enter months"
                  label="MONTHS"
                  control={control}
                  required
                  disabled
                />
              </div>
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
              <FormInput
                name={`pets.${index}.pet_weight`}
                label="PET'S WEIGHT"
                control={control}
                widthFull
                disabled
                placeholder="Enter pet's estimated weight"
                required
              />
            </div>
          </div>
          <FormInput
            name={`pets.${index}.pet_condition`}
            label="MEDICAL CONDITION"
            placeholder="Enter pets' medical condition that we should be aware of"
            control={control}
            disabled
            keyboardType="paragraph"
            widthFull
          />
          <FormInput
            name={`pets.${index}.special_instructions`}
            label="SPECIAL INSTRUCTIONS"
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
        maxSteps={4}
      />
    </FormContainer>
  );
};

// ─── RelocationForm ───────────────────────────────────────────────────────────

type RelocationFormProps = {
  type?: string;
};

const RelocationForm: FC<RelocationFormProps> = ({ type }) => {
  const [step, setStepState] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const modal = useModal();
  const router = useRouter();

  const createPetDetails = useMutation(
    api.mutations.pet_details.createPetDetails,
  );
  const generateUploadUrl = useMutation(
    api.mutations.pet_details.generateUploadUrl,
  );
  const bookDomesticPetTransport = useMutation(
    api.mutations.domestic_pet_transport.bookDomesticPetTransport,
  );

  const createDomesticRelocationForm = useForm({
    resolver: zodResolver(DomesticRelocationFormSchema),
    defaultValues: {
      owner_name: "",
      pickup_address: "",
      destination: "",
      contact_form: "",
      account_name: "",
      account_link: "",
      contact_number: "",
      email_address: "",
      travel_date: "",
      date: "",
      mode_of_transport: type || "",
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
    },
  });

  const control = createDomesticRelocationForm.control;
  const { fields, append, remove } = useFieldArray({ control, name: "pets" });
  const travelDate = useWatch({ control, name: "travel_date" });
  const dateType = travelDate === "yes" ? "specific" : "range";

  const scrollToFirstError = useCallback(() => {
    const firstError = document.querySelector("[data-error=true]");
    if (firstError) {
      firstError.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  const setStep = useCallback(
    async (nextStep: 0 | 1 | 2 | 3 | 4) => {
      if (nextStep <= step) {
        setStepState(nextStep);
        return;
      }

      if (step === 1) {
        // Validate pickup/destination
        const routeFields = ["pickup_address" as const, "destination" as const];
        const isRouteStepValid =
          await createDomesticRelocationForm.trigger(routeFields);
        if (!isRouteStepValid) {
          scrollToFirstError();
          return;
        }
        setStepState(nextStep);
        return;
      }

      if (step === 2) {
        // Validate travel details
        const travelFields = [
          "travel_date" as const,
          "date" as const,
          "mode_of_transport" as const,
        ];
        const isTravelStepValid =
          await createDomesticRelocationForm.trigger(travelFields);
        if (!isTravelStepValid) {
          scrollToFirstError();
          return;
        }
        setStepState(nextStep);
        return;
      }

      if (step === 3) {
        // Validate pet details
        const isPetsStepValid =
          await createDomesticRelocationForm.trigger("pets");
        if (!isPetsStepValid) {
          scrollToFirstError();
          return;
        }
        setStepState(nextStep);
        return;
      }

      setStepState(nextStep);
    },
    [createDomesticRelocationForm, scrollToFirstError, step],
  );

  const handleSubmit = () => {
    createDomesticRelocationForm.handleSubmit(async (data) => {
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

          const petData: any = {
            pet_name: pet.pet_name,
            breed: pet.breed,
            sex: pet.sex,
            pet_birthday: pet.pet_birthday,
            pet_age: `${pet.pet_age_years}y ${pet.pet_age_months}m`,
            pet_weight: pet.pet_weight,
            pet_image: petImageId as any,
          };

          if (pet.pet_condition) petData.pet_condition = pet.pet_condition;
          if (pet.special_instructions)
            petData.special_instructions = pet.special_instructions;

          const petId = await createPetDetails(petData);
          petIds.push(petId);
        }

        const bookingData = {
          owner_name: data.owner_name,
          pickup_address: data.pickup_address,
          destination: data.destination,
          contact_form: data.contact_form,
          account_name: data.account_name,
          account_link: data.account_link,
          contact_number: data.contact_number,
          email_address: data.email_address,
          travel_date: data.travel_date,
          date: data.date,
          mode_of_transport: data.mode_of_transport,
          pets: petIds,
          origin_full_address: data.origin_full_address,
          destination_full_address: data.destination_full_address,
        };

        const bookingId = await bookDomesticPetTransport(bookingData);
        console.log("Booking created successfully:", bookingId);
        createDomesticRelocationForm.reset();
        modal.setModalComponent(<BookedSuccessfullyModal />, "large");
        modal.setShown(true);
        setTimeout(() => {
          modal.setShown(false);
          router.push("/");
        }, 3000);
      } catch (error) {
        console.error("Error creating booking:", error);
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
    maxSteps: 4,
  };

  return (
    <div className="flex flex-col w-full items-center gap-8">
      {step === 0 && <Disclaimer onAgree={() => setStepState(1)} />}
      {step === 1 && (
        <OwnerDetails
          control={control}
          travelDate={travelDate}
          dateType={dateType}
          {...sharedButtonProps}
        />
      )}
      {step === 2 && (
        <ModeOfTransport control={control} type={type} {...sharedButtonProps} />
      )}
      {step === 3 && (
        <PetDetails
          control={control}
          fields={fields}
          append={append}
          remove={remove}
          {...sharedButtonProps}
        />
      )}
      {step === 4 && (
        <Review
          control={control}
          fields={fields}
          travelDate={travelDate}
          dateType={dateType}
          {...sharedButtonProps}
        />
      )}
      <Progress step={step} />
    </div>
  );
};

// ─── DomesticPetRelocationForm ────────────────────────────────────────────────

type DomesticPetRelocationFormProps = {
  type?: string;
};

const DomesticPetRelocationForm: FC<DomesticPetRelocationFormProps> = ({
  type,
}) => {
  return <RelocationForm type={type} />;
};

export default DomesticPetRelocationForm;
