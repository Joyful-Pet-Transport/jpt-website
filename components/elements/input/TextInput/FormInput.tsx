import { FC, useCallback } from "react";
import { Controller } from "react-hook-form";
import InputBase, { InputBaseProps } from "./InputBase";

type FormInputProps = InputBaseProps & {
  name: string;
  control: any;
  className?: string;
};

const FormInput: FC<FormInputProps> = ({
  name,
  control,
  className,
  ...inputProps
}) => {
  const renderInput = useCallback(
    ({ field, fieldState }: any) => (
      <InputBase
        {...inputProps}
        value={field.value ?? ""}
        onChange={field.onChange}
        validation={fieldState.error?.message}
      />
    ),
    [
      inputProps.label,
      inputProps.keyboardType,
      inputProps.disabled,
      inputProps.validation,
    ],
  );

  return (
    <div className={className}>
      <Controller name={name} control={control} render={renderInput} />
    </div>
  );
};

export default FormInput;
