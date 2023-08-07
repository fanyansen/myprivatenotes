import React, { lazy } from "react";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";
import { RouteObject } from "react-router-dom";

// render - login
const Dashboard = Loadable(lazy(() => import("../features/Dashboard")));

// ==============================|| AUTH ROUTING ||============================== //
const MainRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
  ],
};

export default MainRoutes;
