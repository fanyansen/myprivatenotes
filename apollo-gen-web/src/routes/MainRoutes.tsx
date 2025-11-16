import React, { lazy } from "react";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";
import { RouteObject } from "react-router-dom";

// render
const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
const Notes = Loadable(lazy(() => import("../pages/Notes")));
const UpsertNote = Loadable(lazy(() => import("../pages/Notes/UpsertForm")));

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
      children: [
        {
          path: "",
          element: <Notes />,
        },
        {
          path: "new",
          element: <UpsertNote />,
        },
        {
          path: "edit/:id",
          element: <UpsertNote />,
        },
      ],
    },
    {
      path: "*",
      element: <div>404 Not Found</div>,
    },
  ],
};

export default MainRoutes;
