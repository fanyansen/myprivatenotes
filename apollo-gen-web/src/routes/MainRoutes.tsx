import React, { lazy } from "react";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";
import { RouteObject } from "react-router-dom";

// render - login
const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
const Notes = Loadable(lazy(() => import("../pages/Notes")));

// ==============================|| AUTH ROUTING ||============================== //
const MainRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "dashboard",
      children: [
        {
          path: "default",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "notes",
      element: <Notes />,
    },
  ],
};

export default MainRoutes;
