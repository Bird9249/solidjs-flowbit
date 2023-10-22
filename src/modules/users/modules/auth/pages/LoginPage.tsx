import { SubmitHandler, createForm, valiForm } from "@modular-forms/solid";
import { A } from "@solidjs/router";
import { Component } from "solid-js";
import InputText from "../../../../../components/form/InputText";
import BackgroundLogo from "../components/BackgroundLogo";
import { LoginForm, TLoginForm } from "../form/login.form";
import AuthPathName from "../router/auth-path.enum";

const LoginPage: Component = () => {
  const [loginForm, { Form, Field }] = createForm<TLoginForm>({
    validate: valiForm(LoginForm),
  });

  const handleSubmit: SubmitHandler<TLoginForm> = (values, event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <BackgroundLogo>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <Form onSubmit={handleSubmit} class="space-y-4 md:space-y-6">
            <Field name="username">
              {(field, props) => (
                <InputText
                  label="Your username"
                  {...props}
                  type="text"
                  value={field.value}
                  error={field.error}
                  placeholder="username"
                />
              )}
            </Field>
            <Field name="password">
              {(field, props) => (
                <InputText
                  label="password"
                  {...props}
                  type="password"
                  value={field.value}
                  error={field.error}
                  placeholder="••••••••"
                />
              )}
            </Field>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="remember"
                    class="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <A
                href={AuthPathName.ForgotPassword}
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </A>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <A
                href={AuthPathName.Register}
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </A>
            </p>
          </Form>
        </div>
      </div>
    </BackgroundLogo>
  );
};

export default LoginPage;
