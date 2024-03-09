import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateUser from "./app/home/pages/CreateUser";
import UpdateUser from "./app/home/pages/UpdateUser";
import HomePage from "./app/home/pages/HomePage";
import UserProfile from "./app/home/pages/UserProfile";
import Login from "./app/home/pages/Login";
import Logout from "./app/home/pages/Logout";

const router = createBrowserRouter([
  {
    path: "*",
    Component: HomePage,
  },
  {
    path: "/home",
    Component: HomePage,
  },
  {
    path: "/create-user",
    Component: CreateUser,
  },
  {
    path: "/update-user/:id",
    Component: UpdateUser,
  },
  {
    path: "/profile/:id",
    Component: UserProfile
  },
  {
    path: "/login",
    Component: Login
  },
  {
    path: "/logout/:id",
    Component: Logout
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
