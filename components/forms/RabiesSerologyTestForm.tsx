import { useResponsive } from "@/utils/hooks/useWindowsDimensions";
import { useRouter } from "next/navigation";
import { FC, useState, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useFieldArray, useForm } from "react-hook-form";
import RabiesSerologyTestSchema from "../schemas/rabies-serology-test-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import BookedSuccessfullyModal from "../modals/BookedSuccessfullyModal";
import useModal from "@/utils/hooks/useModal";
import BodyText from "../elements/text/BodyText";
import DynamicButton from "../elements/button/DynamicButton";
import FormContainer from "../containers/FormContainer";
import FormInput from "../elements/input/TextInput/FormInput";
import DateFormInput from "../elements/input/DateInput/DateFormInput";
import ImageFormInput from "../elements/input/ImageInput/ImageFormInput";
import PetDetails from "./sections/PetDetails";
import FormButtons from "./sections/Buttons";
import OwnerDetailsFields from "./sections/OwnerDetails";

// ─── Progress ────────────────────────────────────────────────────────────────

const Progress: FC<{ step: 0 | 1 | 2 | 3 }> = ({ step }) => {
  const percentage = (step / 3) * 100;

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
  step: number;
  setStep: (s: 0 | 1 | 2 | 3) => void;
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
      <OwnerDetailsFields control={control} />
      <DateFormInput
        name="date"
        label="Date of testing"
        control={control}
        dateType="specific"
        required
      />
      <FormButtons
        step={step}
        setStep={setStep}
        onSubmit={onSubmit}
        loading={loading}
        maxSteps={3}
      />
    </FormContainer>
  );
};

// ─── Review ───────────────────────────────────────────────────────────────────

type ReviewProps = {
  control: any;
  fields: any[];
  step: number;
  setStep: (s: 0 | 1 | 2 | 3) => void;
  onSubmit: () => void;
  loading: boolean;
};

const Review: FC<ReviewProps> = ({
  control,
  fields,
  step,
  setStep,
  onSubmit,
  loading,
}) => {
  const responsive = useResponsive();

  return (
    <FormContainer>
      <BodyText className="text-center" size="large" weight="semibold">
        OWNER DETAILS
      </BodyText>
      <div
        className={`grid ${responsive.isTabletOrMobile ? "grid-cols-1 gap-12" : "grid-cols-2 gap-4"}`}
      >
        <div className="flex flex-col gap-6">
          <OwnerDetailsFields control={control} disabled />
        </div>
      </div>
      <DateFormInput
        name="date"
        label="Date of testing"
        control={control}
        dateType="specific"
        required
      />

      {fields.map((field, index) => (
        <div className="flex flex-col gap-6" key={field.id}>
          <BodyText className="text-center" size="large" weight="semibold">
            PET {index !== 0 && index + 1} DETAILS
          </BodyText>
          <div
            className={`grid ${responsive.isTabletOrMobile ? "grid-cols-1 gap-6" : "grid-cols-2 gap-4"}`}
          >
            <div className="flex flex-col gap-6">
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
              <div className="flex gap-2">
                <FormInput
                  name={`pets.${index}.pet_age_years`}
                  placeholder="Enter years"
                  label="YEARS"
                  control={control}
                  required
                />
                <BodyText className="text-neutral-500">&</BodyText>
                <FormInput
                  name={`pets.${index}.pet_age_months`}
                  placeholder="Enter months"
                  label="MONTHS"
                  control={control}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
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
        maxSteps={3}
      />
    </FormContainer>
  );
};

// ─── RabiesSerologyTestForm ───────────────────────────────────────────────────

const RabiesSerologyTestForm: FC = () => {
  const [step, setStepState] = useState<0 | 1 | 2 | 3>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const modal = useModal();

  const createPetDetails = useMutation(
    api.mutations.pet_details.createPetDetails,
  );
  const generateUploadUrl = useMutation(
    api.mutations.pet_details.generateUploadUrl,
  );
  const bookRabiesSerologyTest = useMutation(
    api.mutations.rabies_serology_test.bookRabiesSerologyTest,
  );
  const upsertOwner = useMutation(api.mutations.users.upsertOwner);
  const attachPets = useMutation(api.mutations.users.attachPets);

  const createRabiesSerologyTestForm = useForm({
    resolver: zodResolver(RabiesSerologyTestSchema),
    defaultValues: {
      owner: {
        owner_name: "",
        contact_form: "",
        account_name: "",
        account_link: "",
        contact_number: "",
        email_address: "",
      },
      date: "",
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
    },
  });

  const control = createRabiesSerologyTestForm.control;
  const { fields, append, remove } = useFieldArray({ control, name: "pets" });

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
    async (nextStep: 0 | 1 | 2 | 3) => {
      if (nextStep <= step) {
        setStepState(nextStep);
        return;
      }

      if (step === 1) {
        // Validate owner details
        const ownerFields = [
          "owner.owner_name" as const,
          "owner.contact_form" as const,
          "owner.account_name" as const,
          "owner.contact_number" as const,
          "owner.email_address" as const,
          "date" as const,
        ];
        const isOwnerStepValid =
          await createRabiesSerologyTestForm.trigger(ownerFields);
        if (!isOwnerStepValid) {
          scrollToFirstError();
          return;
        }
        setStepState(nextStep);
        return;
      }

      if (step === 2) {
        // Validate pet details
        const isPetsStepValid =
          await createRabiesSerologyTestForm.trigger("pets");
        if (!isPetsStepValid) {
          scrollToFirstError();
          return;
        }
        setStepState(nextStep);
        return;
      }

      setStepState(nextStep);
    },
    [createRabiesSerologyTestForm, scrollToFirstError, step],
  );

  const handleSubmit = () => {
    createRabiesSerologyTestForm.handleSubmit(async (data) => {
      try {
        setLoading(true);
        const ownerData = data.owner;
        const userId = await upsertOwner(ownerData);
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

        await attachPets({ userId, petIds });

        const bookingData = {
          userId,
          date: data.date,
          pets: petIds,
        };

        const bookingId = await bookRabiesSerologyTest(bookingData);
        console.log("Booking created successfully:", bookingId);
        createRabiesSerologyTestForm.reset();
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
    maxSteps: 3,
  };

  return (
    <div className="flex flex-col w-full items-center gap-8">
      {step === 0 && <Disclaimer onAgree={() => setStepState(1)} />}
      {step === 1 && <OwnerDetails control={control} {...sharedButtonProps} />}
      {step === 2 && (
        <PetDetails
          control={control}
          fields={fields}
          append={append}
          remove={remove}
          {...sharedButtonProps}
        />
      )}
      {step === 3 && (
        <Review control={control} fields={fields} {...sharedButtonProps} />
      )}
      <Progress step={step} />
    </div>
  );
};

export default RabiesSerologyTestForm;
