import { Component } from "solid-js";
import UserAddIcon from "../../../../icons/UserAdd";

const UserTableHeader: Component = () => {
  return (
    <div class="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
      <div>
        <h5 class="mr-3 font-semibold dark:text-white">Flowbite Users</h5>
        <p class="text-gray-500 dark:text-gray-400">
          Manage all your existing users or add a new one
        </p>
      </div>
      <button
        type="button"
        class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      >
        <UserAddIcon class="h-3.5 w-3.5 mr-2 -ml-1" />
        Add new user
      </button>
    </div>
  );
};

export default UserTableHeader;
