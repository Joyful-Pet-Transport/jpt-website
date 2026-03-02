import { FC, useState } from "react";
import { OptionWithIcon } from "./Options";
import BodyText from "../../text/BodyText";

export type IconSelectBaseProps = {
  label: string;
  whiteLabel?: boolean;
  initialValue?: string;
  validation?: string;
  disabled?: boolean;
  required?: boolean;
  onlySelected?: boolean;
  noSelectedLabel?: string;
  options?: OptionWithIcon[];
  onChange?: (value: string) => void;
};

type RenderOptionProps = {
  isSelected: boolean;
} & OptionWithIcon;

const IconSelectInputBase: FC<IconSelectBaseProps> = ({
  label,
  whiteLabel,
  initialValue,
  validation,
  disabled,
  required,
  onlySelected,
  noSelectedLabel,
  options,
  onChange,
}) => {
  const [value, setValue] = useState<string>(initialValue ?? "");

  const handleOptionClick = (optionValue: string) => {
    if (disabled) return;

    setValue(optionValue);
    onChange?.(optionValue);
  };

  const RenderOption: FC<RenderOptionProps> = ({
    isSelected,
    label,
    value: optionValue,
    icon,
  }) => {
    const OptionClass = `m-2 cursor-pointer transition-all ${
      isSelected ? "bg-blue-400 scale-105" : "bg-[#d9d9d9] hover:scale-105"
    } rounded-full w-36 h-36 flex items-center justify-center`;

    return (
      <div className="flex flex-col gap-4">
        <div
          className={`border-dashed border-2 rounded-full ${
            isSelected ? " border-blue-400" : "border-[#d9d9d9]"
          }`}
        >
          <div
            className="flex flex-col gap-2 justify-center"
            onClick={() => handleOptionClick(optionValue)}
          >
            <div className={OptionClass}>{icon}</div>
          </div>
        </div>
        <BodyText className="text-center">{label}</BodyText>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <BodyText weight="semibold" white={whiteLabel}>
        {label} {required && <span className="text-red-500">*</span>}
      </BodyText>
      <div
        className={`w-full flex gap-8 flex-wrap ${onlySelected && "justify-center"}`}
      >
        {onlySelected ? (
          value ? (
            options
              ?.filter((option) => option.value === value)
              .map((option, index) => (
                <RenderOption
                  key={index}
                  label={option.label}
                  value={option.value}
                  icon={option.icon}
                  isSelected={value === option.value}
                />
              ))
          ) : noSelectedLabel ? (
            <div className="h-24 flex items-center justify-center w-full border-2 border-dashed border-[#d9d9d9] rounded-xl">
              <BodyText className="text-center">{noSelectedLabel}</BodyText>
            </div>
          ) : null
        ) : (
          options?.map((option, index) => (
            <RenderOption
              key={index}
              label={option.label}
              value={option.value}
              icon={option.icon}
              isSelected={value === option.value}
            />
          ))
        )}
      </div>
      {validation && (
        <BodyText size="small" textColor="text-red-500">
          {validation}
        </BodyText>
      )}
    </div>
  );
};

export default IconSelectInputBase;
