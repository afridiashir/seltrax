import { Link, useParams } from "react-router-dom";
import { useApiWithStore } from "@/hooks/use-api";
import { useEffect, useState } from "react";
import { CustomerSchemaType } from "@repo/zod-schemas";
import { toast } from "sonner";

import { Loader2 } from "lucide-react";
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { timeAgo } from "@/lib/helper";
import { Checkbox } from "@/components/ui/checkbox";
import { NoteEditDialouge } from "./NoteEdit";
import { CustomerUpdateAction } from "./customerUpdateAction";
import { usePageTitle } from "@/hooks/usePageTitle";


export default function CustomerDetail() {
    const api = useApiWithStore();

    const { id } = useParams<{ id: string }>();

    const [customer, setCustomer] = useState<CustomerSchemaType | null>(null);

    const pageTitle = usePageTitle(`${customer?.firstName} ${customer?.lastName} | Customer`);
    const [loading, setLoading] = useState(true);

    const [note, setNote] = useState<string>("");

    useEffect(() => {
        const result = api.get(`/customers/${id}`).then((res) => {
            setCustomer(res.data.customer);
            setLoading(false);
            setNote(res.data.customer.note);

        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong");
            setLoading(false);
        });

    }, [id]);

    if (!loading && !customer) {
        return <div>Customer not found</div>;
    }

    if (loading) {
        return <div className="w-full h-[calc(100vh-16rem)] flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>;
    }

    return (

        <div className="px-4 md:px-64">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/customers"><User className="w-10 h-10 hover:bg-gray-200 cursor-pointer rounded-md p-2" /> </Link>{"> "}
                    <h2 className="font-medium">{customer?.firstName} {customer?.lastName}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <CustomerUpdateAction customerData={customer} />
                </div>
            </div>

            <div className="w-full mt-4">
                <Card className="mt-4 gap-0 p-0">
                    <CardContent className="p-0 flex gap-2">
                        <div className="border-r w-1/3 p-2">

                            <div className="flex flex-col gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md" >
                                <p className="font-medium text-sm underline decoration-dotted">Amount Spent</p>
                                <p>Rs 0.00</p>
                            </div>
                        </div>
                        <div className="border-r w-1/3 p-2">
                            <div className="flex flex-col gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md" >
                                <p className="font-medium text-sm underline decoration-dotted">Total Orders</p>
                                <p>0</p>
                            </div>
                        </div>
                        <div className="border-r w-1/3 p-2">
                            <div className="flex flex-col gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md" >
                                <p className="font-medium text-sm underline decoration-dotted">Customer Since</p>
                                <p>{timeAgo(customer?.createdAt)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex gap-4">
                {/* ---------------- Left Card ---------------- */}
                <div className="w-2/3">
                    <Card className="mt-4 p-0 gap-0 ">
                        <CardHeader className="p-0  gap-0">
                            <CardTitle className="font-medium text-black border-b p-4 m-0 text-sm">
                                Last Order Placed
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            <div className="flex gap-4 mt-4">
                                <p className="text-sm">This customer hasn't placed any orders yet</p>
                            </div>

                        </CardContent>
                    </Card>
                </div>


                {/* ---------------- Right Card ---------------- */}
                <div className="w-1/3">
                    <Card className="mt-4 p-0 gap-0 ">
                        <CardHeader className="p-0  gap-0">
                            <CardTitle className="font-medium text-black border-b p-4 m-0 text-sm">
                                Customer
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            <div className="gap-4 mt-4">
                                <p className="text-sm text-semibold">Contact Information</p>
                                <p className="text-sm mt-2">{customer?.email}</p>
                                <p className="text-sm mt-1">{customer?.phone}</p>

                                <p className="text-sm text-semibold mt-4">Default Address</p>
                                <p className="text-sm mt-2">{customer?.address}</p>
                                <p className="text-sm mt-1">{customer?.city}</p>
                                <p className="text-sm mt-1">{customer?.state}</p>
                                <p className="text-sm mt-1">{customer?.zipCode}</p>
                                <p className="text-sm mt-1">{customer?.country}</p>


                                <p className="text-sm text-semibold mt-4">Marketing Information</p>
                                <p className="text-sm mt-2 flex items-center gap-2"><Checkbox checked={customer?.emailMarketing} disabled />Email {customer?.emailMarketing ? "Subscribed" : "not subscribed"}</p>
                                <p className="text-sm mt-1 flex items-center gap-2"><Checkbox checked={customer?.smsMarketing} disabled />SMS {customer?.smsMarketing ? "Subscribed" : "not subscribed"}</p>

                            </div>

                        </CardContent>
                    </Card>

                    <Card className="mt-4 p-0 gap-0 mb-16">
                        <CardHeader className="p-0  gap-0">
                            <CardTitle className="font-medium text-black border-b p-4 py-2 m-0 text-sm flex items-center justify-between">
                                Notes
                                {customer?.id && (
                                    <NoteEditDialouge id={customer.id} note={customer.note || ""} setNote={setNote} />
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 py-4">
                            {note ? (
                                <p className="text-sm text-black">{note}</p>
                            ) : (
                                <p className="text-sm text-gray-500">Notes are private and won't be shared with the customer.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};


