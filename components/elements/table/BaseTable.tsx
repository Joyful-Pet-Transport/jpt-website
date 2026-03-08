import { FC, useLayoutEffect, useRef, useState } from "react";
import BodyText from "../text/BodyText";
import TableProps, { TableAction, TableHeader } from "./TableProps";
import Heading from "../text/Heading";

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

const BaseTable: FC<TableProps> = ({
  heading,
  headers,
  data,
  className,
  hasActions,
  action,
  loading = false,
}) => {
  const [componentLoading] = useState<boolean>(loading);

  // Start undefined for all columns — seeded from DOM after first render
  const [colWidths, setColWidths] = useState<(number | undefined)[]>(() =>
    headers.map(() => undefined),
  );

  const theadRef = useRef<HTMLTableSectionElement>(null);

  // After first paint, measure each resizable <th> and lock in its rendered width
  useLayoutEffect(() => {
    const thElements = theadRef.current?.querySelectorAll("th");
    if (!thElements) return;

    setColWidths(
      headers.map((header, i) => {
        if (!header.resizable) return undefined;
        return thElements[i]?.getBoundingClientRect().width ?? undefined;
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run once on mount

  const isResizing = useRef<{
    index: number;
    startX: number;
    startWidth: number;
  } | null>(null);

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault(); // Prevent text selection during drag

    // Use getBoundingClientRect() for accurate width in Next.js (avoids SSR/offsetWidth issues)
    const thElements = theadRef.current?.querySelectorAll("th");
    const th = thElements?.[index] as HTMLElement | undefined;
    const startWidth =
      th?.getBoundingClientRect().width ?? colWidths[index] ?? 100;

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

  const isLoading = loading || componentLoading;
  const isEmpty = !isLoading && (!data || data.length === 0);

  return (
    <div className="w-full flex flex-col gap-2">
      {heading && <Heading size="normal">{heading}</Heading>}
      <div
        className={`w-full overflow-hidden border-2 border-neutral-400 rounded-xl ${className ?? ""}`}
      >
        <div className="overflow-x-auto">
          <table className="border-collapse table-fixed min-w-full">
            <colgroup>
              {headers.map((header, i) => (
                <col
                  key={i}
                  style={
                    colWidths[i]
                      ? { width: colWidths[i] }
                      : header.resizable
                        ? undefined
                        : { width: "100%" }
                  }
                />
              ))}
              {hasActions && <col />}
            </colgroup>

            <thead ref={theadRef}>
              <tr className="border-b-2 border-neutral-400">
                {headers.map((header: TableHeader, index: number) => (
                  <th
                    key={header.key}
                    className="px-4 py-3 text-left relative overflow-hidden"
                    style={
                      colWidths[index] ? { width: colWidths[index] } : undefined
                    }
                  >
                    <BodyText weight="semibold" className="whitespace-nowrap">
                      {header.label}
                    </BodyText>
                    {header.resizable && (
                      <ResizeHandle
                        onMouseDown={(e) => handleMouseDown(e, index)}
                      />
                    )}
                  </th>
                ))}
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
                Array.from({ length: 5 }).map((_, rowIdx) => (
                  <tr
                    key={`skeleton-${rowIdx}`}
                    className="border-t border-neutral-300"
                  >
                    {headers.map((header: TableHeader) => (
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
                    colSpan={hasActions ? headers.length + 1 : headers.length}
                  >
                    <EmptyState />
                  </td>
                </tr>
              )}

              {!isLoading &&
                data &&
                data.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-t border-neutral-300">
                    {headers.map((header: TableHeader) => {
                      const rawValue = row[header.key];
                      const displayValue = header.parse
                        ? header.parse(rawValue)
                        : rawValue;

                      return (
                        <td
                          key={`${rowIdx}-${header.key}`}
                          className="px-4 py-3 overflow-hidden"
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
                                className="flex items-center gap-1.5 px-2.5 py-1.5 border border-neutral-500 rounded-lg"
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
    </div>
  );
};

export default BaseTable;
