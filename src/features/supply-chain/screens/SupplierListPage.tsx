"use client";

import React, { useState } from "react";
import { Plus, Printer } from "lucide-react";
import { ListPageShell } from "../components/list/ListPageShell";
import { ActionButton, DataTable, Pagination, PersonCell, StatusPill } from "../components/list/index";
import type { Column } from "../components/list/index";
import { usePagination } from "../hooks/usePagination";
import {
  LIST_PAGE_SIZE,
  MATERIAL_TYPE_TONE,
  SUPPLIERS,
} from "../constants/supply-chain-lists.constants";
import type { Supplier } from "../types/supply-chain.types";

const COLUMNS: Column<Supplier>[] = [
  {
    key: "supplierId",
    header: "Supplier id",
    width: "w-32",
    render: (supplier) => <span className="font-medium text-gray-800">{supplier.supplierId}</span>,
  },
  {
    key: "name",
    header: "Name",
    width: "w-52",
    render: (supplier) => <PersonCell person={supplier.contact} align="center" />,
  },
  {
    key: "email",
    header: "Email",
    render: (supplier) => (
      <a href={`mailto:${supplier.email}`} className="text-gray-700 hover:text-[#1E5631] hover:underline">
        {supplier.email}
      </a>
    ),
  },
  { key: "phoneNumber", header: "Phone Number", width: "w-40", render: (s) => s.phoneNumber },
  {
    key: "address",
    header: "Address",
    width: "w-52",
    render: (supplier) => (
      <span className="block truncate text-gray-600" title={supplier.address}>
        {supplier.address}
      </span>
    ),
  },
  {
    key: "materialType",
    header: "Material Type",
    width: "w-44",
    render: (supplier) => (
      <StatusPill label={supplier.materialType} tone={MATERIAL_TYPE_TONE[supplier.materialType]} />
    ),
  },
];

export default function SupplierListPage() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { page, pageCount, pageRows, setPage } = usePagination(SUPPLIERS, LIST_PAGE_SIZE);

  function handleAddSupplier() {
    // TODO: open the Add Supplier form / route.
  }

  /** Exports the current selection, or the whole list when nothing is ticked. */
  function handleExportPdf() {
    const rowsToExport = selectedKeys.length > 0
      ? SUPPLIERS.filter((supplier) => selectedKeys.includes(supplier.id))
      : SUPPLIERS;
    // TODO: hand rowsToExport to the PDF service.
    void rowsToExport;
  }

  function handleOpenSupplier(supplier: Supplier) {
    // TODO: navigate to /supply-chain/suppliers/{supplier.supplierId}
    void supplier;
  }

  return (
    <ListPageShell
      title="Supplier List"
      showFilter
      actions={
        <>
          <ActionButton label="Add Supplier" icon={Plus} variant="outline" onClick={handleAddSupplier} />
          <ActionButton label="Export Pdf" icon={Printer} onClick={handleExportPdf} />
        </>
      }
    >
      <DataTable
        columns={COLUMNS}
        rows={pageRows}
        rowKey={(supplier) => supplier.id}
        selectable
        selectedKeys={selectedKeys}
        onSelectedKeysChange={setSelectedKeys}
        onRowAction={handleOpenSupplier}
        rowActionLabel={(supplier) => `Open supplier ${supplier.supplierId}`}
        emptyMessage="No suppliers match this filter."
      />
      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
    </ListPageShell>
  );
}
