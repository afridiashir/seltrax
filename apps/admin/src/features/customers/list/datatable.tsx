"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Ellipsis, Trash } from "lucide-react"
import { Link } from "react-router-dom"

interface DataTableProps<TData extends { id: string }, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    setData: (data: TData[]) => void
}

export function DataTable<TData extends { id: string }, TValue>({
    columns,
    data,
    setData,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
        },
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
    })
    const selectedIds = table.getSelectedRowModel().flatRows.map(row => row.original.id);

    const deleteSelectedCustomers = async (ids: string[]) => {

        setData(data.filter((row) => !ids.includes(row.id)));
        setRowSelection({});
    }

    return (
        <div className="overflow-x-auto">
            {selectedIds.length > 0 && (
                <div className="text-sm p-2 px-4 bg-gray-200 flex items-center justify-between">
                    <p>{selectedIds.length} {selectedIds.length === 1 ? "Customer" : "Customers"} selected</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto" size={"icon"}>
                                <Ellipsis className="w-4 h-4 text-gray-600" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="text-sm">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer w-full p-2 hover:bg-gray-100 bg-red-500 rounded text-white hover:bg-red-500/90 flex items-center gap-2" onClick={() => deleteSelectedCustomers(selectedIds)}>
                                <Trash className="w-4 h-4 text-white" />Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            )}
            <Table className="w-full">

                <TableHeader className="bg-gray-100 text-gray-200">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} >
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className=" text-gray-600 text-sm">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
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

                                        <Link to={`/customers/${row.original.id}`}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}

                                        </Link>
                                    </TableCell>

                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div >
    )
}