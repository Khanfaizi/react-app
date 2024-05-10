import { Button, Table } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { postService } from '../../../services/post.service'
import { helpservice } from '../../../utils/helper';

function AdminPost() {
    const {data:PostData,isLoading:PostDataLoader,isFetching:PostDataFetching} = useQuery("PostData", ()=>postService.getPosts());
     console.log(PostData?.data?.results)



    const columns = [
        {
            title: 'Id',
            dataIndex : 'id',
            key: 'name',
        },
        {
            title: 'Post id',
            dataIndex : 'post_category_id',
            key: 'Post id',
        },
        {
            title: 'Post Title',
            dataIndex : 'post_title',
            key: 'Post Title',
        },
        {
            title: 'Post author',
            dataIndex : 'post_author',
            key: 'Post author',
        },
        {
            title: 'Post content',
            dataIndex : 'post_content',
            key: 'Post content',
        },
        {
            title: 'Post status',
            dataIndex : 'post_status',
            key: 'Post status',
        },
        {
            title: 'Post tags',
            dataIndex : 'post_tags',
            key: 'Post tags',
        },
        {
            title: 'image',
            key: 'image',
            render : (row) =>{
                if(!row?.image){
                    return "no image found"
                }
                return <img src={row?.image} width="80"/>
            }
        },
        {
            title: 'Post author',
            dataIndex : 'post_author',
            key: 'Post author',
        },
        {
            title: 'Post date',
            key: 'Post date',
            render : (row) =>{
                return helpservice.convertDate(row?.post_date)
            }
        },
        {
            title: 'updated at',
            key: 'updated at',
            render : (row) =>{
                return helpservice.convertDate(row?.updated_at)
            }
        },
        {
            title: 'Edit',
            key: 'Edit',
            render : (row) =>{
                return <Button type='primary'>Edit</Button>
            }
        },
        {
            title: 'Delete',
            key: 'Delete',
            render : (row) =>{
                return <Button type='btn btn-danger'>Delete</Button>
            }
        },
    ]
  return (
    <div>
        <Table 
        dataSource={PostData?.data?.results} 
        columns={columns}
        loading={PostDataLoader || PostDataFetching}
        />
    </div>
  )
}

export default AdminPost