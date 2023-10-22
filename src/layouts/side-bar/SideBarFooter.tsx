import { Component } from "solid-js";
import ArrowLeftToBracketIcon from "../../icons/ArrowLeftToBracketIcon";

const SideBarFooter: Component = () => {
  return (
    <div class="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20">
      <button
        type="button"
        data-tooltip-target="tooltip-settings"
        class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        <ArrowLeftToBracketIcon class="w-6 h-6" />
      </button>
      <div
        id="tooltip-settings"
        role="tooltip"
        class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
      >
        Logout
        <div class="tooltip-arrow" data-popper-arrow />
      </div>
    </div>
  );
};

export default SideBarFooter;
