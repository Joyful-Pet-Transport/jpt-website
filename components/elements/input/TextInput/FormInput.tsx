import { FC } from "react";
import { Controller, Control } from "react-hook-form";
import InputBase, { InputBaseProps } from "./InputBase";

type FormInputProps = InputBaseProps & {
  name: string;
  control: any;
};

const FormInput: FC<FormInputProps> = ({ name, control, ...inputProps }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <InputBase
          {...inputProps}
          initialValue={field.value ?? ""}
          onChange={field.onChange}
          validation={fieldState.error?.message}
        />
      )}
    />
  );
};

export default FormInput;
