import { FC } from "react";
import { Controller, FieldErrors, FieldValues } from "react-hook-form";
import SelectBase, { SelectBaseProps } from "./SelectBase";

export type SelectFormInputProps = SelectBaseProps & {
  fieldName: string;
  control: any;
  errors?: FieldErrors<FieldValues>;
};

const SelectFormInput: FC<SelectFormInputProps> = ({
  fieldName,
  control,
  errors,
  ...inputProps
}) => {
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <SelectBase
          {...inputProps}
          initialValue={field.value ?? ""}
          onChange={field.onChange}
          validation={fieldState.error?.message}
        />
      )}
    />
  );
};

export default SelectFormInput;
