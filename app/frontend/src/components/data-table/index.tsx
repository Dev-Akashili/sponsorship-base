"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { DataTablePagination } from "./DataTablePagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { NotebookText } from "lucide-react";
import { useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  Search?: JSX.Element;
  Filter?: JSX.Element;
  actions?: JSX.Element | JSX.Element[];
  adminOptions?: JSX.Element | JSX.Element[] | null;
  count: number;
  link?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  Search,
  Filter,
  actions,
  adminOptions,
  count,
  link
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [id, setId] = useState<string>("");
  const shared = searchParams.get("id");

  useEffect(() => {
    if (shared) {
      setId(shared);
    } else {
      setId("");
    }
  }, [shared, searchParams]);

  return (
    <div className="flex flex-col p-4 bg-white rounded-md">
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-between space-4 mb-4">
          {Search}
          {Filter}
          {actions}
        </div>
        {adminOptions}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <DataTablePagination count={count} />
      </div>
      {id && (
        <Button
          onClick={() => {
            navigate(link ?? "");
            setId("");
          }}
          variant={"outline"}
          className="mx-auto my-2 border-blue-600 text-blue-600 hover:text-blue-500"
        >
          <NotebookText className="mr-2" /> See full list
        </Button>
      )}
    </div>
  );
}
