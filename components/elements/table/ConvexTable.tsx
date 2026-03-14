"use client";

import { FC, useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { ConvexTableProps } from "./ConvexTableProps";
import BodyText from "@/components/elements/text/BodyText";

const ConvexTable: FC<ConvexTableProps> = ({
  query,
  pagination = 10,
  searchable = false,
  headers,
  actions,
}) => {
  const [cursorStack, setCursorStack] = useState<(string | null)[]>([null]);
  const [lastRows, setLastRows] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState<string | undefined>(undefined);

  const currentCursor = cursorStack[cursorStack.length - 1];
  const pageIndex = cursorStack.length - 1;

  const result = useQuery(query, {
    paginationOpts: { numItems: pagination, cursor: currentCursor },
    ...(searchable ? { search: search ?? "" } : {}),
  });

  const rows: any[] = result?.page ?? lastRows;
  const isDone: boolean = result?.isDone ?? false;
  const nextCursor: string | null = result?.continueCursor ?? null;

  if (result?.page && result.page !== lastRows) {
    setLastRows(result.page);
  }

  useEffect(() => {
    setCursorStack([null]);
    setLastRows([]);
  }, [search]);

  const hasPrev = cursorStack.length > 1;
  const hasNext = !isDone && !!nextCursor;

  const handleNext = () => {
    if (nextCursor && !isDone) {
      setCursorStack((prev) => [...prev, nextCursor]);
    }
  };

  const handlePrev = () => {
    if (cursorStack.length > 1) {
      setCursorStack((prev) => prev.slice(0, -1));
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(searchInput.trim() || undefined);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    if (e.target.value === "") {
      setSearch(undefined);
    }
  };

  const isLoading = !result && !lastRows.length;
  const isEmpty = !isLoading && rows.length === 0;

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Search */}
      {searchable && (
        <div className="flex justify-end">
          <div className="relative w-full lg:max-w-xs shadow-sm rounded-lg">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-150"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="w-full overflow-hidden border border-blue-200 rounded-xl shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 border-b border-blue-200">
                {headers.map((header) => (
                  <th
                    key={header.key}
                    className="px-5 py-3 text-left first:rounded-tl-xl last:rounded-tr-xl"
                  >
                    <BodyText
                      size="small"
                      weight="semibold"
                      className="whitespace-nowrap text-xs uppercase tracking-wide text-blue-700"
                    >
                      {header.label}
                    </BodyText>
                  </th>
                ))}
                {actions && (
                  <th className="px-5 py-3 text-center">
                    <BodyText
                      size="small"
                      weight="semibold"
                      className="whitespace-nowrap text-xs uppercase tracking-wide text-blue-700"
                    >
                      {actions.length === 1 ? actions[0].label : "Actions"}
                    </BodyText>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {isLoading &&
                Array.from({ length: pagination }).map((_, rowIdx) => (
                  <tr
                    key={`skeleton-${rowIdx}`}
                    className={rowIdx % 2 === 0 ? "bg-white" : "bg-blue-50"}
                  >
                    {headers.map((header) => (
                      <td
                        key={`skeleton-${rowIdx}-${header.key}`}
                        className="px-5 py-3.5"
                      >
                        <div
                          className="h-3.5 bg-neutral-100 rounded-md animate-pulse"
                          style={{
                            width: `${55 + ((rowIdx * 13 + header.key.length * 7) % 35)}%`,
                          }}
                        />
                      </td>
                    ))}
                    {actions && (
                      <td className="px-5 py-3.5">
                        <div className="flex justify-center">
                          <div className="h-7 w-14 bg-neutral-100 rounded-lg animate-pulse" />
                        </div>
                      </td>
                    )}
                  </tr>
                ))}

              {isEmpty && (
                <tr>
                  <td colSpan={actions ? headers.length + 1 : headers.length}>
                    <div className="flex flex-col items-center justify-center py-14 gap-2">
                      <svg
                        className="text-neutral-300"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 21V9" />
                      </svg>
                      <BodyText
                        size="small"
                        className="text-neutral-400 text-sm"
                      >
                        No data available
                      </BodyText>
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading &&
                rows.map((row: any, rowIdx: number) => (
                  <tr
                    key={row._id}
                    className={`transition-colors duration-100 ${
                      rowIdx % 2 === 0
                        ? "bg-white hover:bg-blue-50/60"
                        : "bg-blue-50 hover:bg-blue-100/60"
                    }`}
                  >
                    {headers.map((header) => {
                      const value = row[header.key];
                      const displayValue = header.parse
                        ? header.parse(value, row)
                        : value;

                      return (
                        <td
                          key={`${rowIdx}-${header.key}`}
                          className="px-5 py-2"
                        >
                          <BodyText
                            size="small"
                            className={
                              displayValue == null
                                ? "text-neutral-300 text-sm"
                                : "text-neutral-700 text-sm"
                            }
                          >
                            {displayValue ?? "—"}
                          </BodyText>
                        </td>
                      );
                    })}

                    {actions && (
                      <td className="px-5 py-2">
                        <div className="flex items-center justify-center gap-1.5">
                          {actions.map((action: any, actionIdx: number) => (
                            <button
                              key={actionIdx}
                              onClick={() => action.onPress(row)}
                              title={action.label}
                              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-neutral-200 rounded-lg text-neutral-500 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 active:bg-blue-100 transition-all duration-100"
                            >
                              {action.icon}
                            </button>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && (
        <div className="flex items-center justify-between px-1">
          <BodyText size="small" className="text-neutral-400 text-sm">
            Page {pageIndex + 1}
          </BodyText>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              disabled={!hasPrev}
              className="flex shadow-sm items-center gap-1.5 px-3 py-1.5 text-sm border border-blue-100 rounded-lg text-neutral-600 hover:bg-blue-50 hover:border-blue-400 active:bg-blue-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-100"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <BodyText size="small">Prev</BodyText>
            </button>
            <button
              onClick={handleNext}
              disabled={!hasNext}
              className="flex shadow-sm items-center gap-1.5 px-3 py-1.5 text-sm border border-blue-100 rounded-lg text-neutral-600 hover:bg-blue-50 hover:border-blue-400 active:bg-blue-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-100"
            >
              <BodyText size="small">Next</BodyText>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConvexTable;
