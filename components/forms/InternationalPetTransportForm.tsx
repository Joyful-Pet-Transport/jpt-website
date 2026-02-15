import { FC, useState } from "react";
import FormContainer from "../containers/FormContainer";
import BodyText from "../elements/text/BodyText";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectFormInput from "../elements/input/SelectInput/SelectFormInput";
import { LuMapPin, LuMapPinCheckInside } from "react-icons/lu";
import DynamicButton from "../elements/button/DynamicButton";

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
});

const RelocationForm: FC<{ type: "import" | "export" }> = ({ type }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const createInternationalRelocationForm = useForm({
    resolver: zodResolver(InternationalRelocationFormSchema),
    defaultValues: {
      origin_country: "",
      destination: "",
    },
  });

  const control = createInternationalRelocationForm.control;

  const Buttons: FC = () => {
    return (
      <div className="flex w-full justify-between items-center">
        <BodyText
          size="medium"
          weight="semibold"
          className={
            step <= 1 ? "text-neutral-400! select-none" : "select-none"
          }
          onPress={() => step != 1 && setStep((step - 1) as 1 | 2 | 3 | 4 | 5)}
        >
          BACK
        </BodyText>
        <DynamicButton
          onPress={() => {
            if (step == 5) {
            } else {
              setStep((step + 1) as 1 | 2 | 3 | 4 | 5);
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
    return (
      <FormContainer>
        <BodyText size="large" weight="semibold" className="text-center">
          TRAVEL DETAILS
        </BodyText>
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
