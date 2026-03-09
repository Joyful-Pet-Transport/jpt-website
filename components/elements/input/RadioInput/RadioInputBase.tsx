"use client";

import { FC, useState, useId } from "react";
import BodyText from "../../text/BodyText";
import { LabeledOption, Option } from "../SelectInput/Options";
import { cn } from "@/lib/utils";

export type RadioDirection = "vertical" | "horizontal";

export type RadioInputBaseProps = {
  label: string;
  whiteLabel?: boolean;
  placeholder?: string;
  initialValue?: string;
  validation?: string;
  disabled?: boolean;
  required?: boolean;
  direction?: RadioDirection;
  options?: Option[] | LabeledOption[];
  onChange?: (value: string) => void;
};

const isLabeledOptions = (
  opts: Option[] | LabeledOption[],
): opts is LabeledOption[] =>
  opts.length > 0 && "options" in (opts as LabeledOption[])[0];

const RadioInputBase: FC<RadioInputBaseProps> = ({
  label,
  whiteLabel = false,
  initialValue = "",
  validation,
  disabled = false,
  required,
  direction = "vertical",
  options = [],
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);
  const name = useId();

  const handleChange = (optionValue: string) => {
    setValue(optionValue);
    onChange?.(optionValue);
  };

  const containerClass = cn(
    "flex w-full gap-4",
    direction === "vertical" ? "flex-col md:px-10" : "flex-row flex-wrap",
  );

  const radioInputClass = cn(
    "appearance-none w-5 h-5 shrink-0 rounded-full cursor-pointer",
    "bg-[#D9D9D9] transition-colors",
    "checked:border-2 checked:border-blue-600 checked:bg-blue-600",
    disabled && "cursor-not-allowed opacity-60",
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      <BodyText weight="semibold" white={whiteLabel}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </BodyText>

      <div
        className={containerClass}
        role="radiogroup"
        aria-invalid={!!validation}
      >
        {isLabeledOptions(options)
          ? options.map((group) => (
              <div key={group.label} className="flex flex-col gap-4">
                <BodyText size="small" textColor="text-gray-600">
                  {group.label}
                </BodyText>
                <div
                  className={cn(
                    "flex gap-4",
                    direction === "vertical"
                      ? "flex-col"
                      : "flex-row flex-wrap",
                  )}
                >
                  {group.options.map((opt) => (
                    <label
                      key={opt.value}
                      className={cn(
                        "flex items-center *:cursor-pointer",
                        disabled && "cursor-not-allowed opacity-60",
                      )}
                    >
                      <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={value === opt.value}
                        onChange={() => handleChange(opt.value)}
                        disabled={disabled}
                        className={radioInputClass}
                      />
                      <BodyText white={whiteLabel}>{opt.label}</BodyText>
                    </label>
                  ))}
                </div>
              </div>
            ))
          : (options as Option[]).map((opt) => (
              <label
                key={opt.value}
                className={cn(
                  "flex items-center gap-3 cursor-pointer",
                  disabled && "cursor-not-allowed opacity-60",
                )}
              >
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={() => handleChange(opt.value)}
                  disabled={disabled}
                  className={radioInputClass}
                />
                <BodyText white={whiteLabel}>{opt.label}</BodyText>
              </label>
            ))}
      </div>

      {validation && (
        <BodyText size="small" textColor="text-red-500">
          {validation}
        </BodyText>
      )}
    </div>
  );
};

export default RadioInputBase;
