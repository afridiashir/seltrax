
import { RequireAuth } from "@/app/guard";
import CreateStore from "./pages/CreateStore";

const productRoutes = [
    {
        path: "/create-store",
        element: (
            <RequireAuth>
                <CreateStore />
            </RequireAuth>
        ),
    },
];

export default productRoutes;