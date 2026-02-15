import { FC } from "react";
import { Controller, FieldErrors, FieldValues } from "react-hook-form";
import SelectBase, { SelectBaseProps } from "./SelectBase";

export type SelectFormInputProps = SelectBaseProps & {
  name: string;
  control: any;
  errors?: FieldErrors<FieldValues>;
  className?: string;
};

const SelectFormInput: FC<SelectFormInputProps> = ({
  name,
  control,
  errors,
  className,
  ...inputProps
}) => {
  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <SelectBase
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

export default SelectFormInput;
