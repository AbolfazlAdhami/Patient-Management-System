"use client";
import React, { useEffect } from "react";
import { getPaginationRowModel, ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { decryptKey } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ data, columns }: DataTableProps<TData, TValue>) {
  const encryptedKey = typeof window !== "undefined" ? window.localStorage.getItem("accessKey") : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    console.log(accessKey, process.env.NEXT_PUBLIC_ADMIN_PASSKEY);
    // FIXME : fix accessKey and  ADMIN_PASSKEY
    // if (accessKey !== process.env.NEXT_PUBLIC_ADMIN_PASSKEY!.toString()) {
    //   redirect("/");
    // }
  }, [encryptedKey]);

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel() });

  return (
    <div className="data-table">
      <Table className="shad-table">
        <TableHeader className="bg-dark-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="shad-table-row-header">
              {headerGroup.headers.map((header, _i) => (
                <TableHead key={header.id + _i}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, _i) => (
              <TableRow key={row.id + _i} data-state={row.getIsSelected() && "selected"} className="shad-table-row">
                {row.getVisibleCells().map((cell, _i) => (
                  <TableCell key={cell.id + _i}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No Result.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="table-actions">
        <Button className="shad-gray-btn" variant={"outline"} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <Image src="/assets/icons/arrow.svg" width={24} height={24} alt="arrow" />
        </Button>
        <Button className="shad-gray-btn" variant={"outline"} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <Image src="/assets/icons/arrow.svg" width={24} height={24} alt="arrow" className="rotate-180" />
        </Button>
      </div>
    </div>
  );
}
