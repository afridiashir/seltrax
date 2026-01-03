import { Button } from "@/components/ui/button";
import { SquareMousePointer, Users } from "lucide-react";
import { DataTable } from "./datatable";
import { DomainInput, DomainSchemaType } from "@repo/zod-schemas";
import { SetStateAction, useEffect, useState } from "react";
import { useApiWithStore } from "@/hooks/use-api";
import { usePageTitle } from "@/hooks/usePageTitle";

import { columns } from "./columns";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ConnectDomainDialogue } from "../create/CreateDomain";

const UsersList = () => {

    const api = useApiWithStore();
    usePageTitle("Domains");

    const [data, setData] = useState<DomainSchemaType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            try {
                const res = await api.get("/domains");

                setData(res.data.domains);
            } catch (err) {
                console.error("Failed to fetch customers", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, [api]);

    return (
        <div>
            <div className="flex justify-between items-center bg-muted/10 px-6 py-3">
                <p className="text-lg flex items-center"><Users className="mr-2 w-5 h-5" />Users</p>
                <ConnectDomainDialogue />
            </div>
            <div className="px-6 mt-16">
                <Card className="p-0 overflow-hidden">
                    {loading ? <Skeleton className="h-[100px]" /> : <DataTable columns={columns} data={data} setData={setData} />}
                </Card>
            </div>
        </div>
    );
};

export default UsersList;