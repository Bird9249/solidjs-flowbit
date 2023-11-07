import { SubmitHandler, createForm, valiForm } from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { Component, Show, createSignal } from "solid-js";
import { container } from "tsyringe";
import InputPassword from "../../../components/form/InputPassword";
import InputText from "../../../components/form/InputText";
import Select from "../../../components/form/Select";
import ExceptionMessage from "../../../components/state/ExceptionMessage";
import LoadingSpinnerIcon from "../../../icons/LoadingSpinnerIcon";
import { useMessage } from "../../../layouts/MessageContext";
import { Gender } from "../domain/entities/profile.entity";
import { CreateUserCase } from "../domain/use-cases/create-user.case";
import { CreateUserForm, TCreateUserForm } from "../form/create-user.form";
import UserPathName from "../router/user-path.enum";
import AvatarForm from "./user-form/AvatarForm";

const CreateUserPage: Component = () => {
  const [messageModel, {setMessage}] = useMessage();
  
  const useCase = container.resolve(CreateUserCase);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = createSignal<boolean>(false);
  const [error, setError] = createSignal<string>("");
  const [avatar, setAvatar] = createSignal<File>();

  const onSelectFile = (file?: File) => {
    if (file) {
      setAvatar(file);
    } else {
      setAvatar(undefined);
    }
  };

  const [, { Form, Field }] = createForm<TCreateUserForm>({
    validate: valiForm(CreateUserForm),
  });

  const handleSubmit: SubmitHandler<TCreateUserForm> = async (
    values,
    event
  ) => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      setError("The passwords do not match");
      return;
    } else {
      setError("");
    }

    if (avatar()) values.profileImage = avatar();

    setIsLoading(true);

    try {
      await useCase.execute(values);
      messageModel.toggle();
      setMessage("Successfully created user.");

      navigate(UserPathName.Index);
    } catch (error: unknown) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      class="py-8 px-4 mx-auto max-w-2xl lg:py-16"
      children={
        <>
          <Show
            when={error()}
            children={
              <ExceptionMessage
                state={{
                  error: { level: "error", message: error() },
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
                  children={<>Add a new user</>}
                />
                <div
                  class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-8"
                  children={
                    <>
                      <div
                        class="sm:col-span-2"
                        children={<AvatarForm onSelectFile={onSelectFile} />}
                      />
                      <Field
                        name="firstName"
                        children={(field, props) => (
                          <InputText
                            label="First Name"
                            {...props}
                            value={field.value}
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
                            value={field.value}
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
                            value={field.value}
                            placeholder="Choose your gender"
                            options={[
                              { label: "male", value: Gender.Male },
                              { label: "female", value: Gender.Female },
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
                            value={field.value}
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
                            value={field.value}
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
                  disabled={isLoading()}
                  children={
                    isLoading() ? (
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
  );
};

export default CreateUserPage;
