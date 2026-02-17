import { FC } from "react";
import DateInputBase, { DateInputBaseProps } from "./DateInputBase";
import { Controller } from "react-hook-form";

type DateFormInputProps = DateInputBaseProps & {
  name: string;
  control: any;
  className?: string;
};

const DateFormInput: FC<DateFormInputProps> = ({
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
          <DateInputBase
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

export default DateFormInput;
