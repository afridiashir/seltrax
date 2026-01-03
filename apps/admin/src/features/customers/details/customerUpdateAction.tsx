import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Loader2 } from "lucide-react";
import { useApiWithStore } from "@/hooks/use-api";
import { useNavigate } from "react-router-dom";
import { EditContactDialog } from './EditContactDialog'
import { EditAddressDialog } from "./EditAddressDialouge";
import { toast } from "sonner";

type CustomerAction =
    | "edit-contact"
    | "edit-address"
    | "delete"
    | null;

export interface CustomerUpdateActionProps {
    open: boolean;
    onClose: () => void;
    customerId?: string;
}

export const CustomerUpdateAction = (customerData: any) => {
    const [action, setAction] = useState<CustomerAction>(null);

    return (
        <>
            {/* DROPDOWN */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="">
                        More actions <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setAction("edit-contact")}>
                            Edit contact information
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setAction("edit-address")}>
                            Edit default address
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => setAction("delete")}
                        >
                            Delete customer
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* DIALOG CONTROLLER */}
            <EditContactDialog
                open={action === "edit-contact"}
                onClose={() => setAction(null)}
                customerData={customerData.customerData}
                customerId={customerData.customerData.id}
            />

            <EditAddressDialog
                open={action === "edit-address"}
                onClose={() => setAction(null)}
                customerData={customerData.customerData}
                customerId={customerData.customerData.id}
            />

            <DeleteCustomerDialog
                open={action === "delete"}
                onClose={() => setAction(null)}
                customerId={customerData.customerData.id}
            />
        </>
    );
};







const DeleteCustomerDialog = ({ open, onClose, customerId }: CustomerUpdateActionProps) => {
    const api = useApiWithStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        await api.delete(`/customers/${customerId}`);
        toast.success("Customer deleted successfully");
        setLoading(false);
        onClose();
        navigate('/customers');
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete customer</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={loading}>{loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Deleting...
                        </span>
                    ) : (
                        "Delete"
                    )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
