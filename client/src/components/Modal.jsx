// import { useState } from "react";

const Modal = ({ children }) => {
  // const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="w-[40%] rounded-md border bg-white px-5 py-3">
      {children}
    </div>
  );
};
export default Modal;
