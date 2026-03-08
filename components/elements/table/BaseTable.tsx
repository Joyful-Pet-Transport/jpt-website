import { FC, useRef, useState, useMemo } from "react";
import BodyText from "../text/BodyText";
import TableProps, { TableAction, TableHeader } from "./TableProps";
import Heading from "../text/Heading";

// ─── Icons ────────────────────────────────────────────────────────────────────

const ChevronUp: FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={className}
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
  >
    <path
      d="M2 7L5 3L8 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDown: FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={className}
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
  >
    <path
      d="M2 3L5 7L8 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ColumnsIcon: FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect
      x="1"
      y="1"
      width="5"
      height="12"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="8"
      y="1"
      width="5"
      height="12"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

const SkeletonCell: FC = () => (
  <div className="h-4 bg-neutral-200 rounded animate-pulse w-3/4" />
);

const EmptyState: FC = () => (
  <div className="flex items-center justify-center py-12">
    <BodyText>No data available</BodyText>
  </div>
);

const ResizeHandle: FC<{ onMouseDown: (e: React.MouseEvent) => void }> = ({
  onMouseDown,
}) => (
  <div
    onMouseDown={onMouseDown}
    className="absolute right-0 top-0 h-full w-4 flex items-center justify-center cursor-col-resize select-none group/handle z-10"
  >
    <div className="w-px h-4 bg-neutral-400 group-hover/handle:bg-neutral-600 group-hover/handle:w-0.5 transition-all" />
  </div>
);

// ─── Sort indicator ───────────────────────────────────────────────────────────

type SortDir = "asc" | "desc";

const SortIndicator: FC<{ dir?: SortDir }> = ({ dir }) => (
  <span className="inline-flex flex-col items-center ml-1 gap-px">
    <ChevronUp
      className={dir === "asc" ? "text-neutral-800" : "text-neutral-300"}
    />
    <ChevronDown
      className={dir === "desc" ? "text-neutral-800" : "text-neutral-300"}
    />
  </span>
);

// ─── Column toggle panel ──────────────────────────────────────────────────────

