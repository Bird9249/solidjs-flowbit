import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";
import UserPathName from "./user-path.enum";

export const userRoutes: RouteDefinition[] = [
  {
    path: UserPathName.Index,
    component: lazy(() => import("../pages/User")),
  },
];
