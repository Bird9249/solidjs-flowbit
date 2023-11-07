import { useParams } from "@solidjs/router";
import { Component, Match, Show, Switch, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { container } from "tsyringe";
import { IState } from "../../../common/interfaces/state.interface";
import { checkException } from "../../../common/utils/exception";
import ExceptionMessage from "../../../components/state/ExceptionMessage";
import SpinnerLoading from "../../../components/state/SpinnerLoading";
import EditIcon from "../../../icons/EditIcon";
import TrashBinIcon from "../../../icons/TrashBinIcon";
import UserPlaceholderIcon from "../../../icons/UserPlaceholderIcon";
import { User } from "../domain/entities/user.entity";
import { GetOneUserCase } from "../domain/use-cases/get-one-user.case";

const ReadUserPage: Component = () => {
  const useCase = container.resolve(GetOneUserCase);
  const params = useParams();

  const [state, setState] = createStore<IState<User>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  onMount(async () => {
    setState({ loading: true });

    try {
      const data = await useCase.execute(params.id);

      setState({ data });
    } catch (error) {
      const { level, message } = checkException(error);
      setState({ error: { level, message } });
    } finally {
      setState({ loading: false });
    }
  });

  return (
    <Switch
      fallback={<ExceptionMessage state={state} />}
      children={
        <>
          <Match
            when={state.data}
            children={
              <div
                class="mx-auto max-w-6xl py-8 lg:py-16"
                children={
                  <>
                    <div
                      class="mb-4 grid gap-4 px-4 sm:mb-5 sm:grid-cols-3 sm:gap-6 md:gap-12"
                      children={
                        <>
                          <div
                            class="sm:col-span-2"
                            children={
                              <>
                                <div
                                  class="flex items-center mb-4"
                                  children={
                                    <>
                                      <Show
                                        when={state.data?.profile.profileUrl}
                                        fallback={
                                          <UserPlaceholderIcon class="h-16 w-16 rounded-full sm:h-20 sm:w-20 mr-3 text-gray-200 dark:text-gray-700" />
                                        }
                                        children={
                                          <img
                                            class=" h-16 w-16 rounded-full sm:h-20 sm:w-20"
                                            src={state.data?.profile.profileUrl}
                                            alt={state.data?.username}
                                          />
                                        }
                                      />

                                      <div
                                        class="ml-4"
                                        children={
                                          <>
                                            <h2
                                              class="mb-2 flex items-center text-xl font-bold leading-none text-gray-900 sm:text-2xl"
                                              children={
                                                <>
                                                  {state.data?.profile
                                                    .firstName +
                                                    " " +
                                                    state.data?.profile
                                                      .lastName}
                                                </>
                                              }
                                            />
                                            <span
                                              class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                                              children={<>Moderator</>}
                                            />
                                          </>
                                        }
                                      />
                                    </>
                                  }
                                />
                                <dl
                                  children={
                                    <>
                                      <dt
                                        class="mb-2 font-semibold leading-none text-gray-900"
                                        children={<>Username</>}
                                      />
                                      <dd
                                        class="mb-4 font-light text-gray-500 sm:mb-5"
                                        children={<>{state.data?.username}</>}
                                      />
                                      <dt
                                        class="mb-2 font-semibold leading-none text-gray-900"
                                        children={<>Gender</>}
                                      />
                                      <dd
                                        class="font-light text-gray-500"
                                        children={
                                          <>{state.data?.profile.gender}</>
                                        }
                                      />
                                    </>
                                  }
                                />
                              </>
                            }
                          />
                          <dl
                            children={
                              <>
                                <dt
                                  class="mb-2 font-semibold leading-none text-gray-900"
                                  children={<>Email Address</>}
                                />
                                <dd
                                  class="mb-4 font-light text-gray-500 sm:mb-5"
                                  children={<>{state.data?.email}</>}
                                />
                              </>
                            }
                          />
                        </>
                      }
                    />
                    <div
                      class="flex items-center px-4"
                      children={
                        <>
                          <button
                            type="button"
                            class="px-5 py-2.5 text-sm font-medium text-center inline-flex items-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            children={
                              <>
                                <EditIcon class="mr-1 -ml-1 h-5 w-5" />
                                Edit
                              </>
                            }
                          />
                          <button
                            type="button"
                            class="ml-4 px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          >
                            <TrashBinIcon class="w-3.5 h-3.5 text-white mr-2" />
                            Remove
                          </button>
                        </>
                      }
                    />
                  </>
                }
              />
            }
          />
          <Match
            when={!state.data && state.loading}
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

export default ReadUserPage;
