// @antd components
import { Button, Card, Input, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

// @hooks
import useLogout from "../../hooks/useLogout";

const { TextArea } = Input;

const Home = () => {
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
    <div className="grid p-4 h-full content-start">
      <h1 className=" h-fit text-4xl font-bold text-gray-700 justify-self-center">
        Dijital Dil Asistanım
      </h1>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 ">
        <TextArea
          placeholder="This is your Input"
          autoSize
          className="p-6 row-start-1"
        />
        <Card className=" border-gray-300">This is Chat-GPT output!</Card>
        <Button type="primary" className="w-fit bg-blue-600">
          Submit
        </Button>
      </div>
      <Button
        type="primary"
        className="bg-blue-600 w-fit ml-auto mt-auto"
        onClick={logoutHandler}
        loading={loading}
      >
        Log out
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Home;
