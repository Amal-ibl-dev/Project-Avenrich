"use client";

import React from "react";
import { Plus } from "lucide-react";
import { ListPageShell } from "../components/list/ListPageShell";
import { ActionButton, DataTable, Pagination, PersonCell, StatusPill } from "../components/list/index";
import type { Column } from "../components/list/index";
import { usePagination } from "../hooks/usePagination";
import {
  LIST_PAGE_SIZE,
  PRODUCTION_ORDERS,
  PRODUCTION_ORDER_STATUS_TONE,
} from "../constants/supply-chain-lists.constants";
import type { ProductionOrder } from "../types/supply-chain.types";

const COLUMNS: Column<ProductionOrder>[] = [
  {
    key: "orderId",
    header: "Order ID",
    width: "w-28",
    render: (order) => <span className="font-medium text-gray-800">{order.orderId}</span>,
  },
  { key: "productId", header: "Product ID", width: "w-28", render: (order) => order.productId },
  {
    key: "salesOrderId",
    header: "Sales Order ID",
    width: "w-36",
    render: (order) => order.salesOrderId,
  },
  {
    key: "qtyToProduce",
    header: "Qty to Produce",
    width: "w-40",
    render: (order) => order.qtyToProduce,
  },
  {
    key: "customer",
    header: "Customers",
    width: "w-48",
    render: (order) => <PersonCell person={order.customer} align="center" />,
  },
  {
    key: "status",
    header: "Status",
    width: "w-40",
    render: (order) => (
      <StatusPill
        label={order.status}
        tone={PRODUCTION_ORDER_STATUS_TONE[order.status]}
        uppercase={order.status !== "Completed"}
      />
    ),
  },
];

export default function ProductionOrderListPage() {
  const { page, pageCount, pageRows, setPage } = usePagination(PRODUCTION_ORDERS, LIST_PAGE_SIZE);

  function handleAddOrder() {
    // TODO: open the Add Production Order form / route.
  }

  function handleOpenOrder(order: ProductionOrder) {
    // TODO: navigate to /supply-chain/production-orders/{order.orderId}
    void order;
  }

  return (
    <ListPageShell
      title="Production Order"
      actions={<ActionButton label="Add Production Order" icon={Plus} variant="outline" onClick={handleAddOrder} />}
    >
      <DataTable
        columns={COLUMNS}
        rows={pageRows}
        rowKey={(order) => order.id}
        onRowAction={handleOpenOrder}
        rowActionLabel={(order) => `Open production order ${order.orderId}`}
        emptyMessage="No production orders yet."
      />
      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
    </ListPageShell>
  );
}
