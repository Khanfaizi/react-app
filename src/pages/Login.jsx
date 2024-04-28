import React from "react";
import { Typography, Form, Input, Button, message } from "antd";
import { AUTHENTICATED_ROUTE, PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE, UNAUTHENTICATED_ROUTES } from "../utils/constant";
import { userService } from "../services/user.services";
import { useMutation } from "react-query";
import { AuthService } from "../utils/auth.services";
const { Title } = Typography;

function Login() {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync: loginRequest, isLoading: loginRequestLoader } =
    useMutation("login", (payLoad) => userService.login(payLoad));

  const [form] = Form.useForm();
  const onFinish = (values) => {
    loginRequest(values, {
      onSuccess: (data) => {
        // console.log(data?.data?.results,"data")
        messageApi.open({
          type: "success",
          content: "user is logged in successfully.",
        });
        form.resetFields();

        const apiResponse = data?.data?.results;

        AuthService.saveToken(apiResponse?.token);
        AuthService.saveUserName(apiResponse?.username);

        window.location.href = AUTHENTICATED_ROUTE.DASHBOARD;
      },
    });
  };
  return (
    <div>
      {contextHolder}
      <Title level={2}>Login</Title>
      <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
        
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
          initialValue="oscar41@example.net"
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
          initialValue="admin123@"
        >
          <Input.Password placeholder="Type your password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loginRequestLoader}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
