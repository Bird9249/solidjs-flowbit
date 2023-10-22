import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";
import AuthPathName from "./auth-path.enum";

export const authRoutes: RouteDefinition[] = [
  {
    path: AuthPathName.Login,
    component: lazy(() => import("../pages/LoginPage")),
  },
  {
    path: AuthPathName.Register,
    component: lazy(() => import("../pages/RegisterPage")),
  },
  {
    path: AuthPathName.ForgotPassword,
    component: lazy(() => import("../pages/ForgotPassword")),
  },
  {
    path: AuthPathName.ResetPassword,
    component: lazy(() => import("../pages/ResetPassword")),
  },
];
