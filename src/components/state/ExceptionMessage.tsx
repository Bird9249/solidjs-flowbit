import { Component } from "solid-js";
import { IState } from "../../common/interfaces/state.interface";
import InfoCircleIcon from "../../icons/InfoCircleIcon";

const ExceptionMessage: Component<{ state: IState<unknown> }> = (props) => {
  return (
    <div
      class={`flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-gray-800 ${
        props.state.error?.level === "error"
          ? "bg-red-50 text-red-800 dark:text-red-400"
          : "bg-yellow-50 text-yellow-800 dark:text-yellow-400"
      }`}
      role="alert"
    >
      <InfoCircleIcon class="flex-shrink-0 inline w-4 h-4 mr-3" />
      <span class="sr-only">
        {props.state.error?.level === "error" ? "Danger" : "Warning"}
      </span>
      <div>
        <span class="font-medium">
          {props.state.error?.level === "error" ? "Error!" : "Warning"}
        </span>{" "}
        {props.state.error?.message}
      </div>
    </div>
  );
};

export default ExceptionMessage;
