import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { login, error, loading } = useLogin();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Login values: ", values);

    login(values);
    navigate("/"); //? Redirect to home page
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-200">
      <div className="w-[400px] p-4 bg-white border-gray-300 border rounded-md">
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
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500"
              loading={loading}
            >
              Log in
            </Button>
            <p className=" inline-flex px-1">or</p>{" "}
            <a href="/register">register now!</a>
          </Form.Item>
          <Form.Item className="text-center">
            {error && <p className="text-red-500">{error}</p>}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
