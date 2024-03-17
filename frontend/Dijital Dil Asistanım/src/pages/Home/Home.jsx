// @antd components
import { Button, Card, Input, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

// @hooks
import useLogout from "../../hooks/useLogout";
import { useState } from "react";

import { Link } from "react-router-dom";

const { TextArea } = Input;

const Home = () => {
  const { logout, error, loading } = useLogout();
  const [userInput, setUserInput] = useState("");
  const [GPTOutput, setGPTOutput] = useState("");

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

  const askGPT = () => {
    console.log("askGPT");
    fetch(import.meta.env.VITE_API_URL + "/api/query", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInput: userInput,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGPTOutput(JSON.stringify(data));
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
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Card className=" border-gray-300">
          {GPTOutput ? GPTOutput : "This is Chat-GPT output!"}
        </Card>
        <Button type="primary" className="w-fit " onClick={askGPT}>
          Submit
        </Button>
      </div>
      <Link to="/history">Go to History</Link>
      <Button
        type="primary"
        className="w-fit ml-auto mt-auto"
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
