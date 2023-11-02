/* eslint-disable solid/jsx-no-script-url */
/* eslint-disable solid/reactivity */
import { Component, createSignal } from "solid-js";

const Table: Component<{
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}> = (props) => {
  const aClass =
    "flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  const aActiveClass =
    "flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";

  const itemsPerPage = props.itemsPerPage;
  const totalItems = props.totalItems;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = createSignal<number>(props.currentPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
    props.onPageChange(newPage);
  };

  const renderPageLinks = () => {
    const pageLinks = [];
    const maxVisibleLinks = 1;
    const halfMaxVisibleLinks = Math.floor(maxVisibleLinks / 2);

    pageLinks.push(1);

    if (totalPages <= maxVisibleLinks) {
      for (let i = 2; i <= totalPages; i++) {
        pageLinks.push(i);
      }
    } else {
      if (currentPage() > halfMaxVisibleLinks + 2) {
        pageLinks.push("...");
      }

      for (
        let i = Math.max(2, currentPage() - halfMaxVisibleLinks);
        i <= Math.min(totalPages - 1, currentPage() + halfMaxVisibleLinks);
        i++
      ) {
        pageLinks.push(i);
      }

      if (currentPage() + halfMaxVisibleLinks < totalPages - 1) {
        pageLinks.push("...");
      }

      pageLinks.push(totalPages);
    }

    return pageLinks.map((page) => (
      <li>
        {page === "..." ? (
          <span class={aClass}>...</span>
        ) : (
          <a
            href="javascript:void(0)"
            onClick={() => handlePageChange(page as number)}
            class={currentPage() === page ? aActiveClass : aClass}
          >
            {page}
          </a>
        )}
      </li>
    ));
  };

  return (
    <nav
      class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing{" "}
        <span class="font-semibold text-gray-900 dark:text-white">
          {(currentPage() - 1) * itemsPerPage + 1}-
          {Math.min(currentPage() * itemsPerPage, totalItems)}{" "}
        </span>
        of{" "}
        <span class="font-semibold text-gray-900 dark:text-white">
          {totalItems}{" "}
        </span>
      </span>
      <ul class="inline-flex items-stretch -space-x-px">
        <li>
          <a
            href="javascript:void(0)"
            onClick={() => {
              if (currentPage() > 1) {
                handlePageChange(currentPage() - 1);
              }
            }}
            class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </li>
        {renderPageLinks()}
        <li>
          <a
            onClick={() => {
              if (currentPage() < totalPages) {
                handlePageChange(currentPage() + 1);
              }
            }}
            href="javascript:void(0)"
            class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Next</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Table;
