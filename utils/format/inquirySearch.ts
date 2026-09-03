type SearchableInquiry = {
  first_name?: string;
  last_name?: string;
  email?: string;
  message?: string;
  status?: string;
};

/**
 * Substring search + offset pagination over already-ordered inquiry rows.
 *
 * ponytail: scans in JS because Convex `.filter()` has no "contains" operator.
 * Swap for a Convex search index if contact_us outgrows a few thousand rows.
 */
export const searchInquiries = <T extends SearchableInquiry>(
  rows: T[],
  search: string,
  paginationOpts: { numItems: number; cursor: string | null },
) => {
  const needle = search.trim().toLowerCase();

  const matches = needle
    ? rows.filter((row) =>
        [
          row.first_name,
          row.last_name,
          row.email,
          row.message,
          row.status ?? "new",
        ]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      )
    : rows;

  const offset = Math.max(0, Number(paginationOpts.cursor) || 0);
  const end = offset + paginationOpts.numItems;

  return {
    page: matches.slice(offset, end),
    isDone: end >= matches.length,
    continueCursor: String(end),
  };
};
