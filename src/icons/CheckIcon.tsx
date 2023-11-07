import { Component } from "solid-js";

const CheckIcon: Component<{ class?: string }> = (props: {
  class?: string;
}) => {
  return (
    <svg
      class={props.class}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 12"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M1 5.917 5.724 10.5 15 1.5"
      />
    </svg>
  );
};

export default CheckIcon;
