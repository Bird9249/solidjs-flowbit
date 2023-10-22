import { A } from "@solidjs/router";
import { Component } from "solid-js";

const Logo: Component = () => {
  return (
    <A href="/" class="flex items-center justify-between mr-4">
      <img
        src="https://flowbite.s3.amazonaws.com/logo.svg"
        class="mr-3 h-8"
        alt="Flowbite Logo"
      />
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Flowbite
      </span>
    </A>
  );
};

export default Logo;
