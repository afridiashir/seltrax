import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

import authRoutes from "@/features/auth/auth.routes";
import productRoutes from "@/features/products/product.routes";
import homeRoutes from "@/features/home/home.routes";
import RootRedirect from "@/app/RootRedirect";
import NotFound from "./NotFound";
import storeRoutes from "@/features/store/store.routes";

export const router = createBrowserRouter([
  ...authRoutes,
  ...storeRoutes,
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <RootRedirect />,
      },
      ...homeRoutes,
      ...productRoutes,
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },

]);
