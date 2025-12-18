import { useAuthStore } from "@/stores/auth.store";
import { useStoresStore } from "@/stores/store.store";
import { Navigate } from "react-router-dom";

interface Props {
  children: any;
}

const RedirectIfAuth = ({ children }: Props) => {
  const user = useAuthStore((s) => s.user);
  const store = useStoresStore();

  if (user && store?.stores.length == 0) {
    return <Navigate to="/create-store" replace />;
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }


  return children;
};

export default RedirectIfAuth;
