import { FunctionReference } from "convex/server";

export type ConvexTableHeader = {
  label: string;
  key: string;
  parse?: (value: any, row?: any) => React.ReactNode;
};

export type ConvexTableAction = {
  label: string;
  icon: React.ReactNode;
  onPress: (row: any) => void;
};

export type ConvexTableProps = {
  query: FunctionReference<"query">;
  pagination?: number;
  searchable?: boolean;
  headers: ConvexTableHeader[];
  actions?: ConvexTableAction[];
};
