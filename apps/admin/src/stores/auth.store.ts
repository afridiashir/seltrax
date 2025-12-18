import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  id?: string;
  name: string;
  email: string;
  token: string;
  currentStoreId: string | null;
}

interface AuthState {
  user: AuthUser | null;

  login: (user: AuthUser) => void;
  logout: () => void;

  setCurrentStore: (storeId: string) => void;
  updateUser: (data: Partial<AuthUser>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      login: (user) => set({ user }),

      logout: () => set({ user: null }),

      setCurrentStore: (storeId) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, currentStoreId: storeId }
            : null,
        })),

      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
