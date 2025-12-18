import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

export const RequireAuth = ({ children }: any) => {
  const user = useAuthStore((s:any) => s.user);
  if (!user) return <Navigate to="/login" />;
  return children;
};
