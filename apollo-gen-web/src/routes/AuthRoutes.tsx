import React, { lazy } from "react";
import Loadable from "../components/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
import { RouteObject } from "react-router-dom";

// render - login
const AuthLogin = Loadable(lazy(() => import("../pages/auth/Login")));
const AuthRegister = Loadable(lazy(() => import("../pages/auth/SignUp")));

// ==============================|| AUTH ROUTING ||============================== //
const AuthRoutes: RouteObject = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "login",
      element: <AuthLogin />,
    },
    {
      path: "register",
      element: <AuthRegister />,
    },
  ],
};

export default AuthRoutes;
