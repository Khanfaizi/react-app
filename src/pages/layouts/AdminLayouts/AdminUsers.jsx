import { Button, Table } from 'antd'
import React from 'react'
import { useQuery } from 'react-query';
import { userService } from '../../../services/user.services';
import { helpservice } from '../../../utils/helper';


function AdminUsers() {
    const {data:userData,isLoading:userDataLoading} = useQuery("users",()=> userService.getUser());
    console.log(userData?.data?.results,"userdata")
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
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
                return <Button type='btn btn-danger'>Delete</Button>
            }
          },  
      ];
  return (
    <div>
    <div
    style={{
      display:"flex",
      justifyContent:'space-between',
      alignItems:'center'
    }}
    >
    <h1 style={{marginBottom:40}}>User</h1>
    
    <Button 
      type='btn btn-primary'>
      Add users
      </Button>
      </div>
      <Table dataSource={userData?.data?.results} columns={columns} />;

    </div>
  )
}

export default AdminUsers