import { FC } from "react";
import { Controller } from "react-hook-form";
import RadioInputBase, { RadioInputBaseProps } from "./RadioInputBase";

type RadioFormInputProps = RadioInputBaseProps & {
  name: string;
  control: any;
  className?: string;
};

const RadioFormInput: FC<RadioFormInputProps> = ({
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
          <div data-error={!!fieldState.error}>
            <RadioInputBase
              {...inputProps}
              initialValue={field.value ?? ""}
              onChange={field.onChange}
              validation={fieldState.error?.message}
            />
          </div>
        )}
      />
    </div>
  );
};

export default RadioFormInput;
