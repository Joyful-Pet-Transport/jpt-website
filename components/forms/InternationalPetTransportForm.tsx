import { FC, useState } from "react";
import { getData as getCountryListData } from "country-list";
import FormContainer from "../containers/FormContainer";
import BodyText from "../elements/text/BodyText";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectFormInput from "../elements/input/SelectInput/SelectFormInput";
import { LuMapPin, LuMapPinCheckInside } from "react-icons/lu";
import DynamicButton from "../elements/button/DynamicButton";
import RadioFormInput from "../elements/input/RadioInput/RadioFormInput";
import DateFormInput from "../elements/input/DateInput/DateFormInput";
import FormInput from "../elements/input/TextInput/FormInput";
import ImageFormInput from "../elements/input/ImageInput/ImageFormInput";
import { FaTrashCan } from "react-icons/fa6";
import { useResponsive } from "@/utils/hooks/useWindowsDimensions";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import useModal from "@/utils/hooks/useModal";
import BookedSuccessfullyModal from "../modals/BookedSuccessfullyModal";
import InternationalRelocationFormSchema from "../schemas/international-pet-relocation-schema";
import { useRouter } from "next/navigation";

type InternationalPetRelocationFormProps = {
  type: string;
};

type PetDetailsProps = {
  index: number;
  remove: (index: number) => void;
  single?: boolean;
  last?: boolean;
  multiple?: boolean;
};

const countryOptions = getCountryListData().map((country) => ({
  label: country.name
    .replace(/\s*[\(\[].*?[\)\]]/g, "")
    .replace(/\*/g, "")
    .trim(),
  value: country.code,
}));

const philippinesCode =
  countryOptions.find((c) => c.label === "Philippines")?.value ?? "PH";

