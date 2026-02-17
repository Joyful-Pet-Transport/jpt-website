import { FC, useState } from "react";
import FormContainer from "../containers/FormContainer";
import BodyText from "../elements/text/BodyText";
import z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectFormInput from "../elements/input/SelectInput/SelectFormInput";
import { LuMapPin, LuMapPinCheckInside } from "react-icons/lu";
import DynamicButton from "../elements/button/DynamicButton";
import RadioFormInput from "../elements/input/RadioInput/RadioFormInput";
import DateFormInput from "../elements/input/DateInput/DateFormInput";
import FormInput from "../elements/input/TextInput/FormInput";

type InternationalPetRelocationFormProps = {
  type: string;
};

const InternationalRelocationFormSchema = z.object({
  origin_country: z
    .string()
    .min(3, "Please enter a name with at least 3 characters"),
  destination: z
    .string()
    .min(3, "Please enter a name with at least 3 characters"),
  companionship: z.string().min(3, "Please enter an option"),
  travel_date: z.string().min(3, "Please enter an option"),
  date: z.string().min(3, "Please enter an option"),
});

const RelocationForm: FC<{ type: "import" | "export" }> = ({ type }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const createInternationalRelocationForm = useForm({
    resolver: zodResolver(InternationalRelocationFormSchema),
    defaultValues: {
      origin_country: "",
      destination: "",
      companionship: "",
      travel_date: "",
      date: "",
    },
  });

  const control = createInternationalRelocationForm.control;

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
              required
            />
            <SelectFormInput
              label="DESTINATION"
              name="destination"
              control={control}
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
    return (
      <FormContainer>
        <BodyText size="large" weight="semibold" className="text-center">
          PET DETAILS
        </BodyText>
        <FormInput
          name="pet_name"
          label="PET'S NAME"
          placeholder="Enter pet's name"
          control={control}
          required
        />
        <div className="flex w-full gap-4">
          <FormInput
            name="breed"
            label="BREED"
            placeholder="Enter pet's breed"
            control={control}
            className="w-full"
            required
          />
          <FormInput
            name="sex"
            label="SEX"
            placeholder="Enter pet's gender(or sex)"
            control={control}
            className="w-full"
            required
          />
        </div>
        <div className="flex w-full gap-4">
          <DateFormInput
            name="pet_birthday"
            label="DATE OF BIRTH"
            placeholder="Enter pet's birthday"
            control={control}
            className="w-full"
            required
          />
          <FormInput
            name="pet_age"
            label="AGE"
            placeholder="Enter pet's age"
            control={control}
            className="w-full"
          />
        </div>
        <FormInput
          name="pet_weight"
          label="PET'S WEIGHT (ESTIMATED IS OKAY)"
          placeholder="Enter pet's estimated weight"
          control={control}
          required
        />
        <FormInput
          name="pet_condition"
          label="MEDICAL CONDITION THAT WE SHOULD BE AWARE OF:"
          placeholder="Enter pets’ medical condition that we should be aware of"
          control={control}
          keyboardType="paragraph"
          widthFull
          required
        />
        <FormInput
          name="special_instructions"
          label="PLEASE NOTE SPECIAL INSTRUCTIONS FOR YOUR PET"
          placeholder="E.g. Prefers male handlers, aggressive towards cats or other dogs, etc."
          control={control}
          keyboardType="paragraph"
          widthFull
          required
        />
        <Buttons />
      </FormContainer>
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
