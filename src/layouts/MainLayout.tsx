import { Outlet } from "@solidjs/router";
import { initFlowbite } from "flowbite";
import { Component, onMount } from "solid-js";
import { MessageProvider } from "./MessageContext";
import SideBarLayout from "./side-bar/SideBarLayout";
import TopBarLayout from "./top-bar/TopBarLayout";

const MainLayout: Component = () => {
  onMount(() => {
    initFlowbite();
  });

  return (
    <>
      <MessageProvider>
        <div class="antialiased bg-gray-50 dark:bg-gray-900 overflow-x-hidden h-screen">
          <TopBarLayout />
          <SideBarLayout />
          <main class="p-4 md:ml-64 h-auto pt-20">
            <Outlet />
          </main>
        </div>
      </MessageProvider>
    </>
  );
};

export default MainLayout;
