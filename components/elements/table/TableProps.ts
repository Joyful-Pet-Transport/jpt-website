import { ReactElement } from "react";

type TableProps = {
  heading?: string;
  headers: TableHeader[];
  data?: any[];
  className?: string | undefined;
  hasActions: boolean;
  action?: TableAction[];
  loading?: boolean;
  pagination?: number;
};

export type TableAction = {
  label: string;
  icon: ReactElement;
  onPress: () => void;
};

export type TableHeader = {
  label: string;
  key: string;
  parse?: (value: any) => any;
  resizable?: boolean;
  initialWidth?: number;
  sortable?: boolean;
  toggleAble?: boolean;
};

export default TableProps;
