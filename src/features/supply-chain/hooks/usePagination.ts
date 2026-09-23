"use client";

import { useMemo, useState } from "react";

interface UsePaginationResult<T> {
  page: number;
  pageCount: number;
  pageRows: T[];
  setPage: (page: number) => void;
}

/**
 * Client-side slicing for the list tables. When these pages move onto a real
 * API, swap this for a server-paged query — the pages themselves only use
 * `pageRows`, `page`, `pageCount` and `setPage`, so nothing else changes.
 */
export function usePagination<T>(rows: T[], pageSize = 12): UsePaginationResult<T> {
  const [page, setPageState] = useState(1);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = Math.min(page, pageCount);

  const pageRows = useMemo(
    () => rows.slice((safePage - 1) * pageSize, safePage * pageSize),
    [rows, safePage, pageSize],
  );

  function setPage(next: number) {
    setPageState(Math.min(Math.max(next, 1), pageCount));
  }

  return { page: safePage, pageCount, pageRows, setPage };
}
