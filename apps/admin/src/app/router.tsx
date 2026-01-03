import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

import authRoutes from "@/features/auth/auth.routes";
import productRoutes from "@/features/products/product.routes";
import homeRoutes from "@/features/home/home.routes";
import RootRedirect from "@/app/RootRedirect";
import NotFound from "./NotFound";
import storeRoutes from "@/features/store/store.routes";
import customerRoutes from "@/features/customers/customers.routes";
import settingsRoutes from "@/features/settings/settings.routes";

export const router = createBrowserRouter([
  ...authRoutes,
  ...storeRoutes,
  ...settingsRoutes,
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
      ...customerRoutes,
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },

]);
