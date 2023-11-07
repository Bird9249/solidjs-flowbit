import { useSearchParams } from "@solidjs/router";
import { initDropdowns } from "flowbite";
import { Component, Match, Switch, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { container } from "tsyringe";
import { IPaginated } from "../../../common/interfaces/pagination.interface";
import { IState } from "../../../common/interfaces/state.interface";
import { checkException } from "../../../common/utils/exception";
import ExceptionMessage from "../../../components/state/ExceptionMessage";
import SpinnerLoading from "../../../components/state/SpinnerLoading";
import TablePagination from "../../../components/table/TablePagination";
import { UserPagination } from "../domain/apis/user.api";
import { User } from "../domain/entities/user.entity";
import { GetUserTableCase } from "../domain/use-cases/get-user-table.case";
import UserTable from "./user-table/UserTable";
import UserTableHeader from "./user-table/UserTableHeader";

const UserIndex: Component = () => {
  const useCase = container.resolve(GetUserTableCase);
  const [query, setQuery] = useSearchParams<UserPagination>();
  const [queryParams, setQueryParams] = createSignal<UserPagination>(query);

  const [user, setUser] = createStore<IState<IPaginated<User>>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  if (Object.keys(query).length <= 0) {
    setQuery({ page: "1", limit: "10" });
    setQueryParams((prev) => {
      prev = { page: "1", limit: "10", search: "" };
      return prev;
    });
  }

  async function fetchUser() {
    setUser({ loading: true });

    try {
      const data = await useCase.execute(queryParams());

      setUser({ data });
    } catch (error) {
      const { level, message } = checkException(error);
      setUser({ error: { level, message } });
    } finally {
      setUser({ loading: false });
    }
  }

  onMount(async () => {
    await fetchUser();
    initDropdowns();
  });

  async function onPageChange(page: number) {
    setQuery({ page });
    setQueryParams({ ...query, page: String(page) });

    await fetchUser();

    initDropdowns();
  }

  return (
    <Switch
      fallback={<ExceptionMessage state={user} />}
      children={
        <>
          <Match
            when={user.data}
            children={
              <div
                class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden"
                children={
                  <>
                    <div inline-datepicker data-date="02/25/2022" />
                    <UserTableHeader />
                    <UserTable
                      data={user.data?.data as User[]}
                      loading={user.loading}
                    />
                    <TablePagination
                      itemsPerPage={Number(queryParams().limit)}
                      totalItems={user.data?.total as number}
                      currentPage={Number(queryParams().page)}
                      onPageChange={onPageChange}
                    />
                  </>
                }
              />
            }
          />
          <Match
            when={!user.data && user.loading}
            children={
              <div
                style={{ height: "calc(100vh - 100px)" }}
                class="flex justify-center items-center"
                children={<SpinnerLoading class="flex flex-col items-center" />}
              />
            }
          />
        </>
      }
    />
  );
};

export default UserIndex;
