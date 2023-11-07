import { Component, For, Show, createEffect } from "solid-js";
import DotsHorizontalIcon from "../../../../icons/DotsHorizontalIcon";
import UserPlaceholderIcon from "../../../../icons/UserPlaceholderIcon";
import { Gender } from "../../domain/entities/profile.entity";
import { User } from "../../domain/entities/user.entity";

const UserTable: Component<{ data: User[]; loading: boolean }> = (props) => {
  createEffect(() => {
    props.data;
  });

  function badgeGender(gender: Gender) {
    return (
      <span
        class={`bg-blue-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${
          gender === Gender.Male
            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            : gender === Gender.Female
            ? "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }`}
      >
        {gender}
      </span>
    );
  }

  const tableHead = (
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-4 py-4">
          USER
        </th>
        <th scope="col" class="px-4 py-3">
          GENDER
        </th>
        <th scope="col" class="px-4 py-3">
          EMAIL
        </th>
        <th scope="col" class="px-4 py-3">
          VERIFY At
        </th>
        <th scope="col" class="px-4 py-3">
          <span class="sr-only">Actions</span>
        </th>
      </tr>
    </thead>
  );

  const tableBodyLoading = (
    <tbody>
      <For
        each={Array.from({ length: 10 })}
        children={() => (
          <tr class="border-b dark:border-gray-700">
            <th
              scope="row"
              class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <div class="flex items-center space-x-3">
                <UserPlaceholderIcon class="w-8 h-8 text-gray-200 dark:text-gray-700" />
                <div>
                  <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-44" />
                </div>
              </div>
            </th>
            <For
              each={Array.from({ length: 3 })}
              children={(data, i) => (
                <td class="px-4 py-3">
                  <div
                    class={`bg-gray-200 rounded-md dark:bg-gray-700 ${
                      i() === 0 ? "h-3.5 w-16" : "h-3 w-48"
                    }`}
                  />
                </td>
              )}
            />
          </tr>
        )}
      />
    </tbody>
  );

  const tableBody = (
    <tbody>
      <For each={props.data}>
        {(data) => (
          <tr class="border-b dark:border-gray-700">
            <th
              scope="row"
              class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <div class="items-center flex">
                <Show
                  when={data.profile.profileUrl}
                  fallback={
                    <UserPlaceholderIcon class="w-8 h-8 mr-3 text-gray-200 dark:text-gray-700" />
                  }
                  children={
                    <img
                      src={data.profile.profileUrl}
                      alt={data.profile.firstName + " " + data.profile.lastName}
                      class="rounded-full w-auto h-8 mr-3"
                    />
                  }
                />
                {data.profile.firstName} {data.profile.lastName}
              </div>
            </th>

            <td class="px-4 py-3">
              {data.profile ? badgeGender(data.profile.gender) : "Empty data"}
            </td>

            <td class="px-4 py-3">{data.email}</td>

            <td class="px-4 py-3">
              {data.verifyAt
                ? new Date(data.verifyAt).toDateString()
                : "Empty data"}
            </td>

            <td class="px-4 py-3 flex items-center justify-end">
              <button
                id={`${data.username}-dropdown-button`}
                data-dropdown-toggle={`${data.username}-dropdown`}
                class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                type="button"
              >
                <DotsHorizontalIcon class="w-5 h-5" />
              </button>
              <div
                id={`${data.username}-dropdown`}
                class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  class="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby={`${data.username}-dropdown-button`}
                >
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Show
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </li>
                </ul>
                <div class="py-1">
                  <a
                    href="#"
                    class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Delete
                  </a>
                </div>
              </div>
            </td>
          </tr>
        )}
      </For>
    </tbody>
  );

  return (
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {tableHead}
        <Show
          when={!props.loading}
          fallback={tableBodyLoading}
          children={tableBody}
        />
      </table>
    </div>
  );
};

export default UserTable;
