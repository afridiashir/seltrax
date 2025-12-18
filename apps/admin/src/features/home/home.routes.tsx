import Home from "./pages/Home";
import { RequireAuth } from "@/app/guard";

const homeRoutes = [
  {
    path: "/home",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
];

export default homeRoutes;
