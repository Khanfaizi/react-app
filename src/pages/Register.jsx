import React from "react";
import { Typography, Form, Input, Button, message } from "antd";
import { PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE } from "../utils/constant";
import { userService } from "../services/user.services";
import { useMutation } from "react-query";
const { Title } = Typography;

function Register() {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync: registerRequest, isLoading: registerRequestLoader } =
    useMutation("register", (payLoad) => userService.register(payLoad));

  const [form] = Form.useForm();
  const onFinish = (values) => {
    registerRequest(values, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "user is registered successfully.",
        });
        form.resetFields();
      },
    });
  };
  return (
    <div>
      {contextHolder}
      <Title level={2}>Register</Title>
      <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username",
            },
          ]}
        >
          <Input placeholder="Type your username" />
        </Form.Item>
        <Form.Item
          name="user_firstname"
          rules={[
            {
              required: true,
              message: "Please input your user_firstname",
            },
          ]}
        >
          <Input placeholder="Type your user firstname" />
        </Form.Item>
        <Form.Item
          name="user_lastname"
          rules={[
            {
              required: true,
              message: "Please input your user_lastname",
            },
          ]}
        >
          <Input placeholder="Type your user lastname" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
            {
              type: "email",
              message: "Please enter your valid email address",
            },
          ]}
        >
          <Input placeholder="Type your email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
            {
              pattern: PASSWORD_REGEX,
              message: PASSWORD_REGEX_MESSAGE,
            },
          ]}
        >
          <Input.Password placeholder="Type your password" />
        </Form.Item>
        <Form.Item
          name="c_password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please input your confirm password",
            },
            {
              pattern: PASSWORD_REGEX,
              message: PASSWORD_REGEX_MESSAGE,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Type your confirm password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={registerRequestLoader}>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
