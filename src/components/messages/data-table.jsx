"use client";

import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTable({
  columns,
  data,
  searchColumn = "email",
  searchPlaceholder = "Search...",
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnFilters,
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">

      {/* Toolbar */}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <div className="relative w-full md:max-w-sm">

          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            className="pl-9"
            placeholder={searchPlaceholder}
            value={
              table
                .getColumn(searchColumn)
                ?.getFilterValue() ?? ""
            }
            onChange={(e) =>
              table
                .getColumn(searchColumn)
                ?.setFilterValue(e.target.value)
            }
          />

        </div>

        <p className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} Results
        </p>

      </div>

      {/* Table */}

      <div className="rounded-xl border bg-card overflow-x-auto">

        <Table>

          <TableHeader>

            {table.getHeaderGroups().map((headerGroup) => (

              <TableRow key={headerGroup.id}>

                {headerGroup.headers.map((header) => (

                  <TableHead key={header.id}>

                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                  </TableHead>

                ))}

              </TableRow>

            ))}

          </TableHeader>

          <TableBody>

            {table.getRowModel().rows.length ? (

              table.getRowModel().rows.map((row) => (

                <TableRow
                  key={row.id}
                  className="hover:bg-muted/40 transition-colors"
                >

                  {row.getVisibleCells().map((cell) => (

                    <TableCell key={cell.id}>

                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}

                    </TableCell>

                  ))}

                </TableRow>

              ))

            ) : (

              <TableRow>

                <TableCell
                  colSpan={columns.length}
                  className="h-40 text-center text-muted-foreground"
                >
                  No records found.
                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </div>

      {/* Pagination */}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <p className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>

        <div className="flex gap-2">

          <Button
            variant="outline"
            size="icon"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <ChevronLeft className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <ChevronRight className="size-4" />
          </Button>

        </div>

      </div>

    </div>
  );
}