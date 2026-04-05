import React, { useContext } from "react";
import App from "../App";
import Home from "../pages/Home";
import Users from "../pages/Users";
import AddCategory from "../pages/AddCategory";
import Foods from "../pages/Foods";
import FoodDetail from "../pages/FoodDetail";
import FoodForm from "../pages/FoodForm";
import Register from "../pages/Register";
import Login from "../pages/Login";

import { AuthContext } from "../contexts/AuthContext";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

export default function Router() {

  const { authReady, user } = useContext(AuthContext);
  const isAuthenticated = !!user;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: isAuthenticated ? <Home /> : <Navigate to="/login" /> },
        { path: "users", element: isAuthenticated ? <Users /> : <Navigate to="/login" /> },
        { path: "addcategory", element: isAuthenticated ? <AddCategory /> : <Navigate to="/login" /> },
        { path: "foods", element: isAuthenticated ? <Foods /> : <Navigate to="/login" /> },
        { path: "fooddetail/:id", element: isAuthenticated ? <FoodDetail /> : <Navigate to="/login" /> },
        { path: "create", element: isAuthenticated ? <FoodForm /> : <Navigate to="/login" /> },
        { path: "edit/:id", element: isAuthenticated ? <FoodForm /> : <Navigate to="/login" /> },
        { path: "register", element: !isAuthenticated ? <Register /> : <Navigate to="/" /> },
        { path: "login", element: !isAuthenticated ? <Login /> : <Navigate to="/" /> },
      ]
    }
  ]);

  return authReady ? <RouterProvider router={router} /> : <p>Loading...</p>;
}