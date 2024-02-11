import Forgot from "../pages/auth/Forgot/Forgot";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import ResetPassword from "../pages/auth/ResetPassword/ResetPassword";
import PublicGuard from "./PublicGuard";

// create public router
const publicRouter = [
  {
    element: <PublicGuard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/login/:token",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot",
        element: <Forgot />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },
];

// export public router
export default publicRouter;
