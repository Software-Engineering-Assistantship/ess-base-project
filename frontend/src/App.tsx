import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import CreateUser from "./app/home/pages/CreateUser";
import ListUsers from "./app/home/pages/ListUsers";
import UpdateUser from "./app/home/pages/UpdateUser";

const router = createBrowserRouter([
  {
    path: "*",
    Component: CreateTest,
  },
  {
    path: "/create-test",
    Component: CreateTest,
  },
  {
    path: "/tests",
    Component: ListTests,
  },
  {
    path: "/create-user",
    Component: CreateUser,
  },
  {
    path: "/users",
    Component: ListUsers,
  },
  {
    path: "/update-user/:id",
    Component: UpdateUser,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
