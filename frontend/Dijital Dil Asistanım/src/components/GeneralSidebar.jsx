import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const GeneralSidebar = () => {
  const navigate = useNavigate();

  return (
    <Sidebar
      width="300px"
      height="100%"
      header={import.meta.env.VITE_APP_NAME}
      components={["Home", "Dashboard", "History", "Settings"]}
      buttonType="sidebar"
      notClosable
      onClick={(e) => {
        e.stopPropagation();
        console.log(e.target.innerText);
        navigate(
          `/${e.target.innerText === "Home" ? "" : e.target.innerText.toLowerCase()}`,
        );
      }}
    />
  );
};

export default GeneralSidebar;
