import { Fragment, lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Link,
  Redirect,
  Route,
  Router,
  RouterProvider,
  Routes,
  Switch,
} from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";
import HomePage from "./pages/HomePage";
import UserCreateForm from "./pages/UserCreateForm";

// const routes: RoutesType = [
//   {
//     path: "/",
//     component: lazy(() => import("./components/buttons/ClearButton")),
//   },
// ];

// export type RoutesType = {
//   name?: string;
//   path?: string;
//   layout?: any;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   component?: any;
// }[];

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "create-user",
    element: <UserCreateForm />,
  },
]);

export default function RenderRoutes() {
  return <RouterProvider router={router} />;
}
