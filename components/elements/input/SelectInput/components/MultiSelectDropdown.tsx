import {
  Combobox,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { FC } from "react";
import { cn } from "@/lib/utils";
import { LabeledOption, Option } from "./../Options";

type MultiSelectDropdownProps = {
  value: string[];
  onValueChange: (v: string[]) => void;
  options: Option[] | LabeledOption[];
  flatOptions: Option[];
  isLabeledOptions: (
    opts: Option[] | LabeledOption[],
  ) => opts is LabeledOption[];
  placeholder: string;
  disabled: boolean;
  validation: boolean;
  baseClass: string;
  getOptionLabel: (val: string) => string;
};

const MultiSelectDropdown: FC<MultiSelectDropdownProps> = ({
  value,
  onValueChange,
  options,
  flatOptions,
  isLabeledOptions,
  placeholder,
  disabled,
  validation,
  baseClass,
  getOptionLabel,
}) => {
  const anchorRef = useComboboxAnchor();

  return (
    <Combobox
      multiple
      value={value.length ? value : null}
      onValueChange={(v) => onValueChange(v ?? [])}
      disabled={disabled}
      itemToStringLabel={(v) => getOptionLabel(v as string)}
      filter={() => true}
    >
      <div
        ref={anchorRef}
        className={cn(baseClass, "text-lg")}
        aria-invalid={validation}
      >
        <ComboboxChips className="flex min-h-0 flex-wrap items-center gap-2 border-0 bg-transparent p-0 shadow-none focus-within:ring-0">
          {value.map((v) => (
            <ComboboxChip className="px-2" key={v} showRemove={false}>
              {getOptionLabel(v)}
            </ComboboxChip>
          ))}

          <ComboboxChipsInput
            placeholder={value.length === 0 ? placeholder : ""}
            readOnly
            className="placeholder:text-neutral-600"
          />
        </ComboboxChips>
      </div>
      <ComboboxContent anchor={anchorRef} className="px-3 py-2">
        <ComboboxList>
          {isLabeledOptions(options)
            ? options.map((group) => (
                <ComboboxGroup key={group.label}>
                  <ComboboxLabel className="px-2">{group.label}</ComboboxLabel>
                  {group.options.map((opt) => (
                    <ComboboxItem
                      key={opt.value}
                      value={opt.value}
                      className="px-2"
                    >
                      {opt.label}
                    </ComboboxItem>
                  ))}
                </ComboboxGroup>
              ))
            : flatOptions.map((opt) => (
                <ComboboxItem
                  key={opt.value}
                  value={opt.value}
                  className="px-2"
                >
                  {opt.label}
                </ComboboxItem>
              ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default MultiSelectDropdown;
