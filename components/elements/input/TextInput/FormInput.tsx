import { FC } from "react";
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
  return (
    <div className={className}>
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
    </div>
  );
};

export default FormInput;