const ColumnTogglePanel: FC<{
  headers: TableHeader[];
  hidden: Set<string>;
  onToggle: (key: string) => void;
}> = ({ headers, hidden, onToggle }) => {
  const toggleable = headers.filter((h) => h.toggleAble);
  if (toggleable.length === 0) return null;

  return (
    <div className="absolute right-0 top-full mt-1 z-50 bg-white border-2 border-neutral-400 rounded-xl p-3 min-w-[180px]">
      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 pb-2 border-b-2 border-neutral-400">
        Columns
      </p>
      {toggleable.map((h) => (
        <label
          key={h.key}
          className="flex items-center gap-2 py-1 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={!hidden.has(h.key)}
            onChange={() => onToggle(h.key)}
            className="rounded border-neutral-300 accent-neutral-800"
          />
          <BodyText>{h.label}</BodyText>
        </label>
      ))}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const BaseTable: FC<TableProps> = ({
  heading,
  headers,
  data,
  className,
  hasActions,
  action,
  loading = false,
  pagination: pageSize = 5,
}) => {
  // ── Column widths & resize ──
  const [colWidths, setColWidths] = useState<(number | undefined)[]>(
    headers.map((h) => h.initialWidth),
  );
  const isResizing = useRef<{
    index: number;
    startX: number;
    startWidth: number;
  } | null>(null);

  // ── Hidden columns ──
  const [hiddenCols, setHiddenCols] = useState<Set<string>>(new Set());
  const [showColPanel, setShowColPanel] = useState(false);

  // ── Sort ──
  const [sort, setSort] = useState<{ key: string; dir: SortDir } | null>(null);

  // ── Pagination ──
  const [page, setPage] = useState(1);

  // ── Derived ──
  const visibleHeaders = headers.filter((h) => !hiddenCols.has(h.key));
  const hasToggleable = headers.some((h) => h.toggleAble);

  // ── Resize ──
  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    const th = (e.currentTarget as HTMLElement).closest("th") as HTMLElement;
    const startWidth = colWidths[index] ?? th?.offsetWidth ?? 100;
    isResizing.current = { index, startX: e.clientX, startWidth };

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing.current) return;
      const { index, startX, startWidth } = isResizing.current;
      const delta = moveEvent.clientX - startX;
      const newWidth = Math.max(60, startWidth + delta);
      setColWidths((prev) => {
        const next = [...prev];
        next[index] = newWidth;
        return next;
      });
    };

    const onMouseUp = () => {
      isResizing.current = null;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // ── Sort click ──
  const handleSortClick = (key: string) => {
    setSort((prev) => {
      if (prev?.key !== key) return { key, dir: "asc" };
      if (prev.dir === "asc") return { key, dir: "desc" };
      return null;
    });
    setPage(1);
  };

  // ── Toggle column ──
  const toggleColumn = (key: string) => {
    setHiddenCols((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  // ── Processed data ──
  const processedData = useMemo(() => {
    if (!data) return [];
    let rows = [...data];

    if (sort) {
      rows.sort((a, b) => {
        const av = a[sort.key];
        const bv = b[sort.key];
        const cmp =
          av == null
            ? 1
            : bv == null
              ? -1
              : typeof av === "number" && typeof bv === "number"
                ? av - bv
                : String(av).localeCompare(String(bv));
        return sort.dir === "asc" ? cmp : -cmp;
      });
    }

    return rows;
  }, [data, sort]);

  const totalPages = Math.max(1, Math.ceil(processedData.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageData = processedData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const isLoading = loading;
  const isEmpty = !isLoading && processedData.length === 0;

  return (
    <div className="w-full flex flex-col gap-2">
      {heading && <Heading size="normal">{heading}</Heading>}

      {/* ── Toolbar ── */}
      {hasToggleable && (
        <div className="flex items-center justify-end">
          <div className="relative">
            <button
              onClick={() => setShowColPanel((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-neutral-400 rounded-xl hover:bg-neutral-50 transition"
            >
              <ColumnsIcon />
              <BodyText>Columns</BodyText>
              {hiddenCols.size > 0 && (
                <span className="bg-neutral-800 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {hiddenCols.size}
                </span>
              )}
            </button>
            {showColPanel && (
              <ColumnTogglePanel
                headers={headers}
                hidden={hiddenCols}
                onToggle={toggleColumn}
              />
            )}
          </div>
        </div>
      )}

      {/* ── Table ── */}
      <div
        className={`w-full overflow-hidden border-2 border-neutral-400 rounded-xl ${className ?? ""}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <colgroup>
              {visibleHeaders.map((h) => {
                const i = headers.indexOf(h);
                return (
                  <col
                    key={h.key}
                    style={colWidths[i] ? { width: colWidths[i] } : undefined}
                  />
                );
              })}
              {hasActions && <col />}
            </colgroup>

            <thead>
              <tr className="border-b-2 border-neutral-400">
                {visibleHeaders.map((header: TableHeader) => {
                  const originalIdx = headers.indexOf(header);
                  const isActive = sort?.key === header.key;

                  return (
                    <th
                      key={header.key}
                      className="px-4 py-3 text-left relative"
                      style={
                        colWidths[originalIdx]
                          ? { width: colWidths[originalIdx] }
                          : undefined
                      }
                    >
                      <div
                        className={`flex items-center w-fit ${header.sortable ? "cursor-pointer select-none" : ""}`}
                        onClick={
                          header.sortable
                            ? () => handleSortClick(header.key)
                            : undefined
                        }
                      >
                        <BodyText
                          weight="semibold"
                          className="whitespace-nowrap"
                        >
                          {header.label}
                        </BodyText>
                        {header.sortable && (
                          <SortIndicator
                            dir={isActive ? sort!.dir : undefined}
                          />
                        )}
                      </div>
                      {header.resizable && (
                        <ResizeHandle
                          onMouseDown={(e) => handleMouseDown(e, originalIdx)}
                        />
                      )}
                    </th>
                  );
                })}
                {hasActions && (
                  <th className="px-4 py-3 text-right">
                    <BodyText weight="semibold" className="whitespace-nowrap">
                      Actions
                    </BodyText>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {isLoading &&
                Array.from({ length: pageSize }).map((_, rowIdx) => (
                  <tr
                    key={`skeleton-${rowIdx}`}
                    className="border-t border-neutral-400"
                  >
                    {visibleHeaders.map((header: TableHeader) => (
                      <td
                        key={`skeleton-${rowIdx}-${header.key}`}
                        className="px-4 py-3"
                      >
                        <SkeletonCell />
                      </td>
                    ))}
                    {hasActions && (
                      <td className="px-4 py-3">
                        <div className="flex justify-end">
                          <div className="h-7 w-16 bg-neutral-200 rounded animate-pulse" />
                        </div>
                      </td>
                    )}
                  </tr>
                ))}

              {isEmpty && (
                <tr>
                  <td
                    colSpan={
                      hasActions
                        ? visibleHeaders.length + 1
                        : visibleHeaders.length
                    }
                  >
                    <EmptyState />
                  </td>
                </tr>
              )}

              {!isLoading &&
                pageData.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-t border-neutral-400">
                    {visibleHeaders.map((header: TableHeader) => {
                      const rawValue = row[header.key];
                      const displayValue = header.parse
                        ? header.parse(rawValue)
                        : rawValue;

                      return (
                        <td
                          key={`${rowIdx}-${header.key}`}
                          className="px-4 py-3"
                        >
                          <BodyText
                            className={
                              displayValue == null ? "text-neutral-400!" : ""
                            }
                          >
                            {displayValue ?? "—"}
                          </BodyText>
                        </td>
                      );
                    })}

                    {hasActions && (
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {action?.map(
                            (act: TableAction, actionIdx: number) => (
                              <button
                                key={actionIdx}
                                onClick={act.onPress}
                                title={act.label}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-neutral-400 rounded-xl"
                              >
                                {act.icon}
                                <BodyText>{act.label}</BodyText>
                              </button>
                            ),
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Pagination ── */}
      {!isLoading && (
        <div className="flex items-center justify-between px-1">
          <BodyText className="text-neutral-500">
            Page {safePage} of {totalPages}
          </BodyText>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="px-3 py-1.5 border-2 border-neutral-400 rounded-xl disabled:opacity-30 hover:bg-neutral-50 transition"
            >
              <BodyText>Previous</BodyText>
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="px-3 py-1.5 border-2 border-neutral-400 rounded-xl disabled:opacity-30 hover:bg-neutral-50 transition"
            >
              <BodyText>Next</BodyText>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BaseTable;
