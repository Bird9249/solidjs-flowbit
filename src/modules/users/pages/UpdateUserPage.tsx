import { SubmitHandler, createForm, valiForm } from "@modular-forms/solid";
import { useNavigate, useParams } from "@solidjs/router";
import { Component, Match, Show, Switch, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { container } from "tsyringe";
import { IState } from "../../../common/interfaces/state.interface";
import { checkException } from "../../../common/utils/exception";
import InputPassword from "../../../components/form/InputPassword";
import InputText from "../../../components/form/InputText";
import Select from "../../../components/form/Select";
import ExceptionMessage from "../../../components/state/ExceptionMessage";
import SpinnerLoading from "../../../components/state/SpinnerLoading";
import LoadingSpinnerIcon from "../../../icons/LoadingSpinnerIcon";
import { useMessage } from "../../../layouts/MessageContext";
import { Gender } from "../domain/entities/profile.entity";
import { User } from "../domain/entities/user.entity";
import { ChangeProfileImageCase } from "../domain/use-cases/change-profile-image.case";
import { GetOneUserCase } from "../domain/use-cases/get-one-user.case";
import { UpdateUserCase } from "../domain/use-cases/update-user.case";
import { TUpdateUserForm, UpdateUserForm } from "../form/update-user.form";
import UserPathName from "../router/user-path.enum";
import AvatarForm from "./user-form/AvatarForm";

const UpdateUserPage: Component = () => {
  const [messageModel, { setMessage }] = useMessage();
  const getOneCase = container.resolve(GetOneUserCase);
  const changeProfileImageCase = container.resolve(ChangeProfileImageCase);
  const updateUserCase = container.resolve(UpdateUserCase);
  const params = useParams();
  const navigate = useNavigate();

  const [state, setState] = createStore<IState<User>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  onMount(async () => {
    setState({ loading: true });

    try {
      const data = await getOneCase.execute(params.id);

      setState({ data });
    } catch (error) {
      const { level, message } = checkException(error);
      setState({ error: { level, message } });
    } finally {
      setState({ loading: false });
    }
  });

  const [, { Form, Field }] = createForm<TUpdateUserForm>({
    validate: valiForm(UpdateUserForm),
  });

  const onSelectFile = async (file?: File) => {
    if (file) {
      setState({ loading: true });

      try {
        const user = await changeProfileImageCase.execute({
          id: state.data?.profile.id as string,
          file,
        });

        setState({ data: user });
      } catch (error) {
        const { level, message } = checkException(error);
        setState({ error: { level, message } });
      } finally {
        setState({ loading: false });
      }
    } else {
      return;
    }
  };

  const handleSubmit: SubmitHandler<TUpdateUserForm> = async (
    values,
    event
  ) => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      setState({
        error: { message: "The passwords do not match", level: "error" },
      });
      return;
    } else {
      setState({ error: undefined });
    }

    setState({ loading: true });

    try {
      await updateUserCase.execute({ id: params.id, form: values });
      messageModel.toggle();
      setMessage("Successfully updated user.");

      navigate(UserPathName.Index);
    } catch (error: unknown) {
      setState({
        error: { message: (error as Error).message, level: "error" },
      });
    } finally {
      setState({ loading: false });
    }
  };

  return (
    <Switch
      fallback={<ExceptionMessage state={state} />}
      children={
        <>
          <Match
            when={state.data}
            children={
              <div
                class="py-8 px-4 mx-auto max-w-2xl lg:py-16"
                children={
                  <>
                    <Show
                      when={state.error}
                      children={
                        <ExceptionMessage
                          state={{
                            error: {
                              level: state.error?.level as "error" | "warn",
                              message: state.error?.message as string,
                            },
                            data: [],
                            loading: false,
                          }}
                        />
                      }
                    />
                    <Form
                      onSubmit={handleSubmit}
                      children={
                        <>
                          <h2
                            class="mb-4 text-xl font-bold text-gray-900 dark:text-white"
                            children={<>Edit a new user</>}
                          />
                          <div
                            class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-8"
                            children={
                              <>
                                <div
                                  class="sm:col-span-2"
                                  children={
                                    <AvatarForm
                                      onSelectFile={onSelectFile}
                                      value={state.data?.profile.profileUrl}
                                    />
                                  }
                                />
                                <Field
                                  name="firstName"
                                  children={(field, props) => (
                                    <InputText
                                      label="First Name"
                                      {...props}
                                      value={state.data?.profile.firstName}
                                      error={field.error}
                                      placeholder="First Name"
                                    />
                                  )}
                                />
                                <Field
                                  name="lastName"
                                  children={(field, props) => (
                                    <InputText
                                      label="Last Name"
                                      {...props}
                                      value={state.data?.profile.lastName}
                                      error={field.error}
                                      placeholder="Last Name"
                                    />
                                  )}
                                />
                                <Field
                                  name="gender"
                                  children={(field, props) => (
                                    <Select
                                      {...props}
                                      label="Gender"
                                      error={field.error}
                                      value={state.data?.profile.gender}
                                      placeholder="Choose your gender"
                                      options={[
                                        { label: "male", value: Gender.Male },
                                        {
                                          label: "female",
                                          value: Gender.Female,
                                        },
                                        { label: "other", value: Gender.Other },
                                      ]}
                                    />
                                  )}
                                />
                                <Field
                                  name="email"
                                  children={(field, props) => (
                                    <InputText
                                      label="Email"
                                      {...props}
                                      value={state.data?.email}
                                      error={field.error}
                                      placeholder="name@company.com"
                                    />
                                  )}
                                />
                                <Field
                                  name="username"
                                  children={(field, props) => (
                                    <InputText
                                      label="Username"
                                      {...props}
                                      value={state.data?.username}
                                      error={field.error}
                                      placeholder="Username"
                                    />
                                  )}
                                />
                                <div />
                                <Field
                                  name="password"
                                  children={(field, props) => (
                                    <InputPassword
                                      label="Password"
                                      {...props}
                                      value={field.value}
                                      error={field.error}
                                      placeholder="••••••••"
                                    />
                                  )}
                                />
                                <Field
                                  name="confirmPassword"
                                  children={(field, props) => (
                                    <InputPassword
                                      label="Confirm password"
                                      {...props}
                                      value={field.value}
                                      error={field.error}
                                      placeholder="••••••••"
                                    />
                                  )}
                                />
                              </>
                            }
                          />
                          <button
                            type="submit"
                            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                            disabled={state.loading}
                            children={
                              state.loading ? (
                                <>
                                  <LoadingSpinnerIcon class="inline w-4 h-4 mr-3 text-white animate-spin" />{" "}
                                  Loading...
                                </>
                              ) : (
                                <>Add user</>
                              )
                            }
                          />
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

export default UpdateUserPage;
