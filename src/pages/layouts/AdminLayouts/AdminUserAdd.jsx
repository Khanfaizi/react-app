import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useMutation } from 'react-query';
import { userService } from '../../../services/user.services';
import { useNavigate, useParams } from 'react-router-dom';
import { AUTHENTICATED_ROUTE } from '../../../utils/constant';

function AdminUserAdd() {
  const {userId} =useParams();
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
      <h2>{ userId ? "Edit" : "Add"} User</h2>
      {contextHolder}
      <Form
    onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
    form={form}
  >
    <Form.Item
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input placeholder='username' />
    </Form.Item>

    <Form.Item
      name="user_firstname"
      rules={[
        {
          required: true,
          message: 'Please input your firstname!',
        },
      ]}
    >
      <Input placeholder='firstname'/>
    </Form.Item>

    <Form.Item
      name="user_lastname"
      rules={[
        {
          required: true,
          message: 'Please input your lastname!',
        },
      ]}
    >
      <Input placeholder='lastname'/>
    </Form.Item>

    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input placeholder='email'/>
    </Form.Item>

    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password placeholder='Password'/>
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
       {userId ? "Edit" : "Add"} User 
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default AdminUserAdd