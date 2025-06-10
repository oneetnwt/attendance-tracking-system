import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Admin from "./Admin";
import AddUser from "./Pages/AddUser";

function Route() {
  const routes = new createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default Route;
