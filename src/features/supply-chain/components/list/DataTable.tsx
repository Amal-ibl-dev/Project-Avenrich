import React from "react";
import { LIST_THEME } from "../../constants/list-theme.constants";
import { RowActionButton } from "./RowActionButton";

export interface Column<T> {
  /** Unique within the table; also used as the React key. */
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  /** Tailwind width utility, e.g. "w-32". Table is fixed-layout. */
  width?: string;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  /** Stable identity for a row — used for keys and selection. */
  rowKey: (row: T) => string;
  /** Adds the leading checkbox column. */
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectedKeysChange?: (keys: string[]) => void;
  /** Adds the trailing circular action column. */
  onRowAction?: (row: T) => void;
  rowActionLabel?: (row: T) => string;
  emptyMessage?: string;
}

const ALIGN_CLASS = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

const CHECKBOX_CLASS =
  "h-[18px] w-[18px] cursor-pointer rounded-[5px] border-2 border-gray-300 accent-[#186340] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5631] focus-visible:ring-offset-2";

/**
 * The one table used by every list page: dark green rounded header bar over a
 * white body card. Columns are supplied by the page as render functions, so
 * this component stays free of any domain knowledge — a new list page needs a
 * column array and nothing else.
 *
 * Selection is controlled. Pass `selectedKeys` / `onSelectedKeysChange` to own
 * the state in the page (which is what the bulk-action bar will need later);
 * omit `selectable` entirely for read-only tables like Product List.
 */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  selectable = false,
  selectedKeys = [],
  onSelectedKeysChange,
  onRowAction,
  rowActionLabel,
  emptyMessage = "Nothing to show yet.",
}: DataTableProps<T>) {
  const showActionColumn = Boolean(onRowAction);
  const allKeys = rows.map(rowKey);
  const allSelected = rows.length > 0 && allKeys.every((key) => selectedKeys.includes(key));

  function toggleAll() {
    if (!onSelectedKeysChange) return;
    onSelectedKeysChange(allSelected ? [] : allKeys);
  }

  function toggleOne(key: string) {
    if (!onSelectedKeysChange) return;
    onSelectedKeysChange(
      selectedKeys.includes(key)
        ? selectedKeys.filter((selected) => selected !== key)
        : [...selectedKeys, key],
    );
  }

  const totalColumns = columns.length + (selectable ? 1 : 0) + (showActionColumn ? 1 : 0);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[820px] table-fixed border-separate border-spacing-0">
        <thead>
          <tr>
            {selectable ? (
              <th
                scope="col"
                className="w-14 rounded-l-2xl px-4 py-4"
                style={{ background: LIST_THEME.tableHeaderBg }}
              >
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Select all rows on this page"
                  className={`${CHECKBOX_CLASS} border-white/70`}
                />
              </th>
            ) : null}

            {columns.map((column, index) => {
              const isFirst = index === 0 && !selectable;
              const isLast = index === columns.length - 1 && !showActionColumn;
              return (
                <th
                  key={column.key}
                  scope="col"
                  className={[
                    "px-4 py-4 text-sm font-semibold",
                    ALIGN_CLASS[column.align ?? "center"],
                    column.width ?? "",
                    isFirst ? "rounded-l-2xl" : "",
                    isLast ? "rounded-r-2xl" : "",
                  ].join(" ")}
                  style={{
                    background: LIST_THEME.tableHeaderBg,
                    color: LIST_THEME.tableHeaderText,
                  }}
                >
                  {column.header}
                </th>
              );
            })}

            {showActionColumn ? (
              <th
                scope="col"
                className="w-24 rounded-r-2xl px-4 py-4 text-center text-sm font-semibold"
                style={{ background: LIST_THEME.tableHeaderBg, color: LIST_THEME.tableHeaderText }}
              >
                Action
              </th>
            ) : null}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={totalColumns}
                className="rounded-b-3xl bg-white px-4 py-16 text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => {
              const key = rowKey(row);
              const isLastRow = rowIndex === rows.length - 1;
              const cellClass = [
                "bg-white px-4 py-3",
                isLastRow ? "" : "border-b",
              ].join(" ");
              const cellStyle = { borderColor: LIST_THEME.rowDivider };

              return (
                <tr key={key}>
                  {selectable ? (
                    <td
                      className={`${cellClass} ${isLastRow ? "rounded-bl-3xl" : ""}`}
                      style={cellStyle}
                    >
                      <input
                        type="checkbox"
                        checked={selectedKeys.includes(key)}
                        onChange={() => toggleOne(key)}
                        aria-label={`Select row ${key}`}
                        className={CHECKBOX_CLASS}
                      />
                    </td>
                  ) : null}

                  {columns.map((column, index) => {
                    const isFirst = index === 0 && !selectable;
                    const isLast = index === columns.length - 1 && !showActionColumn;
                    return (
                      <td
                        key={column.key}
                        className={[
                          cellClass,
                          ALIGN_CLASS[column.align ?? "center"],
                          "text-sm text-gray-700",
                          isLastRow && isFirst ? "rounded-bl-3xl" : "",
                          isLastRow && isLast ? "rounded-br-3xl" : "",
                        ].join(" ")}
                        style={cellStyle}
                      >
                        {column.render(row)}
                      </td>
                    );
                  })}

                  {showActionColumn ? (
                    <td
                      className={`${cellClass} text-center ${isLastRow ? "rounded-br-3xl" : ""}`}
                      style={cellStyle}
                    >
                      <RowActionButton
                        label={rowActionLabel ? rowActionLabel(row) : `Open ${key}`}
                        onClick={() => onRowAction?.(row)}
                      />
                    </td>
                  ) : null}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
