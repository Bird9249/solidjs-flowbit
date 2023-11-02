import { useSearchParams } from "@solidjs/router";
import { initDropdowns } from "flowbite";
import "reflect-metadata";
import { Component, Show, createResource, createSignal } from "solid-js";
import { container } from "tsyringe";
import SpinnerLoading from "../../../components/loading/SpinnerLoading";
import TablePagination from "../../../components/table/TablePagination";
import { UserApiMemory } from "../apis/memory/user.api";
import { UserPagination } from "../domain/apis/user.api";
import { User } from "../domain/entities/user.entity";
import UserTable from "./user-table/UserTable";
import UserTableHeader from "./user-table/UserTableHeader";

const UserIndex: Component = () => {
  const api = container.resolve(UserApiMemory);
  const [query, setQuery] = useSearchParams<UserPagination>();
  const [queryParams, setQueryParams] = createSignal<UserPagination>(query);

  if (Object.keys(query).length <= 0) {
    setQuery({ page: "1", limit: "10" });
    setQueryParams((prev) => {
      prev = { page: "1", limit: "10", search: "" };
      return prev;
    });
  }

  const [user] = createResource(queryParams, api.getPagination);

  async function onPageChange(page: number) {
    setQuery({ page });
    setQueryParams({ ...query, page: String(page) });
    initDropdowns();
  }

  return (
    <Show
      when={user()}
      fallback={
        <div
          style={{ height: "calc(100vh - 100px)" }}
          class="flex justify-center items-center"
        >
          <SpinnerLoading class="flex flex-col items-center" />
        </div>
      }
      children={
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <UserTableHeader />
          <UserTable data={user()?.data as User[]} loading={user.loading} />
          <TablePagination
            itemsPerPage={Number(queryParams().limit)}
            totalItems={user()?.total as number}
            currentPage={Number(queryParams().page)}
            onPageChange={onPageChange}
          />
        </div>
      }
    />
  );
};

export default UserIndex;
