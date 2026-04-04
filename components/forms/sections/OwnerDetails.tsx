import FormInput from "@/components/elements/input/TextInput/FormInput";
import RadioFormInput from "@/components/elements/input/RadioInput/RadioFormInput";
import { FC } from "react";
import { Control, FieldValues } from "react-hook-form";

type OwnerDetailsProps = {
  control: Control<FieldValues>;
  disabled?: boolean;
};

const OwnerDetails: FC<OwnerDetailsProps> = ({ control, disabled = false }) => {
  return (
    <>
      <FormInput
        name="owner.name"
        label="OWNER'S NAME"
        placeholder="Enter owner's name"
        control={control}
        required
        disabled={disabled}
      />
      <RadioFormInput
        name="owner.contact_form"
        label="WHERE CAN WE CONTACT YOU?"
        control={control}
        options={[
          { label: "Facebook Messenger", value: "facebook" },
          { label: "WhatsApp", value: "whatsapp" },
          { label: "Viber", value: "viber" },
          { label: "Telegram", value: "telegram" },
        ]}
        required
        disabled={disabled}
      />
      <div className="flex flex-col md:flex-row w-full gap-4">
        <FormInput
          name="owner.account_name"
          label="ACCOUNT NAME"
          placeholder="Enter account name"
          control={control}
          required
          className="w-full"
          disabled={disabled}
        />
        <FormInput
          name="owner.account_link"
          label="LINK"
          placeholder="Enter link"
          className="w-full"
          control={control}
          disabled={disabled}
        />
      </div>
      <FormInput
        name="owner.contact_number"
        label="CONTACT NUMBER"
        placeholder="Enter contact number"
        control={control}
        required
        disabled={disabled}
      />
      <FormInput
        name="owner.email_address"
        label="ACTIVE EMAIL ADDRESS"
        placeholder="Enter active email address"
        control={control}
        required
        disabled={disabled}
      />
    </>
  );
};

export default OwnerDetails;
