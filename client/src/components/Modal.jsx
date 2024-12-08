const Modal = () => {
  return (
    <div class="relative w-full">
      <button
        type="button"
        class="modal-button shadow-xs cursor-pointer rounded-full bg-indigo-600 px-5 py-2.5 text-center text-xs font-semibold text-white transition-all duration-500 hover:bg-indigo-700"
        data-pd-overlay="#pd-slide-down-modal"
        data-modal-target="pd-slide-down-modal"
        data-modal-toggle="pd-slide-down-modal"
      >
        {" "}
        Open modal{" "}
      </button>
      <div
        id="pd-slide-down-modal"
        class="pd-overlay fixed left-0 top-0 z-[60] hidden h-full w-full overflow-y-auto overflow-x-hidden"
      >
        <div class="modal-open:translate-y-0 modal-open:opacity-100 modal-open:duration-500 m-5 -translate-y-3 transform opacity-0 transition-all ease-out sm:mx-auto sm:w-full sm:max-w-lg">
          <div class="flex flex-col rounded-2xl bg-white px-5 py-4">
            <div class="flex items-center justify-between border-b border-gray-200 pb-4">
              <h4 class="text-sm font-medium text-gray-900">Modal simple</h4>
              <button
                class="close-modal-button block cursor-pointer"
                data-pd-overlay="#pd-slide-down-modal"
                data-modal-target="pd-slide-down-modal"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.75732 7.75739L16.2426 16.2427M16.2426 7.75739L7.75732 16.2427"
                    stroke="black"
                    stroke-width="1.6"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="min-h-[100px] overflow-y-auto py-4">
              <p class="text-sm text-gray-600">
                {" "}
                This is the regular modal with supporting text below as
                additional content{" "}
              </p>
            </div>
            <div class="flex items-center justify-end space-x-4 border-t border-gray-200 pt-4">
              <button
                type="button"
                class="shadow-xs close-modal-button cursor-pointer rounded-full bg-indigo-50 px-5 py-2.5 text-center text-xs font-semibold text-indigo-500 transition-all duration-500 hover:bg-indigo-100"
                data-pd-overlay="#pd-slide-down-modal"
                data-modal-target="pd-slide-down-modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="shadow-xs close-modal-button cursor-pointer rounded-full bg-indigo-500 px-5 py-2.5 text-center text-xs font-semibold text-white transition-all duration-500 hover:bg-indigo-700"
                data-pd-overlay="#pd-slide-down-modal"
                data-modal-target="pd-slide-down-modal"
              >
                Okay, got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
