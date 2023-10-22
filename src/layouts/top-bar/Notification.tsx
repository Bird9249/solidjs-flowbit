import { Component } from "solid-js";
import BellIcon from "../../icons/BellIcon";
import EyeIcon from "../../icons/EyeIcon";
import InboxIcon from "../../icons/InboxIcon";

const Notification: Component = () => {
  return (
    <>
      <button
        data-dropdown-toggle="notification-dropdown"
        class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        type="button"
      >
        <span class="sr-only">View notifications</span>
        <BellIcon class="w-6 h-6" />
      </button>

      <div
        class="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700 rounded-xl"
        id="notification-dropdown"
      >
        <div class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300">
          Notifications
        </div>
        <div>
          <a
            href="#"
            class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
          >
            <div class="flex-shrink-0">
              <img
                class="w-11 h-11 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                alt="Bonnie Green avatar"
              />
              <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700">
                <InboxIcon class="w-3 h-3 text-white" />
              </div>
            </div>
            <div class="pl-3 w-full">
              <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                New message from
                <span class="font-semibold text-gray-900 dark:text-white">
                  Bonnie Green
                </span>
                : "Hey, what's up? All set for the presentation?"
              </div>
              <div class="text-xs font-medium text-primary-600 dark:text-primary-500">
                a few moments ago
              </div>
            </div>
          </a>
        </div>
        <a
          href="#"
          class="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline"
        >
          <div class="inline-flex items-center">
            <EyeIcon class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400" />
            View all
          </div>
        </a>
      </div>
    </>
  );
};

export default Notification;
