import { Outlet } from "@solidjs/router";
import { Component } from "solid-js";
import SideBarLayout from "./side-bar/SideBarLayout";
import TopBarLayout from "./top-bar/TopBarLayout";

const MainLayout: Component = () => {
  return (
    <>
      <div class="antialiased bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
        <TopBarLayout />
        <SideBarLayout />
        <main class="p-4 md:ml-64 h-auto pt-20">
          <div class="h-screen w-screen">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default MainLayout;
