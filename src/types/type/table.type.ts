import { ReactNode } from "react";

export type TableColumn<T extends object> = {
  key: keyof T;
  header: string;
  render?: (row: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
  sortable?: boolean;
  width?: string;
};

export type SortDirection = "asc" | "desc";

export type SortState<T> = {
  key: keyof T;
  direction: SortDirection;
};

export type DynamicTableProps<T extends object> = {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  isLoading?: boolean;
  skeletonRows?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  rowKey?: keyof T;
};