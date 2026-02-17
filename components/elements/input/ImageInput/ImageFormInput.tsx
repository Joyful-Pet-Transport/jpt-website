import { FC } from "react";
import ImageInputBase, { ImageInputBaseProps } from "./ImageInputBase";
import { Controller } from "react-hook-form";

type ImageFormInputProps = ImageInputBaseProps & {
  name: string;
  control: any;
  className?: string;
};

const ImageFormInput: FC<ImageFormInputProps> = ({
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
          <ImageInputBase
            {...inputProps}
            initialValue={field.value ?? []}
            onChange={field.onChange}
            validation={fieldState.error?.message}
          />
        )}
      />
    </div>
  );
};

export default ImageFormInput;
