import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ModalLayout from "../components/common/ModalLayout";

const LogoutPage = () => {
  const [isShow, setIsShow] = useState(true);
  const navigate = useNavigate();
  return (
    <div>
      <ModalLayout
        width="w-[30%]"
        title="Do you want to logout?"
        isShow={isShow}
        onClose={() => setIsShow(false)}
        onConfirm={() => navigate("/login")}
      />
    </div>
  );
};
export default LogoutPage;
