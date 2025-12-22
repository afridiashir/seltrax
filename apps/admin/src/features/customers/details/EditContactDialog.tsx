import { useApiWithStore } from "@/hooks/use-api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";

interface EditContactDialogProps {
    open: boolean;
    onClose: () => void;
    customerData: any;
    customerId: string;
}

export const EditContactDialog = ({
    open,
    onClose,
    customerData,
    customerId,
}: EditContactDialogProps) => {
    const api = useApiWithStore();
    const [form, setForm] = useState(customerData);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    // Reset form every time dialog opens
    useEffect(() => {
        if (open) {
            setForm(customerData);
        }
    }, [open, customerData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (key: string, value: boolean) => {
        setForm((prev: any) => ({ ...prev, [key]: value }));
    };

    const isChanged =
        JSON.stringify(form) !== JSON.stringify(customerData);

    const handleSave = async () => {
        try {
            setSaving(true);

            console.log(form);
            await api.put(`/customers/update/${customerId}`, {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone,
                emailMarketing: form.emailMarketing,
                smsMarketing: form.smsMarketing,
            });

            toast.success("Customer updated successfully");
            setTimeout(() => {
                navigate(0);
            }, 2000);

            onClose(); // ✅ close only on success
        } catch (err) {
            console.log(err);
            toast.error("Failed to update customer");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-white p-0 gap-0">
                <DialogHeader className="border-b px-4 py-3">
                    <DialogTitle className="text-sm font-semibold">
                        Edit contact information
                    </DialogTitle>
                </DialogHeader>

                <div className="p-4 space-y-4">
                    <div className="flex gap-4">
                        <Field>
                            <FieldLabel>First name</FieldLabel>
                            <FieldContent>
                                <Input
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                />
                            </FieldContent>
                        </Field>

                        <Field>
                            <FieldLabel>Last name</FieldLabel>
                            <FieldContent>
                                <Input
                                    name="lastName"
                                    value={form.lastName || ""}
                                    onChange={handleChange}
                                />
                            </FieldContent>
                        </Field>
                    </div>

                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <FieldContent>
                            <Input
                                name="email"
                                value={form.email || ""}
                                onChange={handleChange}
                            />
                        </FieldContent>
                    </Field>

                    <Field>
                        <FieldLabel>Phone</FieldLabel>
                        <FieldContent>
                            <Input
                                name="phone"
                                value={form.phone || ""}
                                onChange={handleChange}
                            />
                        </FieldContent>
                    </Field>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={!!form.emailMarketing}
                            onCheckedChange={(v) =>
                                handleCheckboxChange("emailMarketing", !!v)
                            }
                        />
                        <span className="text-sm text-gray-700">
                            Customer agreed to receive marketing emails
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={!!form.smsMarketing}
                            onCheckedChange={(v) =>
                                handleCheckboxChange("smsMarketing", !!v)
                            }
                        />
                        <span className="text-sm text-gray-700">
                            Customer agreed to receive SMS marketing
                        </span>
                    </div>
                </div>

                <DialogFooter className="border-t px-4 py-3">
                    <Button variant="outline" size="sm" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        disabled={!isChanged || saving}
                        onClick={handleSave}
                    >
                        {saving ? "Saving..." : "Save changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
