import { ReactElement } from "react";

export type Option = {
  label: string;
  value: string;
};

export type LabeledOption = {
  label: string;
  options: Option[];
};

export type OptionWithIcon = Option & {
  icon: ReactElement;
};
