import { A, useLocation } from "@solidjs/router";
import { Component, For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import AngleDownIcon from "../../icons/AngleDownIcon";
import { ISideBarMenu } from "../interfaces/side-bar.interface";

const SideBarMenu: Component<{ menus: ISideBarMenu[] }> = (props) => {
  const { pathname } = useLocation();

  return (
    <ul class="space-y-2">
      <For each={props.menus}>
        {(menu) => (
          <Show
            when={menu.children}
            fallback={
              <>
                <li>
                  <A
                    activeClass="sidebar-menu-active"
                    href={menu.partName}
                    class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <Dynamic
                      component={menu.icon}
                      class={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
                        pathname === menu.partName
                          ? "text-gray-900 dark:text-white"
                          : ""
                      }`}
                    />
                    <span class="ml-3">{menu.label}</span>
                  </A>
                </li>
              </>
            }
          >
            <li>
              <button
                type="button"
                class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-pages"
                data-collapse-toggle="dropdown-pages"
              >
                <Dynamic
                  component={menu.icon}
                  class={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
                    pathname === menu.partName
                      ? "text-gray-900 dark:text-white"
                      : ""
                  }`}
                />
                <span class="flex-1 ml-3 text-left whitespace-nowrap">
                  {menu.label}
                </span>
                <AngleDownIcon class="w-3 h-3" />
              </button>
              <ul id="dropdown-pages" class="hidden py-2 space-y-2">
                <For each={menu.children}>
                  {(children) => (
                    <li>
                      <A
                        activeClass="sidebar-menu-active"
                        href={children.partName}
                        class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        {children.label}
                      </A>
                    </li>
                  )}
                </For>
              </ul>
            </li>
          </Show>
        )}
      </For>
    </ul>
  );
};

export default SideBarMenu;
