import Login from "./pages/Login";
import RedirectIfAuth from "@/app/RedirectIfAuth";
import Register from "./pages/Register";

export default [
  {
    path: "/login",
    element: (
      <RedirectIfAuth>
        <Login />
      </RedirectIfAuth>
    ),
  },
  {
    path: "/register",
    element: (
      <Register />
    ),
  },
];
