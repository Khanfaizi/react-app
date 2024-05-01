import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useMutation } from 'react-query';
import { userService } from '../../../services/user.services';
import { useNavigate } from 'react-router-dom';
import { AUTHENTICATED_ROUTE } from '../../../utils/constant';

function AdminUserAdd() {
  const{mutateAsync : addUserRequest, isLoading:addUserRequestLoader} = useMutation("adddUser",(payLoad)=>userService.register(payLoad));
  const [form] = Form.useForm();
  const [messageApi,contextHolder] =message.useMessage();
  const navigate = useNavigate();

  const onFinish = (values) => {
    addUserRequest(values,{
      onSuccess : () => {
        messageApi.open({
          type: "success",
          content: "user is registered successfully.",
        });
        form.resetFields();
        setTimeout(() => {
          navigate(AUTHENTICATED_ROUTE.USERS)
        },2000);
      }
    })
  }
  return (
    <div>
      {contextHolder}
      <Form
    onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
    form={form}
  >
    <Form.Item
      label="username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Firstname"
      name="user_firstname"
      rules={[
        {
          required: true,
          message: 'Please input your firstname!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Lastname"
      name="user_lastname"
      rules={[
        {
          required: true,
          message: 'Please input your lastname!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button 
      type="primary"
       htmlType="submit"
       loading = {addUserRequestLoader}
       >
        Submit
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default AdminUserAdd