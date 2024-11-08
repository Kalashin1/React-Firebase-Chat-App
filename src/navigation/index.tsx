import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/login";
import { SCREENS } from "./constants";
import CreateAccount from "../pages/auth/register";
import DashBoard from "../pages/dashboard";

export const Router = createBrowserRouter([
  {
    index: true,
    element: <LoginPage />,
  },
  {
    path: SCREENS.LOGIN,
    element: <LoginPage />,
  },
  {
    path: SCREENS.REGISTER,
    element: <CreateAccount />,
  },
  {
    path: SCREENS.HOME,
    element: <DashBoard />,
  },
]);
