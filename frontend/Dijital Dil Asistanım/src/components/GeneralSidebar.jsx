import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

import useLogout from "../hooks/useLogout";

// @antd components
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const GeneralSidebar = () => {
  const navigate = useNavigate();
  const { logout, error, loading } = useLogout();

  const logoutHandler = () => {
    console.log("wtf???");

    Modal.confirm({
      title: "Are you sure you want to log out?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        logout();
      },
      onCancel() {
        console.log("logout canceled");
      },
    });
  };

  return (
    <Sidebar
      width="300px"
      height="100%"
      header={import.meta.env.VITE_APP_NAME}
      components={["Ana Sayfa", "Geçmiş"]}
      bottomComponents={["Çıkış Yap"]}
      buttonType="sidebar"
      notClosable
      onClicks={[
        () => navigate("/"),
        () => navigate("/history"),
        () => logoutHandler(),
      ]}
    />
  );
};

export default GeneralSidebar;
