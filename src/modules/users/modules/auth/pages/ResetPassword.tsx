import { SubmitHandler, createForm, valiForm } from "@modular-forms/solid";
import { Component } from "solid-js";
import InputText from "../../../../../components/form/InputText";
import BackgroundLogo from "../components/BackgroundLogo";
import {
  ResetPasswordForm,
  TResetPasswordForm,
} from "../form/reset-password.form";

const ForgotPassword: Component = () => {
  const [forgotPasswordForm, { Form, Field }] = createForm<TResetPasswordForm>({
    validate: valiForm(ResetPasswordForm),
  });

  const handleSubmit: SubmitHandler<TResetPasswordForm> = (values, event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <BackgroundLogo>
      <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Change Password
        </h2>
        <Form
          class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          onSubmit={handleSubmit}
        >
          <Field name="password">
            {(field, props) => (
              <InputText
                label="New password"
                {...props}
                type="password"
                value={field.value}
                error={field.error}
                placeholder="••••••••"
              />
            )}
          </Field>
          <Field name="confirmPassword">
            {(field, props) => (
              <InputText
                label="Confirm password"
                {...props}
                type="password"
                value={field.value}
                error={field.error}
                placeholder="••••••••"
              />
            )}
          </Field>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="newsletter"
                aria-describedby="newsletter"
                type="checkbox"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>
            <div class="ml-3 text-sm">
              <label
                for="newsletter"
                class="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <a
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button
            type="submit"
            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Reset passwod
          </button>
        </Form>
      </div>
    </BackgroundLogo>
  );
};

export default ForgotPassword;
