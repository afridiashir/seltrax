import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { useMemo } from "react";

const BASE_URL = "http://localhost:5001";

export const useApi = () => {
    const user = useAuthStore((s) => s.user);

    const api = useMemo(() => {
        return axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
                ...(user?.token && {
                    Authorization: `Bearer ${user.token}`,
                }),
                ...(user?.currentStoreId && {
                    "x-store-id": user.currentStoreId,
                }),
            },
        });
    }, [user?.token, user?.currentStoreId]);

    return api;
};

export const useApiWithStore = () => useApi();
export const useApiWithoutStore = () => {
    const user = useAuthStore((s) => s.user);
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${user?.token}`,
        },
    });
};