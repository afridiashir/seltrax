"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DomainSchemaType } from "@repo/zod-schemas"
import { Link } from "react-router-dom";
import { Check, CornerDownRight, Globe, Link2, SquareMousePointer } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
export const columns: ColumnDef<DomainSchemaType>[] = [
    {
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                {row.original.isPrimary ? <Tooltip>
                    <TooltipTrigger asChild>
                        <Globe className="w-4 h-4" xlinkTitle="Primary Domain" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Primary Domain</p>
                    </TooltipContent>
                </Tooltip> :
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <CornerDownRight className="ml-2 w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p> Domain</p>
                        </TooltipContent>
                    </Tooltip>}
                <Link to={`/settings/domains/${row.original.id}`} className="hover:underline">{row.original.domain}</Link>
            </div>
        ),
        header: "Domain",
    },

    {
        accessorKey: "status",
        header: "Status",
    },

    {
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                {row.original.status === "PENDING" && <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon-sm">
                            <Check className="w-4 h-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Recheck domain connectivity</p>
                    </TooltipContent>
                </Tooltip>}
            </div>
        ),
        header: ` `,
    },
    // {
    //     cell: ({ row }) =>
    //         row.original.createdAt
    //             ? new Date(row.original.createdAt).toLocaleDateString("en-US", {
    //                 day: "2-digit",
    //                 month: "short",
    //                 year: "numeric",
    //             })
    //             : "Not Created Yet",
    //     header: "Customer added date",
    // },
    // {
    //     cell: ({ row }) =>
    //         row.original.updatedAt
    //             ? new Date(row.original.updatedAt).toLocaleDateString("en-US", {
    //                 day: "2-digit",
    //                 month: "short",
    //                 year: "numeric",
    //             })
    //             : "Not Updated Yet",
    //     header: "Customer updated date",
    // },
];
