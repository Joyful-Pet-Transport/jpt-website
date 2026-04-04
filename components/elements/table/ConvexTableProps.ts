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
  queryArgs?: Record<string, string | number | boolean | null | undefined>;
  headers: ConvexTableHeader[];
  actions?: ConvexTableAction[];
};
