"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { ListPageShell } from "../components/list/ListPageShell"
import { ActionButton, DataTable, Pagination, StatusPill } from "../components/list/index";
import type { Column } from "../components/list/index";
import { usePagination } from "../hooks/usePagination"
import {
  GRNS,
  GRN_RECEIPT_TONE,
  LIST_PAGE_SIZE,
} from "../constants/supply-chain-lists.constants";
import type { Grn } from "../types/supply-chain.types";

const COLUMNS: Column<Grn>[] = [
  {
    key: "grnId",
    header: "GRN ID",
    width: "w-36",
    render: (grn) => <span className="font-medium text-gray-800">{grn.grnId}</span>,
  },
  { key: "supplierName", header: "Supplier", width: "w-52", render: (grn) => grn.supplierName },
  {
    key: "linkedPo",
    header: "Linked PO",
    width: "w-36",
    render: (grn) => <span className="text-gray-700">{grn.linkedPo}</span>,
  },
  {
    key: "receivingDate",
    header: "Receiving Date",
    width: "w-44",
    render: (grn) => grn.receivingDate,
  },
  {
    key: "receiptStatus",
    /** Column keeps the design's wording even though it shows receipt completeness. */
    header: "Material Type",
    width: "w-40",
    render: (grn) => (
      <StatusPill label={grn.receiptStatus} tone={GRN_RECEIPT_TONE[grn.receiptStatus]} uppercase />
    ),
  },
];

export default function GrnListPage() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { page, pageCount, pageRows, setPage } = usePagination(GRNS, LIST_PAGE_SIZE);

  function handleCreateGrn() {
    // TODO: open the Create GRN form / route.
  }

  function handleOpenGrn(grn: Grn) {
    // TODO: navigate to /supply-chain/grn/{grn.grnId}
    void grn;
  }

  return (
    <ListPageShell
      title="GRN List"
      showFilter
      actions={<ActionButton label="Create GRN" icon={Plus} onClick={handleCreateGrn} />}
    >
      <DataTable
        columns={COLUMNS}
        rows={pageRows}
        rowKey={(grn) => grn.id}
        selectable
        selectedKeys={selectedKeys}
        onSelectedKeysChange={setSelectedKeys}
        onRowAction={handleOpenGrn}
        rowActionLabel={(grn) => `Open ${grn.grnId}`}
        emptyMessage="No goods received notes match this filter."
      />
      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
    </ListPageShell>
  );
}
