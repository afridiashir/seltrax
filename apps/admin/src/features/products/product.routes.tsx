import ProductList from "./pages/ProductList";
import { RequireAuth } from "@/app/guard";

const productRoutes = [
    {
        path: "/products",
        element: (
            <RequireAuth>
                <ProductList />
            </RequireAuth>
        ),
    },
];

export default productRoutes;