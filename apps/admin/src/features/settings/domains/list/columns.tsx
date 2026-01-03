"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomerSchemaType } from "@repo/zod-schemas"
import { Link } from "react-router-dom";
export const columns: ColumnDef<CustomerSchemaType>[] = [
    {
        id: "id",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: any) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                className="bg-white border-gray-400"
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) =>
                    row.toggleSelected(!!value)
                }
                className="bg-white border-gray-400"
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        cell: ({ row }) => (
            <Link to={`/customers/${row.original.id}`} className="hover:underline">{row.original.firstName + " " + row.original.lastName}</Link>
        ),
        header: "Customer Name",
    },
    {
        cell: ({ row }) => row.original.city + ", " + row.original.state,
        header: "Location",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone No",
    },
    {
        cell: ({ row }) =>
            row.original.createdAt
                ? new Date(row.original.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
                : "Not Created Yet",
        header: "Customer added date",
    },
    {
        cell: ({ row }) =>
            row.original.updatedAt
                ? new Date(row.original.updatedAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
                : "Not Updated Yet",
        header: "Customer updated date",
    },
];
