import React, { useEffect } from 'react'
import Form from 'antd/es/form/Form';
import Input from 'antd/es/input/Input';
import { Button, message } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { CategoryService } from '../../../services/categories.service';
import { useNavigate ,useParams} from 'react-router-dom';
import { AUTHENTICATED_ROUTE } from '../../../utils/constant';

function AddCategory() {
    const{categoryId} = useParams();
    const [form] = Form.useForm();
    const [messageApi,contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const {mutateAsync: addCategoryRequest,isLoading:addCategoryRequestLoader} = useMutation("addCategory",CategoryService.AddCategory);
    
   const {mutateAsync:updateCategoryRequest,isLoading:updateCategoryRequestLoader,}=useMutation(["updateCategory",categoryId],(payload)=> CategoryService.updateCategory(categoryId,payload))

    const {data:editCategoryRequest,isLoading:editCategoryRequestLoader} = useQuery(["updateCategory",categoryId],()=>CategoryService.getCategoryById(categoryId),
  {
    enabled : Boolean(categoryId)
  });
    // console.log(updateEditRequest,"editRequest");

    useEffect(()=>{
      if (editCategoryRequest?.data?.results){
        form.setFieldsValue({
          cat_title : editCategoryRequest?.data?.results?.cat_title,
        })
        
      }

    },[editCategoryRequest?.data?.results])
    const onFinish = (values)=>{
      if(categoryId){
        updateCategoryRequest(values,{
          onSuccess: () => {
              message.open({
                  type:'success',
                  content : "Category is updated successfully.",
              });
              form.resetFields();
              setTimeout(()=>{
                  navigate(AUTHENTICATED_ROUTE.CATEGORIES)
              },2000);
          }
      })
  }else{
    addCategoryRequest(values,{
      onSuccess: () => {
          message.open({
              type:'success',
              content : "Category is added successfully.",
          });
          form.resetFields();
          setTimeout(()=>{
              navigate(AUTHENTICATED_ROUTE.CATEGORIES)
          },2000);
      }
  })
}
  }
      
        
  return (
    <Form name="basic"
     onFinish={onFinish} 
      autoComplete="off" 
      form={form}
      >
        {contextHolder}
      <h2>{categoryId ? "Edit" : "Add"} Category</h2>
      <Form.Item
        name="cat_title"
        rules={[
          {
            required: true,
            message: "Please input your category title!",
          },
        ]}
      >
        <Input placeholder="Category title" />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        loading={addCategoryRequestLoader || editCategoryRequestLoader || updateCategoryRequestLoader}
        
      >
        {categoryId ? "Update" : "Create"} Category</Button>
    </Form>
  )
}

export default AddCategory;