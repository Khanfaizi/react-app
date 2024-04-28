import { Button, message, Modal, Table } from 'antd';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React from 'react'
import { useMutation, useQuery } from 'react-query';
import { CategoryService } from '../../../services/categories.service';
import { type } from '@testing-library/user-event/dist/type';
import { useNavigate } from 'react-router-dom';
import { AUTHENTICATED_ROUTE, UNAUTHENTICATED_ROUTES } from '../../../utils/constant';

const {confirm} = Modal ;

function AdminCategories() {
  const navigate = useNavigate();
  const [messageApi,contextHolder] = message.useMessage();
  const {data,isLoading, isFetching, refetch : relaodData,} = useQuery("adminCategories",() => CategoryService.getCategory())
  // console.log(data?.data?.results,"data")
 const {
        mutateAsync : categoryDeleteRequest,
        isLoading:categoryDeleteLoader}
        = useMutation("deleteCategory",
        (catId)=>CategoryService.deleteCategoryById(catId));

  const deleteCategoryHandler = (row) => {
    const catId = row?.cat_id;
    confirm({
      title : "Do You Want To Delete This Category ?",
      icon: <ExclamationCircleOutlined/>,
      onOk : () =>{
        categoryDeleteRequest(catId,{
          onSuccess : () =>{
            messageApi.open({
              type: "success",
              content: "Category is deleted successfuly."
            });
            relaodData();
          }
        })
      }
    })
  }

  // // const editCategoryId = (row)=>{
  // //   console.log(row);

  // }

  
  const columns = [
    {
      title: 'Id',
      dataIndex: 'cat_id',
      key: 'name',
    },
    {
      title: 'Title',
      dataIndex: 'cat_title',
      key: 'age',
    },
    {
      title: 'created at',
      dataIndex: 'created_at',
      key: 'address',
    },
    {
      title: 'updated at',
      dataIndex: 'updated_at',
      key: 'address',
    },
    {
      title: 'edit',
      key: 'edit',
      render: (row) => {
        return <Button 
        onClick={()=>navigate(AUTHENTICATED_ROUTE.EDIT_CATEGORY.replace(
          ":categoryId",
          row?.cat_id
        ))} 
        className="btn btn-primary">Edit</Button>
      }
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (row) => {
        return (
        <Button
        onClick={()=> deleteCategoryHandler(row)} 
        className="btn btn-danger">
        Delete</Button>)
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
    <h1 style={{marginBottom:40}}>AdminCategories</h1>
    
    <Button
      onClick={()=> navigate(AUTHENTICATED_ROUTE.ADD_CATEGORY)} 
      type='btn btn-primary'>
      Add Category
      </Button>
      </div>
    
    <Table dataSource={data?.data?.results} columns={columns} loading={isLoading || categoryDeleteLoader || isFetching}/>
    </div>
  )
}

export default AdminCategories