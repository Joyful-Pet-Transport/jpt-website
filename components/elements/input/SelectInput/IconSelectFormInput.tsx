import { FC } from "react";
import { Controller, FieldErrors, FieldValues } from "react-hook-form";
import IconSelectInputBase, {
  IconSelectBaseProps,
} from "./IconSelectInputBase";

export type IconSelectFormInputProps = IconSelectBaseProps & {
  name: string;
  control: any;
  errors?: FieldErrors<FieldValues>;
  className?: string;
};

const IconSelectFormInput: FC<IconSelectFormInputProps> = ({
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
          <IconSelectInputBase
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

export default IconSelectFormInput;
