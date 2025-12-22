import { useAuthStore } from "@/stores/auth.store";
import axios from "axios";

const user = useAuthStore((s: any) => s.user);

export const fetchWithoutStore = axios.create({
    baseURL: "http://localhost:5001",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
    },
});

export const fetchWithStore = axios.create({
    baseURL: "http://localhost:5001",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
        "x-store-id": user.store_id,
    },
});