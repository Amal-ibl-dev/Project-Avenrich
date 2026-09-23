"use client";

import React from "react";
import { Plus } from "lucide-react";
import { ListPageShell } from "../components/list/ListPageShell";
import { ActionButton, DataTable, Pagination } from "../components/list/index";
import type { Column } from "../components/list/index";
import { usePagination } from "../hooks/usePagination";
import { LIST_PAGE_SIZE, PRODUCTS } from "../constants/supply-chain-lists.constants";
import type { Product } from "../types/supply-chain.types";

const COLUMNS: Column<Product>[] = [
  {
    key: "productId",
    header: "Product Id",
    width: "w-32",
    render: (product) => <span className="font-medium text-gray-800">{product.productId}</span>,
  },
  {
    key: "name",
    header: "Name",
    width: "w-48",
    render: (product) => product.name,
  },
  {
    key: "description",
    header: "Description",
    render: (product) => <span className="text-gray-600">{product.description}</span>,
  },
  {
    key: "unitsPerCarton",
    header: "Unit (carton)",
    width: "w-36",
    render: (product) => product.unitsPerCarton,
  },
];

export default function ProductListPage() {
  const { page, pageCount, pageRows, setPage } = usePagination(PRODUCTS, LIST_PAGE_SIZE);

  function handleAddProduct() {
    // TODO: open the Add Product form / route.
  }

  function handleOpenProduct(product: Product) {
    // TODO: navigate to /supply-chain/products/{product.productId}
    void product;
  }

  return (
    <ListPageShell
      title="Product list"
      actions={<ActionButton label="Add Product" icon={Plus} onClick={handleAddProduct} />}
    >
      <DataTable
        columns={COLUMNS}
        rows={pageRows}
        rowKey={(product) => product.id}
        onRowAction={handleOpenProduct}
        rowActionLabel={(product) => `Open product ${product.productId}`}
        emptyMessage="No products yet. Add your first product to get started."
      />
      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
    </ListPageShell>
  );
}
