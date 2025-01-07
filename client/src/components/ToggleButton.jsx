import { useModalContext } from "./context/ModalProvider";
import Modal from "./Modal";

const ToggleButton = ({ onClick, isShowHide, title }) => {
  const { openPopup } = useModalContext();

  return (
    <div
      onClick={() => {
        openPopup(
          <Modal>
            <p className="py-2 text-[1.5vw] font-bold">{title}</p>
            <hr />

            <div className="my-3 flex w-full justify-end gap-2">
              <button
                onClick={onClick}
                className="rounded border border-green-400 px-6 py-2 hover:bg-green-500 hover:text-white"
              >
                Agree
              </button>
              <button className="rounded border border-rose-500 px-6 py-2 hover:bg-rose-500 hover:text-white">
                No
              </button>
            </div>
          </Modal>,
        );
      }}
    >
      <label className="relative mb-5 flex cursor-pointer items-center">
        <input type="checkbox" checked={isShowHide} className="peer sr-only" />
        <div className="peer h-5 w-9 rounded-full bg-green-200 transition-all duration-500 ease-in-out after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-green-300 after:bg-white after:transition-all after:content-[''] hover:bg-green-300 peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-transparent hover:peer-checked:bg-indigo-700 peer-focus:outline-0"></div>
        <span className={`ml-3 text-sm font-bold ${isShowHide ? 'text-green-500' : 'text-red-500'}`}>{isShowHide ? 'Active' : "Inactive"}</span>
      </label>
    </div>
  );
};
export default ToggleButton;
