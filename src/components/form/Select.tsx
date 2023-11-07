import { Component, splitProps } from "solid-js";
import { SelectProps } from "./form.interface";

const Select: Component<SelectProps> = (props) => {
  const [, inputProps] = splitProps(props, [
    "value",
    "label",
    "error",
    "required",
    "placeholder",
    "options",
  ]);

  const validClass =
    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500";
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
      <select
        class={props.error ? inValidClass : validClass}
        {...inputProps}
        id={props.name}
        value={props.value || ""}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
        children={
          <>
            <option disabled selected value={""} children={props.placeholder} />
            {props.options.map((props) => (
              <option value={props.value} children={props.label} />
            ))}
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

export default Select;
