import { Component } from "solid-js";
import GlobalSearch from "./GlobalSearch";
import Logo from "./Logo";
import Notification from "./Notification";
import ToggleSearch from "./ToggleSearch";
import ToggleSidebar from "./ToggleSidebar";
import UserMenu from "./UserMenu.";

const TopBarLayout: Component = () => {
  return (
    <>
      <nav class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div class="flex flex-wrap justify-between items-center">
          <div class="flex justify-start items-center">
            <ToggleSidebar />
            <Logo />
            <GlobalSearch />
          </div>
          <div class="flex items-center lg:order-2">
            <ToggleSearch />
            <Notification />
            <UserMenu />
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopBarLayout;
