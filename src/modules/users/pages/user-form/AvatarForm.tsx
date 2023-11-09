import { Component, createSignal } from "solid-js";
import UserPlaceholderIcon from "../../../../icons/UserPlaceholderIcon";

const AvatarForm: Component<{
  onSelectFile: (file?: File) => void;
  value?: string;
}> = (props) => {
  const [previewAvatar, setPreviewAvatar] = createSignal<string>(
    props.value ? props.value : ""
  );

  const onSelectImage = (e: Event) => {
    if (e.target) {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setPreviewAvatar(window.URL.createObjectURL(files[0]));
        props.onSelectFile(files[0]);
      } else if (files && files.length === 0) {
        setPreviewAvatar("");
        props.onSelectFile(undefined);
      }
    }
  };

  return (
    <>
      <label
        for="brand"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        children={<>Upload avatar</>}
      />
      <div
        class="items-center w-full sm:flex"
        children={
          <>
            {previewAvatar() ? (
              <img
                src={previewAvatar()}
                alt="avatar"
                class="mb-4 h-20 w-20 rounded-full sm:mb-0 sm:mr-4 object-cover"
              />
            ) : (
              <UserPlaceholderIcon class="mb-4 h-20 w-20 rounded-full sm:mb-0 sm:mr-4 text-gray-200 dark:text-gray-700" />
            )}

            <div
              class="w-full"
              children={
                <>
                  <input
                    onChange={onSelectImage}
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                  />
                  <p
                    class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    SVG, PNG, JPG or GIF (MAX. 800x400px).
                  </p>
                </>
              }
            />
          </>
        }
      />
    </>
  );
};

export default AvatarForm;
