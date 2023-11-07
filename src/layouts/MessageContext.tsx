import { Modal } from "flowbite";
import {
  Context,
  Show,
  createContext,
  createSignal,
  onMount,
  useContext,
} from "solid-js";
import CheckIcon from "../icons/CheckIcon";
import CloseIcon from "../icons/CloseIcon";

type IValue = [
  messageModel: Modal,
  {
    setMessage: (message: string) => void;
  }
];

const MessageContext = createContext<IValue>();

export function MessageProvider(props: any) {
  let [messageModel, setMessageModel] = createSignal<Modal>();
  let [message, setMessage] = createSignal<string>("");
  let modal: any;
  let [value, setValue] = createSignal<IValue>();

  onMount(() => {
    setMessageModel(new Modal(modal));
    setValue([
      messageModel() as Modal,
      {
        setMessage(message) {
          setMessage(message);
        },
      },
    ]);
  });

  return (
    <>
      <div
        ref={modal}
        tabindex="-1"
        aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
      >
        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
          <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <button
              type="button"
              class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => messageModel()?.toggle()}
            >
              <CloseIcon class="w-3 h-3" />
              <span class="sr-only">Close modal</span>
            </button>
            <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
              <CheckIcon class="w-6 h-6 text-green-500 dark:text-green-400" />
              <span class="sr-only">Success</span>
            </div>
            <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              {message()}
            </p>
            <button
              type="button"
              class="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
              onClick={() => messageModel()?.toggle()}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <Show
        when={value()}
        fallback={<p>loading...</p>}
        children={
          <MessageContext.Provider value={value()}>
            {props.children}
          </MessageContext.Provider>
        }
      />
    </>
  );
}

export function useMessage() {
  return useContext<IValue>(MessageContext as Context<IValue>);
}
