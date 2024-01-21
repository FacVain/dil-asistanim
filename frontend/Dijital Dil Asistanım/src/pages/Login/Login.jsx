import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Divider } from "antd";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const { login, error, loading } = useLogin();

  const onFinish = async (values) => {
    console.log("Login values: ", values);

    login(values);
  };

  const loginWithGoogle = async () => {
    fetch("http://localhost:1453/auth/google", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-200">
      <div className="min-w-[360px] p-4 bg-white border-gray-300 border rounded-md">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item className="text-center">
            <h1 className="text-2xl">Login Page</h1>
          </Form.Item>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Log in
            </Button>
            <p className=" inline-flex px-1">or</p>{" "}
            <a href="/register">register now!</a>
          </Form.Item>
          {/* <Form.Item className="text-center">
            {error && <p className="text-red-500">{error}</p>}
          </Form.Item> */}
          <Divider style={{ color: "black" }} className=" text-gray-500">
            OR
          </Divider>
          <Form.Item>
            <div
              className=" p-2 border-solid border border-gray-300 rounded-md font-normal text-base hover:bg-gray-200 cursor-pointer"
              onClick={loginWithGoogle}
            >
              <img src="public\google_icon.svg" className=" w-9"></img> Continue
              with Google
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
