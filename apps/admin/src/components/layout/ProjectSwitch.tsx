import React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Store as StoreIcon } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useStoresStore } from "@/stores/store.store";
import { useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";

export const StoreSwitcher: React.FC = () => {
    const { user, setCurrentStore } = useAuthStore();
    const { stores } = useStoresStore();
    const navigate = useNavigate();

    const activeStore = stores.find((s) => s.id === user?.currentStoreId);

    const handleSwitchStore = (storeId: string) => {
        setCurrentStore(storeId);
    };

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center justify-between gap-2 shadow-xs font-normal">
                    <div className="flex items-center gap-2">
                        <StoreIcon className="h-6 w-6" />
                        <span className="hidden md:block">{activeStore?.name ?? "Select Store"}</span>
                    </div>
                    <ChevronDown className="h-6 w-6 opacity-60 hidden md:block" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-56">
                {stores.map((store) => (
                    <DropdownMenuItem
                        key={store.id}
                        onClick={() => handleSwitchStore(store.id)}
                        className={store.id === user?.currentStoreId ? "font-regular" : ""}
                    >
                        {store.name}
                    </DropdownMenuItem>
                ))}
                <Separator />
                <DropdownMenuItem
                    onClick={() => navigate("/create-store")}
                >
                    <Button className="w-full">Create new store</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
