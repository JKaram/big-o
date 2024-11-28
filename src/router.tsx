import { createBrowserRouter } from "react-router";
import App from "./App";
import Dfs from "./pages/Dfs";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/dfs", element: <Dfs /> },
]);
