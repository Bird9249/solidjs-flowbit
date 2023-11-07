import { Component, createSignal, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import EyeIcon from "../../icons/EyeIcon";
import EyeSlashIcon from "../../icons/EyeSlashIcon";
import { TextInputProps } from "./form.interface";

const InputPassword: Component<TextInputProps> = (props) => {
  const [isVisible, setIsVisible] = createSignal<boolean>(false);
  const [, inputProps] = splitProps(props, ["value", "label", "error"]);

  const validClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500";
  const inValidClass =
    "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";

  return (
    <div class="w-full">
      {props.label && (
        <label
          for={props.name}
          class={`block mb-2 text-sm font-medium ${
            props.error
              ? "text-red-700 dark:text-red-500"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {props.label} {props.required && <span>*</span>}
        </label>
      )}
      <div
        class="relative"
        children={
          <>
            <input
              class={props.error ? inValidClass : validClass}
              {...inputProps}
              type={isVisible() ? "text" : "password"}
              id={props.name}
              value={props.value || ""}
              aria-invalid={!!props.error}
              aria-errormessage={`${props.name}-error`}
            />
            <div
              class="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3.5"
              onClick={() => setIsVisible((prev) => !prev)}
            >
              <Dynamic
                component={isVisible() ? EyeSlashIcon : EyeIcon}
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
              />
            </div>
          </>
        }
      />

      {props.error && (
        <div
          id={`${props.name}-error`}
          class="mt-2 text-sm text-red-600 dark:text-red-500"
        >
          {props.error}
        </div>
      )}
    </div>
  );
};

export default InputPassword;
