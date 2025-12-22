import CustomerList from "./list/CustomerList";
import { RequireAuth } from "@/app/guard";
import { CustomerNew } from "./create/CustomerNew";
import CustomerDetail from "./details/CustomerDetail";

const customerRoutes = [
    {
        path: "/customers",
        element: (
            <RequireAuth>
                <CustomerList />
            </RequireAuth>
        ),
    },
    {
        path: "/customers/new",
        element: (
            <RequireAuth>
                <CustomerNew />
            </RequireAuth>
        ),
    },
    {
        path: "/customers/:id",
        element: (
            <RequireAuth>
                <CustomerDetail />
            </RequireAuth>
        ),
    }
];

export default customerRoutes;