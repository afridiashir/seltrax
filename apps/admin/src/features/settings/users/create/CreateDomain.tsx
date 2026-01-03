import { useEffect, useState } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Pencil } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiWithStore } from "@/hooks/use-api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";



export const ConnectDomainDialogue = () => {
    const [open, setOpen] = useState(false);
    const api = useApiWithStore();
    const [domain, setDomain] = useState("");
    const navigate = useNavigate();


    const handleSave = () => {
        api.post("/domains/create", { domain, isPrimary: true }).then(() => {
            toast.success("Domain connection request sent successfully");
            navigate("/settings/domains");
            setOpen(false);
        }).catch((err) => {
            toast.error(err.response.data.message);
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className=""
                >
                    Connect Existing Domain
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] md:max-w-[500px] p-0 gap-0 overflow-hidden">
                <DialogHeader className="border-b px-3 py-3">
                    <DialogTitle>
                        <p className="text-sm font-semibold">Connect Existing Domain</p>
                    </DialogTitle>
                </DialogHeader>

                <div className="p-3">
                    <Label htmlFor="domain" className="text-xs">Domain</Label>
                    <Input
                        id="domain"
                        className="w-full font-light text-xs mt-2"
                        placeholder="example.com, shop.example.com"
                        value={domain}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDomain(e.target.value)}
                    />
                </div>

                <DialogFooter className="p-3 border-t">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs shadow-none"
                        >
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        size="sm"
                        className="text-xs"
                        disabled={!domain}
                        onClick={handleSave}
                    >
                        Connect
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
