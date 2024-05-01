import { Button, message, Modal, Table } from 'antd'
import React from 'react'
import { useMutation, useQuery } from 'react-query';
import { userService } from '../../../services/user.services';
import { helpservice } from '../../../utils/helper';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from 'react-router-dom';
import { AUTHENTICATED_ROUTE } from '../../../utils/constant';
// import { apiService } from '../../../utils/api.service';


function AdminUsers() {
    const [messageApi,contextHolder] = message.useMessage()
    const navigate =useNavigate();
    const {data:userData,isLoading:userDataLoading,isFetching:userLoaderFetching, refetch:reloadUser} = useQuery("users",()=> userService.getUser());
    // console.log(userData?.data?.results,"userdata")
    const {mutateAsync:userDeleteRequest , isLoading: deleteRequestLoader} = useMutation("deleteUser",(userId)=>userService.deleteUserById(userId));


    const deleteBtnHandler = (row) => {
      Modal.confirm({
        title: "Do you want to delete this user ?",
         icon: <ExclamationCircleOutlined />,
      onOk : ()=>{
        userDeleteRequest(row?.user_id,{
          onSuccess: () => {
            messageApi.open({
              type: "success",
              content: "User is deleted successfully.",
        });
        reloadUser()
      },
      });
    },
  });
};
      
        const columns = [
        {
          title: 'Id',
          dataIndex: 'user_id',
          key: 'user_id',
        },
        {
          title: 'Name',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Firstname',
          dataIndex: 'user_firstname',
          key: 'user_firstname',
        },
        {
            title: 'Lastname',
            dataIndex: 'user_lastname',
            key: 'user_lastname',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: 'Image',
            key: 'image',
            render : (row)=>{
                if(!row.user_image){
                    return "image not found"
                }
                return <img src={row?.user_image} width="80"/>
            }
          },
          {
            title: 'Role',
            dataIndex: 'user_role',
            key: 'user_role',
          },
          {
            title: 'Created_at',
            render :(row)=>{
                return helpservice.convertDate(row?.created_at)
            }
          }, 
          {
            title: 'Updated_at',
            render :(row)=>{
                return helpservice.convertDate(row?.updated_at)
            }
          }, 
          {
            title: 'Edit',
            render :(row)=>{
                return <Button type='primary'>Edit</Button>
            }
          },
          {
            title: 'Delete',
            render :(row)=>{
                return <Button
                onClick={()=>deleteBtnHandler(row)}
                 type='btn btn-danger'>
                Delete
                </Button>
            }
          },  
      ];
  return (
    <div>
    {contextHolder}
    <div
    style={{
      display:"flex",
      justifyContent:'space-between',
      alignItems:'center'
    }}
    >
    <h1 style={{marginBottom:40}}>User</h1>
    
    <Button
      onClick={()=>navigate(AUTHENTICATED_ROUTE.ADD_USER)} 
      type='btn btn-primary'>
      Add users
      </Button>
      </div>
      <Table dataSource={userData?.data?.results} columns={columns} 
      loading={userDataLoading||deleteRequestLoader||userLoaderFetching} />;

    </div>
  )
}

export default AdminUsers;