const RelocationForm: FC<{ type: "import" | "export" }> = ({ type }) => {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const responsive = useResponsive();
  const modal = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const createPetDetails = useMutation(
    api.mutations.pet_details.createPetDetails,
  );
  const generateUploadUrl = useMutation(
    api.mutations.pet_details.generateUploadUrl,
  );
  const bookInternationalPetTransport = useMutation(
    api.mutations.international_pet_transport.bookInternationalPetTransport,
  );

  const createInternationalRelocationForm = useForm({
    resolver: zodResolver(InternationalRelocationFormSchema),
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
          pet_age: "",
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

  const control = createInternationalRelocationForm.control;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pets",
  });

  const travelDate = useWatch({
    control,
    name: "travel_date",
  });

  const dateType = travelDate === "yes" ? "specific" : "range";

  const Buttons: FC = () => {
    const scrollToTop = () => {
      window.scrollTo({ top: 630, behavior: "smooth" });
    };

    return (
      <div className="flex w-full justify-between items-center">
        <BodyText
          size="medium"
          weight="semibold"
          className={
            step <= 1 ? "text-neutral-400! select-none" : "select-none"
          }
          onPress={() => {
            if (step != 1) {
              setStep((step - 1) as 1 | 2 | 3 | 4 | 5);
              scrollToTop();
            }
          }}
        >
          BACK
        </BodyText>
        <DynamicButton
          onPress={() => {
            if (step == 5) {
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

                      if (!response.ok) {
                        throw new Error("Failed to upload image");
                      }

                      const { storageId } = await response.json();
                      petImageId = storageId;
                    }

                    const petData: any = {
                      pet_name: pet.pet_name,
                      breed: pet.breed,
                      sex: pet.sex,
                      pet_birthday: pet.pet_birthday,
                      pet_age: pet.pet_age,
                      pet_weight: pet.pet_weight,
                      pet_image: petImageId as any,
                    };

                    if (pet.pet_condition) {
                      petData.pet_condition = pet.pet_condition;
                    }
                    if (pet.special_instructions) {
                      petData.special_instructions = pet.special_instructions;
                    }

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
                    destination_full_address: data.destination_full_address,
                    pets: petIds,
                  };

                  const bookingId =
                    await bookInternationalPetTransport(bookingData);
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
                } finally {
                  setLoading(false);
                }
              })();
            } else {
              setStep((step + 1) as 1 | 2 | 3 | 4 | 5);
              scrollToTop();
            }
          }}
        >
          {step == 5 ? (loading ? "SUBMITTING" : "SUBMIT") : "NEXT"}
        </DynamicButton>
      </div>
    );
  };

  const Progress: FC<{ step: 0 | 1 | 2 | 3 | 4 | 5 }> = ({ step }) => {
    const percentage = (step / 5) * 100;

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

  const Disclaimer: FC = () => {
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
            At <span className="italic font-bold">Joyful Pet Transport</span>,
            we are committed to protecting your personal information.
          </BodyText>
          <BodyText className="text-center">
            By proceeding with this form, you acknowledge and agree that all
            information collected — including your personal details, contact
            information, pet details, and travel documents — will be used solely
            for the purpose of processing your pet’s transport arrangements,
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
          <DynamicButton size="medium" onPress={() => setStep(1)}>
            I AGREE
          </DynamicButton>
          <BodyText
            size="xsmall"
            className="text-center"
            textColor="text-neutral-500"
          >
            By clicking this button, you confirm that you have read the Privacy
            Notice and Consent Statement and consent to the collection and use
            of your personal information for your pet’s transport.
          </BodyText>
        </div>
      </FormContainer>
    );
  };

  const Destination: FC = () => {
    return (
      <FormContainer>
        <BodyText size="large" weight="semibold" className="text-center">
          DESTINATION
        </BodyText>
        <BodyText size="medium" weight="semibold" className="uppercase">
          Where are the origin and destination countries?
        </BodyText>
        <div className="flex gap-6 px-10">
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
              // searchable
              options={countryOptions}
              disabled={type === "export"}
              required
            />
            <SelectFormInput
              label="DESTINATION"
              name="destination"
              control={control}
              // searchable
              options={countryOptions}
              disabled={type === "import"}
              required
            />
          </div>
        </div>
        <Buttons />
      </FormContainer>
    );
  };

  const TravelDetails: FC = () => {
    return (
      <FormContainer>
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
        <Buttons />
      </FormContainer>
    );
  };

  const OwnerDetails: FC = () => {
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
        <RadioFormInput
          name="contact_form"
          label="WHERE CAN WE CONTACT YOU?"
          control={control}
          options={[
            {
              label: "Facebook Messenger",
              value: "facebook",
            },
            {
              label: "WhatsApp",
              value: "whatsapp",
            },
            {
              label: "Viber",
              value: "viber",
            },
            {
              label: "Telegram",
              value: "telegram",
            },
          ]}
          required
        />

        <div className="flex w-full gap-4">
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
        <Buttons />
      </FormContainer>
    );
  };

  const PetDetails: FC = () => {
    const PetIndexDetails: FC<PetDetailsProps> = ({
      index,
      remove,
      single,
      last,
      multiple,
    }) => {
      return (
        <div className="flex flex-col gap-20 w-full">
          <FormContainer className={multiple ? "gap-6!" : ""}>
            <div className="flex flex-row justify-center items-center gap-4">
              <BodyText size="large" weight="semibold" className="text-center">
                PET {index !== 0 && index + 1} DETAILS
              </BodyText>
              {index > 0 && last && (
                <button
                  type="button"
                  aria-label="Remove pet"
                  onClick={() => remove(index)}
                >
                  <FaTrashCan className="text-orange-400 text-xl" />
                </button>
              )}
            </div>

            {multiple ? (
              <div className={`flex flex-col ${multiple ? "gap-6" : "gap-12"}`}>
                <div className="flex w-full gap-4">
                  <FormInput
                    name={`pets.${index}.pet_name`}
                    label="PET'S NAME"
                    placeholder="Enter pet's name"
                    control={control}
                    className="w-full"
                    required
                  />
                  <FormInput
                    name={`pets.${index}.breed`}
                    label="BREED"
                    placeholder="Enter pet's breed"
                    control={control}
                    className="w-full"
                    required
                  />
                </div>

                <div className="flex w-full gap-4">
                  <FormInput
                    name={`pets.${index}.sex`}
                    label="SEX"
                    placeholder="Enter pet's gender (or sex)"
                    control={control}
                    className="w-full"
                    required
                  />
                  <DateFormInput
                    name={`pets.${index}.pet_birthday`}
                    label="DATE OF BIRTH"
                    placeholder="Enter pet's birthday"
                    control={control}
                    className="w-full"
                    enableYearSelect
                    required
                  />
                </div>
                <div className="flex w-full gap-4">
                  <FormInput
                    name={`pets.${index}.pet_weight`}
                    label="PET'S WEIGHT"
                    placeholder="Enter pet's estimated weight"
                    control={control}
                    className="w-full"
                    required
                  />
                  <FormInput
                    name={`pets.${index}.pet_age`}
                    placeholder="Enter pet's age"
                    label="AGE"
                    control={control}
                    className="w-full"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-12">
                <FormInput
                  name={`pets.${index}.pet_name`}
                  label="PET'S NAME"
                  placeholder="Enter pet's name"
                  control={control}
                  required
                />

                <div className="flex w-full gap-4">
                  <FormInput
                    name={`pets.${index}.breed`}
                    label="BREED"
                    placeholder="Enter pet's breed"
                    control={control}
                    className="w-full"
                    required
                  />
                  <FormInput
                    name={`pets.${index}.sex`}
                    label="SEX"
                    placeholder="Enter pet's gender (or sex)"
                    control={control}
                    className="w-full"
                    required
                  />
                </div>

                <div className="flex w-full gap-4">
                  <DateFormInput
                    name={`pets.${index}.pet_birthday`}
                    label="DATE OF BIRTH"
                    control={control}
                    placeholder="Enter pet's birthday"
                    className="w-full"
                    enableYearSelect
                    required
                  />
                  <FormInput
                    name={`pets.${index}.pet_age`}
                    label="AGE"
                    control={control}
                    placeholder="Enter pet's age"
                    className="w-full"
                  />
                </div>

                <FormInput
                  name={`pets.${index}.pet_weight`}
                  label="PET'S WEIGHT"
                  control={control}
                  placeholder="Enter pet's estimated weight"
                  required
                />
              </div>
            )}

            <FormInput
              name={`pets.${index}.pet_condition`}
              label="MEDICAL CONDITION"
              placeholder="Enter pets’ medical condition that we should be aware of"
              control={control}
              keyboardType="paragraph"
              widthFull
            />

            <FormInput
              name={`pets.${index}.special_instructions`}
              label="SPECIAL INSTRUCTIONS"
              placeholder="E.g. Prefers male handlers, aggressive towards cats or other dogs, etc."
              control={control}
              keyboardType="paragraph"
              widthFull
            />

            <ImageFormInput
              name={`pets.${index}.pet_image`}
              label="UPLOAD PET PHOTO"
              control={control}
              widthFull
              required
            />
            {single && <Buttons />}
          </FormContainer>
        </div>
      );
    };

    return (
      <div className="flex flex-col gap-20 w-full">
        <div
          className={`grid ${fields.length > 1 && "grid-cols-2"} gap-4 w-full`}
        >
          {fields.map((field, index) => (
            <PetIndexDetails
              key={field.id}
              index={index}
              remove={remove}
              single={fields.length === 1}
              last={index + 1 === fields.length}
              multiple={fields.length > 1}
            />
          ))}
        </div>
        {fields.length !== 1 && <Buttons />}

        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <BodyText className="text-center max-w-96">
            If you want to add more pets to travel, click the ‘Add More Pets’
            button
          </BodyText>
          <DynamicButton
            type="orange"
            onPress={() =>
              append({
                pet_name: "",
                breed: "",
                sex: "",
                pet_birthday: "",
                pet_age: "",
                pet_weight: "",
                pet_condition: "",
                special_instructions: "",
                pet_image: [],
              })
            }
          >
            ADD MORE PETS
          </DynamicButton>
        </div>
      </div>
    );
  };

  const Review: FC = () => {
    return (
      <FormContainer>
        <div
          className={`grid ${responsive.isTabletOrMobile ? "grid-cols-1 gap-12" : "grid-cols-2 gap-4"}`}
        >
          <div className="flex flex-col gap-12">
            <BodyText size="large" weight="semibold">
              DESTINATION
            </BodyText>
            <div className="flex gap-6 pl-10">
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
                  options={countryOptions}
                  disabled
                  required
                />
                <SelectFormInput
                  label="DESTINATION"
                  name="destination"
                  control={control}
                  options={countryOptions}
                  disabled
                  required
                />
              </div>
            </div>
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
                {
                  label: "Facebook Messenger",
                  value: "facebook",
                },
                {
                  label: "WhatsApp",
                  value: "whatsapp",
                },
                {
                  label: "Viber",
                  value: "viber",
                },
                {
                  label: "Telegram",
                  value: "telegram",
                },
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
                  name={`pets.${index}.pet_age`}
                  placeholder="Enter pet's age"
                  label="AGE"
                  control={control}
                  widthFull
                  disabled
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-12">
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
              placeholder="Enter pets’ medical condition that we should be aware of"
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
        <Buttons />
      </FormContainer>
    );
  };

  const RenderForm: FC = () => {
    if (step === 0) {
      return <Disclaimer />;
    }

    if (step === 1) {
      return <Destination />;
    }

    if (step === 2) {
      return <TravelDetails />;
    }

    if (step === 3) {
      return <OwnerDetails />;
    }

    if (step === 4) {
      return <PetDetails />;
    }

    return <Review />;
  };

  return (
    <div className="flex flex-col w-full items-center gap-8">
      <RenderForm />
      <Progress step={step} />
    </div>
  );
};

const InternationalPetRelocationForm: FC<
  InternationalPetRelocationFormProps
> = ({ type }) => {
  if (type === "import") {
    return <RelocationForm type="import" />;
  }

  if (type === "export") {
    return <RelocationForm type="export" />;
  }

  return (
    <FormContainer className="justify-center items-center">
      <BodyText weight="bold">Invalid Form</BodyText>
    </FormContainer>
  );
};

export default InternationalPetRelocationForm;
