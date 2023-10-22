import { type Component } from "solid-js";

import { useRoutes } from "@solidjs/router";
import "flowbite";
import routes from "./router";

const App: Component = () => {
  const Routes = useRoutes(routes);

  return <Routes />;
};

export default App;
