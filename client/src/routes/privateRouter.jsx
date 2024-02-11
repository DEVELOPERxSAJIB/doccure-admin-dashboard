import Create from "../components/Create/Create";
import Layout from "../components/Layout/Layout";
import { Brand } from "../pages/Brand/Brand";
import Category from "../pages/Category/Category";

import Dashboard from "../pages/Dashboard/Dashboard";
import Permission from "../pages/Permission/Permission";
import Product from "../pages/Product/Product";
import Profile from "../pages/Profile/Profile";
import Role from "../pages/Role/Role";
import Tag from "../pages/Tag/Tag";
import User from "../pages/User/User";
import PrivateGuard from "./privateGuard";

// create private router
const privateRouter = [
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateGuard />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/user",
            element: <User />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/role",
            element: <Role />,
          },
          {
            path: "/permission",
            element: <Permission />,
          },
          {
            path: "/brands",
            element: <Brand />,
          },
          {
            path: "/tags",
            element: <Tag />,
          },
          {
            path: "/category",
            element: <Category />,
          },
          {
            path: "/products",
            element: <Product />,
          },
          {
            path: "/product-create",
            element: <Create />,
          },
        ],
      },
    ],
  },
];

// export private router
export default privateRouter;
