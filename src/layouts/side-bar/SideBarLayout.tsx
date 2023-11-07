import { Component } from "solid-js";
import ChartPieIcon from "../../icons/ChartPieIcon";
import FileIcon from "../../icons/FileIcon";
import PathName from "../../router/path.enum";
import { ISideBarMenu } from "../interfaces/side-bar.interface";
import GlobalSearchSidebar from "./GlobalSearchSidebar";
import SideBarFooter from "./SideBarFooter";
import SideBarMenu from "./SideBarMenu";

const SideBarLayout: Component = () => {
  const menus: ISideBarMenu[] = [
    { label: "Overview", icon: ChartPieIcon, partName: PathName.Dashboard },
    {
      label: "Pages",
      icon: FileIcon,
      partName: PathName.Pages,
      children: [
        { label: "Settings", partName: PathName.Setting },
        { label: "Kanban", partName: PathName.Kanban },
        { label: "Calendar", partName: PathName.Calendar },
      ],
    },
  ];

  return (
    <aside
      class="fixed top-0 left-0 z-30 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <GlobalSearchSidebar />
        <SideBarMenu menus={menus} />
      </div>
      <SideBarFooter />
    </aside>
  );
};

export default SideBarLayout;
