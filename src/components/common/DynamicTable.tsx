  "use client";

  import { useState, useMemo } from "react";
  import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
  } from "@/components/ui/table";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { ChevronUp, ChevronDown, ChevronsUpDown, Search, Inbox } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { DynamicTableProps, SortState } from "@/types/type/table.type";

  const serialize = (value: unknown): string => {
    if (value === null || value === undefined) return "";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  const DynamicTable = <T extends object>({
    columns,
    data,
    emptyMessage = "No data found",
    isLoading = false,
    skeletonRows = 5,
    searchable = false,
    searchPlaceholder = "Search…",
    pageSize,
    rowKey,
  }: DynamicTableProps<T>) => {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<SortState<T> | null>(null);
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
      if (!query.trim()) return data;
      const q = query.toLowerCase();
      return data.filter((row) =>
        columns.some((col) =>
          serialize(row[col.key]).toLowerCase().includes(q)
        )
      );
    }, [data, query, columns]);

    const sorted = useMemo(() => {
      if (!sort) return filtered;
      return [...filtered].sort((a, b) => {
        const va = serialize(a[sort.key]).toLowerCase();
        const vb = serialize(b[sort.key]).toLowerCase();
        const cmp = va < vb ? -1 : va > vb ? 1 : 0;
        return sort.direction === "asc" ? cmp : -cmp;
      });
    }, [filtered, sort]);

    const totalPages = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
    const paginated = pageSize
      ? sorted.slice((page - 1) * pageSize, page * pageSize)
      : sorted;

    const handleSort = (key: keyof T, sortable?: boolean) => {
      if (!sortable) return;
      setSort((prev) =>
        prev?.key === key
          ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
          : { key, direction: "asc" }
      );
      setPage(1);
    };

    const SortIcon = ({ colKey, sortable }: { colKey: keyof T; sortable?: boolean }) => {
      if (!sortable) return null;
      if (sort?.key !== colKey) return <ChevronsUpDown className="ml-1 h-3.5 w-3.5 opacity-40" />;
      return sort.direction === "asc"
        ? <ChevronUp className="ml-1 h-3.5 w-3.5 text-primary" />
        : <ChevronDown className="ml-1 h-3.5 w-3.5 text-primary" />;
    };

    return (
      <div className="space-y-3">
        {searchable && (
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-8"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            />
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead
                    key={String(col.key)}
                    style={{ width: col.width }}
                    className={cn(
                      col.sortable && "cursor-pointer select-none hover:text-foreground",
                      col.headerClassName
                    )}
                    onClick={() => handleSort(col.key, col.sortable)}
                    aria-sort={
                      sort?.key === col.key
                        ? sort.direction === "asc" ? "ascending" : "descending"
                        : undefined
                    }
                  >
                    <span className="inline-flex items-center">
                      {col.header}
                      <SortIcon colKey={col.key} sortable={col.sortable} />
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                Array.from({ length: skeletonRows }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    {columns.map((col) => (
                      <TableCell key={String(col.key)}>
                        <div className="h-4 rounded bg-muted animate-pulse" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : paginated.length > 0 ? (
                paginated.map((row, index) => {
                  const key = rowKey && row[rowKey] != null
                    ? String(row[rowKey])
                    : `row-${index}`;
                  return (
                    <TableRow key={key}>
                      {columns.map((col) => (
                        <TableCell
                          key={String(col.key)}
                          className={col.cellClassName}
                        >
                          {col.render ? col.render(row) : serialize(row[col.key])}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-32">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Inbox className="h-8 w-8 opacity-50" />
                      <p className="text-sm">{emptyMessage}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {pageSize && totalPages > 1 && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} of {sorted.length}
            </span>
            <div className="flex gap-1.5">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default DynamicTable;