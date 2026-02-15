"use client";

import { FC, useState, ChangeEvent } from "react";
import BodyText from "../../text/BodyText";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  BaseInputClass,
  baseInputValidationClass,
  baseInputDisabledClass,
} from "../InputClass";
import { LabeledOption, Option } from "./Options";
import MultiSelectDropdown from "./components/MultiSelectDropdown";

export type SelectType = "default" | "multi" | "date" | "map";

export type SelectBaseProps = {
  label: string;
  whiteLabel?: boolean;
  placeholder?: string;
  initialValue?: string | string[];
  validation?: string;
  selectType?: SelectType;
  disabled?: boolean;
  required?: boolean;
  options?: Option[] | LabeledOption[];
  onChange?: (value: string | string[]) => void;
};

const SelectBase: FC<SelectBaseProps> = ({
  label,
  whiteLabel = false,
  placeholder = "Select...",
  initialValue = "",
  validation,
  selectType = "default",
  disabled = false,
  required,
  options = [],
  onChange,
}) => {
  const [value, setValue] = useState<string | string[]>(
    selectType === "multi"
      ? (initialValue as string[]) || []
      : (initialValue as string),
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  const baseClass = cn(
    BaseInputClass,
    validation
      ? baseInputValidationClass.invalid
      : baseInputValidationClass.valid,
    disabled && baseInputDisabledClass,
  );

  const handleSelectValueChange = (v: string) => {
    setValue(v);
    onChange?.(v);
  };

  const isLabeledOptions = (
    opts: Option[] | LabeledOption[],
  ): opts is LabeledOption[] => opts.length > 0 && "options" in opts[0];

  const flatOptions: Option[] = isLabeledOptions(options)
    ? options.flatMap((g) => g.options)
    : options;

  const getOptionLabel = (val: string) =>
    flatOptions.find((o) => o.value === val)?.label ?? val;

  const handleMultiValueChange = (v: string[] | null) => {
    const next = v ?? [];
    setValue(next);
    onChange?.(next);
  };

  return (
    <div className="flex flex-col gap-1 w-full max-w-110">
      <BodyText weight="semibold" white={whiteLabel}>
        {label} {required && <span className="text-red-500">*</span>}
      </BodyText>

      {/* DEFAULT SELECT */}
      {selectType === "default" && (
        <Select
          value={(value as string) || undefined}
          onValueChange={handleSelectValueChange}
          disabled={disabled}
        >
          <SelectTrigger className={baseClass} aria-invalid={!!validation}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {isLabeledOptions(options)
              ? options.map((group) => (
                  <SelectGroup key={group.label}>
                    <SelectLabel>{group.label}</SelectLabel>
                    {group.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))
              : options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
      )}

      {/* MULTI SELECT (shadcn-style dropdown + chips, no icons) */}
      {selectType === "multi" && (
        <MultiSelectDropdown
          value={value as string[]}
          onValueChange={handleMultiValueChange}
          options={options}
          flatOptions={flatOptions}
          isLabeledOptions={isLabeledOptions}
          placeholder={placeholder}
          disabled={disabled}
          validation={!!validation}
          baseClass={baseClass}
          getOptionLabel={getOptionLabel}
        />
      )}

      {/* CALENDAR */}
      {selectType === "date" && (
        <input
          type="date"
          value={value as string}
          onChange={handleInputChange}
          disabled={disabled}
          className={baseClass}
        />
      )}

      {/* MAP */}
      {selectType === "map" && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange?.("open-map")}
          className={`${baseClass} text-left`}
        >
          {(value as string) || placeholder}
        </button>
      )}

      {validation && <BodyText textColor="text-red-500">{validation}</BodyText>}
    </div>
  );
};

export default SelectBase;
