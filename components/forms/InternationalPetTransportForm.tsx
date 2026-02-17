import { FC, useState } from "react";
import { getData as getCountryListData } from "country-list";
import FormContainer from "../containers/FormContainer";
import BodyText from "../elements/text/BodyText";
import z from "zod";
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

const PetDetailsSchema = z.object({
  pet_name: z.string().min(3, "Please enter your pet's name"),
  breed: z.string().min(3, "Please enter your pet's breed"),
  sex: z.string().min(1, "Please select your pet's sex"),
  pet_birthday: z.string().min(3, "Please select your pet's date of birth"),
  pet_age: z.string().min(1, "Please enter your pet's age"),
  pet_weight: z.string().min(1, "Please enter your pet's weight"),
  pet_condition: z
    .string()
    .min(1, "Please describe any medical conditions (or type 'None')"),
  special_instructions: z
    .string()
    .min(1, "Please enter any special instructions (or type 'None')"),
  pet_image: z.string().min(3, "Please upload your pet's latest photo"),
});

const InternationalRelocationFormSchema = z.object({
  origin_country: z.string().min(2, "Please select an origin country"),
  destination: z.string().min(2, "Please select a destination country"),

  companionship: z.string().min(3, "Please choose how your pet will travel"),
  travel_date: z
    .string()
    .min(2, "Please indicate if you have a specific travel date"),
  date: z.string().min(3, "Please select a travel date"),

  owner_name: z.string().min(3, "Please enter the owner's name"),
  contact_form: z.string().min(3, "Please select where we can contact you"),
  account_name: z.string().min(3, "Please enter your account name"),
  account_link: z.string().optional(),
  contact_number: z.string().min(3, "Please enter a contact number"),
  email_address: z.string().email("Please enter a valid email address"),

  pets: z.array(PetDetailsSchema).min(1, "Please add at least one pet"),
});

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
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

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
          pet_image: "",
        },
      ],
    },
  });

  const control = createInternationalRelocationForm.control;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pets",
  });

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
            } else {
              setStep((step + 1) as 1 | 2 | 3 | 4 | 5);
              scrollToTop();
            }
          }}
        >
          {step == 5 ? "SUBMIT" : "NEXT"}
        </DynamicButton>
      </div>
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
    const travelDate = useWatch({
      control,
      name: "travel_date",
    });

    const dateType = travelDate === "yes" ? "specific" : "range";

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
          label="TRAVEL DATE"
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
          <FormContainer className={multiple ? "gap-6!" : "gap-12"}>
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
              required
            />

            <FormInput
              name={`pets.${index}.special_instructions`}
              label="SPECIAL INSTRUCTIONS"
              placeholder="E.g. Prefers male handlers, aggressive towards cats or other dogs, etc."
              control={control}
              keyboardType="paragraph"
              widthFull
              required
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
      <div className="flex flex-col gap-20">
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
                pet_image: "",
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
        <BodyText size="large" weight="semibold" className="text-center">
          REVIEW KEME
        </BodyText>
        <Buttons />
      </FormContainer>
    );
  };

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
