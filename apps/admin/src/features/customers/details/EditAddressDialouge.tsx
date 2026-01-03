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
import { useNavigate } from "react-router-dom";

interface EditAddressDialogProps {
    open: boolean;
    onClose: () => void;
    customerData: any;
    customerId: string;
}

export const EditAddressDialog = ({
    open,
    onClose,
    customerData,
    customerId,
}: EditAddressDialogProps) => {
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
                address: form.address,
                city: form.city,
                state: form.state,
                zipCode: form.zipCode,
            });

            toast.success("Customer updated successfully");
            setTimeout(() => {
                navigate(0);
            }, 1000);

            onClose(); // ✅ close only on success
        } catch (err) {
            console.log(err);
            toast.error("Failed to update customer");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose} >
            <DialogContent className="sm:max-w-[500px] p-0 gap-0" >
                <DialogHeader className="border-b px-4 py-3" >
                    <DialogTitle className="text-sm font-semibold" >
                        Edit contact information
                    </DialogTitle>
                </DialogHeader>

                < div className="p-4" >

                    <Field className="">
                        <FieldLabel className="text-sm">
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
                        <FieldLabel className=" text-sm">
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
                        <FieldLabel className=" text-sm">
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
                        <FieldLabel className=" text-sm">
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
                </div>

                < DialogFooter className="border-t px-4 py-3" >
                    <Button variant="outline" size="sm" onClick={onClose} >
                        Cancel
                    </Button>
                    < Button
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
