"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Info, Pencil, User } from "lucide-react";
import { useApiWithStore } from "@/hooks/use-api";
import { CustomerCreateInput } from "@repo/zod-schemas";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { NoteDialouge } from "./NoteDialouge";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useUnsavedChangesWarning } from "@/hooks/useUnsavedWarning";

const initialState: CustomerCreateInput = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emailMarketing: false,
    smsMarketing: false,
};

export const CustomerNew = () => {
    const pageTitle = usePageTitle("New Customer");
    const api = useApiWithStore();

    const navigate = useNavigate();

    const [form, setForm] = useState<CustomerCreateInput>(initialState);
    const [hasChanges, setHasChanges] = useState(false);
    const [saving, setSaving] = useState(false);
    const [note, setNote] = useState("");

    useUnsavedChangesWarning(hasChanges);

    /* ---------------- Track Unsaved Changes ---------------- */
    useEffect(() => {
        setHasChanges(JSON.stringify(form) !== JSON.stringify(initialState));
    }, [form]);

    /* ---------------- Input Change ---------------- */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    /* ---------------- Save ---------------- */
    const handleSave = async () => {
        setSaving(true);
        try {
            const result = await api.post("/customers/create", { ...form, note });
            setForm(initialState);
            setHasChanges(false);
            toast.success(result.data.message);

            setTimeout(() => {
                navigate(`/customers/${result.data.customer.id}`);
            }, 1000);
        } catch (err: any) {
            toast.error(err.response?.data.message || "Failed to create customer");
            console.error("Failed to create customer", err);
        } finally {
            setSaving(false);
        }
    };

    /* ---------------- Discard ---------------- */
    const handleDiscard = () => {
        navigate("/customers");
    };

    const handleCheckboxChange = (name: string, value: boolean) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="px-4 md:px-64">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/customers"><User className="w-10 h-10 hover:bg-muted cursor-pointer rounded-md p-2" /> </Link>{"> "}
                    <h2 className="font-medium">New Customer</h2>
                </div>
            </div>

            <div className="mt-4 border shadow-xs bg-card rounded-md h-12 w-full flex items-center justify-between gap-2 px-4">
                <div className="flex items-center gap-2">
                    <Info className="w-3 h-3" />
                    <p className="font-medium text-sm text-card-foreground">
                        Unsaved Changes
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs shadow-none"
                        onClick={handleDiscard}
                    >
                        Discard
                    </Button>
                    <Button
                        size="sm"
                        className="text-xs"
                        onClick={handleSave}
                        disabled={saving || !hasChanges}
                    >
                        {saving ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>

            <div className="flex gap-4">
                {/* ---------------- Left Card ---------------- */}
                <div className="w-2/3">
                    <Card className="mt-4 p-0 gap-0 overflow-hidden ">
                        <CardHeader className="p-0  gap-0">
                            <CardTitle className="font-medium text-foreground border-b p-4 m-0 text-sm">
                                Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            <div className="flex gap-4 mt-4">
                                <Field>
                                    <FieldLabel >First Name</FieldLabel>
                                    <FieldContent>
                                        <Input
                                            name="firstName"
                                            value={form.firstName}
                                            onChange={handleChange}
                                            placeholder="Ash"
                                        />
                                    </FieldContent>
                                </Field>

                                <Field>
                                    <FieldLabel >Last Name</FieldLabel>
                                    <FieldContent>
                                        <Input
                                            name="lastName"
                                            value={form.lastName}
                                            onChange={handleChange}
                                            placeholder="Brade"
                                        />
                                    </FieldContent>
                                </Field>
                            </div>

                            <Field className="mt-4">
                                <FieldLabel >Email</FieldLabel>
                                <FieldContent>
                                    <Input
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="me@example.com"
                                    />
                                </FieldContent>
                            </Field>

                            <Field className="mt-4">
                                <FieldLabel >Phone</FieldLabel>
                                <FieldContent>
                                    <Input
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="123-456-7890"
                                    />
                                </FieldContent>
                            </Field>
                            <Field className="mt-4 gap-2" orientation="horizontal">
                                <Checkbox
                                    checked={form.emailMarketing}
                                    onCheckedChange={(checked) =>
                                        handleCheckboxChange("emailMarketing", !!checked)
                                    }
                                />

                                <FieldLabel >
                                    Customer agreed to receive marketing emails
                                </FieldLabel>
                            </Field>
                            <Field orientation="horizontal" className="flex items-center gap-2 mt-2">
                                <Checkbox
                                    checked={form.smsMarketing}
                                    onCheckedChange={(checked) =>
                                        handleCheckboxChange("smsMarketing", !!checked)
                                    }
                                />

                                <FieldLabel >
                                    Customer agreed to receive SMS marketing text messages
                                </FieldLabel>
                            </Field>
                        </CardContent>
                        <CardFooter className="bg-background p-4 py-6 text-xs text-muted-foreground">
                            You should ask your customers for permission before you subscribe them to your marketing emails or SMS.
                        </CardFooter>
                    </Card>

                    <Card className="mt-4 p-0 gap-0 mb-16">
                        <CardHeader className="p-0  gap-0">
                            <CardTitle className="font-medium border-b p-4 m-0 text-sm">
                                Default address
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            <Field className="mt-4">
                                <FieldLabel className="">
                                    Address
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder="123 Main St"
                                    />
                                </FieldContent>
                            </Field>

                            <Field className="mt-4">
                                <FieldLabel >
                                    City
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                    />
                                </FieldContent>
                            </Field>

                            <Field className="mt-4">
                                <FieldLabel >
                                    State
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        name="state"
                                        value={form.state}
                                        onChange={handleChange}
                                        placeholder="State"
                                    />
                                </FieldContent>
                            </Field>

                            <Field className="mt-4">
                                <FieldLabel >
                                    Zip Code
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        name="zipCode"
                                        value={form.zipCode}
                                        onChange={handleChange}
                                        placeholder="Zip Code"
                                    />
                                </FieldContent>
                            </Field>
                        </CardContent>
                    </Card>
                </div>


                {/* ---------------- Right Card ---------------- */}
                <div className="w-1/3">
                    <Card className="mt-4 p-0 gap-0 mb-16">
                        <CardHeader className="p-0  gap-0">
                            <CardTitle className="font-medium border-b p-4 py-2 m-0 text-sm flex items-center justify-between">
                                Notes
                                <NoteDialouge note={note} setNote={setNote} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 py-4">
                            {note ? (
                                <p className="text-sm ">{note}</p>
                            ) : (
                                <p className="text-sm text-muted-foreground">Notes are private and won't be shared with the customer.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
