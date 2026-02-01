import { FC, useState, ChangeEvent } from "react";
import BodyText from "../../text/BodyText";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  BaseInputClass,
  baseInputValidationClass,
  baseInputDisabledClass,
} from "../InputClass";

export type KeyboardType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "paragraph";

export type InputBaseProps = {
  label: string;
  whiteLabel?: boolean;
  placeholder?: string;
  initialValue?: string;
  validation?: string;
  keyboardType?: KeyboardType;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

const InputBase: FC<InputBaseProps> = ({
  label,
  whiteLabel = false,
  placeholder = "",
  initialValue = "",
  validation,
  keyboardType = "text",
  disabled = false,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const inputClassName = cn(
    BaseInputClass,
    validation
      ? baseInputValidationClass.invalid
      : baseInputValidationClass.valid,
    disabled && baseInputDisabledClass,
  );

  return (
    <div className={`flex flex-col gap-1 w-full`}>
      <BodyText white={whiteLabel}>{label}</BodyText>

      {keyboardType === "paragraph" ? (
        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={inputClassName}
        />
      ) : (
        <input
          type={keyboardType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={inputClassName}
        />
      )}

      {validation && (
        <BodyText size="small" textColor="text-red-500">
          {validation}*
        </BodyText>
      )}
    </div>
  );
};

export default InputBase;
