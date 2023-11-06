import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Room from "./components/Room";
import Error from "./components/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <Error />,
  },
  {
    path: "/room/:room",
    element: <Room />,
    errorElement: <Error />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);
