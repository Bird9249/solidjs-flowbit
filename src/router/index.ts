import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";
import { authRoutes } from "../modules/users/modules/auth/router/auth.router";
import PathName from "./path.enum";

const routes: RouteDefinition[] = [
  {
    path: PathName.Main,
    component: lazy(() => import("../layouts/MainLayout")),
    children: [
      {
        path: PathName.Dashboard,
        component: lazy(() => import("../modules/pages/HomePage")),
      },
      {
        path: PathName.Setting,
        component: lazy(() => import("../modules/pages/SettingPage")),
      },
    ],
  },
  ...authRoutes,
];

export default routes;
