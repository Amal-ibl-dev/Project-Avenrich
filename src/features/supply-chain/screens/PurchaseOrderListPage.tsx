"use client";

import React, { useState } from "react";
import { Plus, Printer } from "lucide-react";
import { ListPageShell } from "../components/list/ListPageShell";
import { ActionButton, DataTable, Pagination, StatusPill } from "../components/list/index";
import type { Column } from "../components/list/index";
import { usePagination } from "../hooks/usePagination";
import {
  LIST_PAGE_SIZE,
  PURCHASE_ORDERS,
  PURCHASE_ORDER_STATUS_TONE,
} from "../constants/supply-chain-lists.constants";
import type { PurchaseOrder } from "../types/supply-chain.types";

/** Cancelled rows are dimmed so a long list reads at a glance. */
const isInactive = (order: PurchaseOrder) => order.status === "Cancel";

const COLUMNS: Column<PurchaseOrder>[] = [
  {
    key: "orderId",
    header: "Order ID",
    width: "w-32",
    render: (order) => (
      <span className={isInactive(order) ? "text-gray-400" : "font-medium text-gray-800"}>
        {order.orderId}
      </span>
    ),
  },
  {
    key: "productName",
    header: "Product Name",
    width: "w-44",
    render: (order) => (
      <span className={isInactive(order) ? "text-gray-400" : undefined}>{order.productName}</span>
    ),
  },
  {
    key: "materialName",
    header: "Material Name",
    width: "w-44",
    render: (order) => (
      <span className={isInactive(order) ? "text-gray-400" : undefined}>{order.materialName}</span>
    ),
  },
  {
    key: "quantity",
    header: "Quantity",
    width: "w-32",
    render: (order) => order.quantity.toLocaleString(),
  },
  {
    key: "unitPrice",
    header: "Unit Price",
    width: "w-32",
    render: (order) => order.unitPrice.toLocaleString(),
  },
  {
    key: "status",
    header: "Status",
    width: "w-40",
    render: (order) => (
      <StatusPill
        label={order.status}
        tone={PURCHASE_ORDER_STATUS_TONE[order.status]}
        uppercase={order.status !== "Email Sent"}
      />
    ),
  },
];

export default function PurchaseOrderListPage() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { page, pageCount, pageRows, setPage } = usePagination(PURCHASE_ORDERS, LIST_PAGE_SIZE);

  function handleAddPurchaseOrder() {
    // TODO: open the Add Purchase Order form / route.
  }

  function handleExportPdf() {
    const rowsToExport = selectedKeys.length > 0
      ? PURCHASE_ORDERS.filter((order) => selectedKeys.includes(order.id))
      : PURCHASE_ORDERS;
    // TODO: hand rowsToExport to the PDF service.
    void rowsToExport;
  }

  function handleOpenPurchaseOrder(order: PurchaseOrder) {
    // TODO: navigate to /supply-chain/purchase-orders/{order.orderId}
    void order;
  }

  return (
    <ListPageShell
      title="Purchase Order List"
      showFilter
      actions={
        <>
          <ActionButton
            label="Add Purchase Order"
            icon={Plus}
            variant="outline"
            onClick={handleAddPurchaseOrder}
          />
          <ActionButton label="Export Pdf" icon={Printer} onClick={handleExportPdf} />
        </>
      }
    >
      <DataTable
        columns={COLUMNS}
        rows={pageRows}
        rowKey={(order) => order.id}
        selectable
        selectedKeys={selectedKeys}
        onSelectedKeysChange={setSelectedKeys}
        onRowAction={handleOpenPurchaseOrder}
        rowActionLabel={(order) => `Open purchase order ${order.orderId}`}
        emptyMessage="No purchase orders match this filter."
      />
      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
    </ListPageShell>
  );
}
