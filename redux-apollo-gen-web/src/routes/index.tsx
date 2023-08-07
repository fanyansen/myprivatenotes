import { useRoutes } from "react-router-dom";

// route tree imports
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";

export default function Routes() {
  return useRoutes([MainRoutes, AuthRoutes]);
}
