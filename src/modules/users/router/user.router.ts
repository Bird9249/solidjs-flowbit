import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";
import UserPathName from "./user-path.enum";

export const userRoutes: RouteDefinition[] = [
  {
    path: UserPathName.Index,
    component: lazy(() => import("../pages/User")),
  },
  {
    path: UserPathName.Create,
    component: lazy(() => import("../pages/CreateUserPage")),
  },
  {
    path: UserPathName.Detail,
    component: lazy(() => import("../pages/ReadUserPage")),
  },
];
