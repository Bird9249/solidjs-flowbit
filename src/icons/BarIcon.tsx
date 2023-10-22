import { Component } from "solid-js";

const BarIcon: Component<{ class?: string }> = (props: { class?: string }) => {
  return (
    <svg
      class={props.class}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 17 14"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M1 1h15M1 7h15M1 13h15"
      />
    </svg>
  );
};

export default BarIcon;
