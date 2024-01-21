// eslint-disable-next-line no-unused-vars
import React from "react";

import { Button, Checkbox, Form, Input } from "antd";
import useSignup from "../../hooks/useSignup";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 7,
    },
  },
};

const Register = () => {
  const { signup, error, loading } = useSignup();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    signup(values);
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-200">
      <div className="w-[500px] p-4 bg-white border-gray-300 border rounded-md">
        <Form
          name="normal_login"
          className="signup-form"
          {...formItemLayout}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item className="text-center w-full" noStyle>
            <h1 className="text-2xl text-center mb-6">Register Page</h1>
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The new password that you entered do not match!",
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout} className="">
            <Button
              type="primary"
              htmlType="submit"
              className=" "
              loading={loading}
            >
              Register
            </Button>
            <p className=" inline-flex px-2">or</p>
            <a href="/login">login now!</a>
          </Form.Item>
          <Form.Item {...tailFormItemLayout} className="text-center">
            {error && <p className="text-red-500">{error}</p>}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
