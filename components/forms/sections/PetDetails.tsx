import FormContainer from "@/components/containers/FormContainer";
import DynamicButton from "@/components/elements/button/DynamicButton";
import DateFormInput from "@/components/elements/input/DateInput/DateFormInput";
import ImageFormInput from "@/components/elements/input/ImageInput/ImageFormInput";
import SelectFormInput from "@/components/elements/input/SelectInput/SelectFormInput";
import FormInput from "@/components/elements/input/TextInput/FormInput";
import BodyText from "@/components/elements/text/BodyText";
import { FC } from "react";
import { FaTrashCan } from "react-icons/fa6";
import FormButtons from "./Buttons";

type PetDetailsStepProps = {
  control: any;
  fields: any[];
  append: (value: any) => void;
  remove: (index: number) => void;
  step: number;
  setStep: (s: any) => void;
  onSubmit: () => void;
  loading: boolean;
  maxSteps: number;
};

type PetDetailsProps = {
  index: number;
  remove: (index: number) => void;
  single?: boolean;
  last?: boolean;
  multiple?: boolean;
};

type PetIndexDetailsProps = PetDetailsProps & {
  control: any;
  step: number;
  setStep: (s: any) => void;
  onSubmit: () => void;
  loading: boolean;
  maxSteps: number;
};

const PetAgeInputs: FC<{ index: number; control: any }> = ({ index, control }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <BodyText weight="semibold">AGE</BodyText>
      <div className="flex items-center gap-2 w-full">
        <FormInput
          name={`pets.${index}.pet_age_years`}
          label="YEARS"
          placeholder="Enter years"
          control={control}
          required
        />
        <BodyText className="text-neutral-500">&</BodyText>
        <FormInput
          name={`pets.${index}.pet_age_months`}
          label="MONTHS"
          placeholder="Enter months"
          control={control}
          required
        />
      </div>
    </div>
  );
};

const PetIndexDetails: FC<PetIndexDetailsProps> = ({
  index,
  remove,
  single,
  last,
  multiple,
  control,
  step,
  setStep,
  onSubmit,
  loading,
  maxSteps,
}) => {
  const sexOptions = [
    { label: "Female Intact", value: "female_intact" },
    { label: "Female Neutered", value: "female_neutered" },
    { label: "Male Intact", value: "male_intact" },
    { label: "Male Neutered", value: "male_neutered" },
  ];

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
            <div className="flex flex-col md:flex-row w-full gap-4">
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
            <div className="flex flex-col md:flex-row w-full gap-4">
              <SelectFormInput
                name={`pets.${index}.sex`}
                label="SEX"
                placeholder="Select sex"
                control={control}
                options={sexOptions}
                className="w-full"
                required
              />
              <FormInput
                name={`pets.${index}.pet_weight`}
                label="PET'S WEIGHT"
                placeholder="Enter pet's estimated weight"
                control={control}
                className="w-full"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row w-full gap-4">
              <DateFormInput
                name={`pets.${index}.pet_birthday`}
                label="DATE OF BIRTH"
                placeholder="Enter pet's birthday"
                control={control}
                className="w-full"
                enableYearSelect
                required
              />
              <PetAgeInputs index={index} control={control} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row w-full gap-6">
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
            <div className="flex flex-col md:flex-row w-full gap-6">
              <SelectFormInput
                name={`pets.${index}.sex`}
                label="SEX"
                placeholder="Select sex"
                control={control}
                options={sexOptions}
                className="w-full"
                required
              />
              <FormInput
                name={`pets.${index}.pet_weight`}
                label="PET'S WEIGHT (ESTIMATED IS OKAY)"
                control={control}
                placeholder="Enter pet's estimated weight"
                className="w-full"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row w-full gap-6">
              <DateFormInput
                name={`pets.${index}.pet_birthday`}
                label="DATE OF BIRTH"
                control={control}
                placeholder="Enter pet's birthday"
                className="w-full"
                enableYearSelect
                required
              />
              <PetAgeInputs index={index} control={control} />
            </div>
          </div>
        )}

        <FormInput
          name={`pets.${index}.pet_condition`}
          label="MEDICAL CONDITION THAT WE SHOULD BE AWARE OF:"
          placeholder="Enter pets' medical condition that we should be aware of"
          control={control}
          keyboardType="paragraph"
          widthFull
        />
        <FormInput
          name={`pets.${index}.special_instructions`}
          label="PLEASE NOTE SPECIAL INSTRUCTIONS FOR YOUR PET:"
          placeholder="E.g. Prefers male handlers, aggressive towards cats or other dogs, etc."
          control={control}
          keyboardType="paragraph"
          widthFull
        />
        <ImageFormInput
          name={`pets.${index}.pet_image`}
          label="UPLOAD PET'S LATEST PHOTO"
          control={control}
          widthFull
          required
        />
        {single && (
          <FormButtons
            step={step}
            setStep={setStep}
            onSubmit={onSubmit}
            loading={loading}
            maxSteps={maxSteps}
          />
        )}
      </FormContainer>
    </div>
  );
};

const PetDetails: FC<PetDetailsStepProps> = ({
  control,
  fields,
  append,
  remove,
  step,
  setStep,
  onSubmit,
  loading,
  maxSteps,
}) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div
        className={`grid ${fields.length > 1 && "lg:grid-cols-2"} gap-4 w-full`}
      >
        {fields.map((field, index) => (
          <PetIndexDetails
            key={field.id}
            index={index}
            remove={remove}
            single={fields.length === 1}
            last={index + 1 === fields.length}
            multiple={fields.length > 1}
            control={control}
            step={step}
            setStep={setStep}
            onSubmit={onSubmit}
            loading={loading}
            maxSteps={maxSteps}
          />
        ))}
      </div>
      {fields.length !== 1 && (
        <FormButtons
          step={step}
          setStep={setStep}
          onSubmit={onSubmit}
          loading={loading}
          maxSteps={maxSteps}
        />
      )}
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <BodyText className="text-center max-w-96">
          If you want to add more pets to travel, click the 'Add More Pets'
          button
        </BodyText>
        <DynamicButton
          type="orange"
          size="medium"
          onPress={() =>
            append({
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
            })
          }
        >
          ADD MORE PETS
        </DynamicButton>
      </div>
    </div>
  );
};

export default PetDetails;
