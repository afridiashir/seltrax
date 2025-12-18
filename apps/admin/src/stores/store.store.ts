import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Store {
    id: string;
    name: string;
    domain?: string;
    logoUrl?: string;
    plan?: "free" | "basic" | "pro";
}

interface StoresState {
    stores: Store[];
    loading: boolean;

    setStores: (stores: Store[]) => void;
    addStore: (store: Store) => void;
    removeStore: (storeId: string) => void;
    clearStores: () => void;
}

export const useStoresStore = create<StoresState>()(
    persist(
        (set) => ({
            stores: [],
            loading: false,

            setStores: (stores) => set({ stores }),

            addStore: (store) =>
                set((state) => ({
                    stores: [...state.stores, store],
                })),

            removeStore: (storeId) =>
                set((state) => ({
                    stores: state.stores.filter((s) => s.id !== storeId),
                })),

            clearStores: () => set({ stores: [] }),
        }),
        {
            name: "stores-storage",
        }
    )
);
