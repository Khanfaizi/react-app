import React from "react";
import {useParams} from "react-router-dom";
import {useQuery}  from "react-query"
import { CategoryService } from "../services/categories.service";
import SinglePost from "../components/SinglePost/SinglePost";

function CategoryDetail(){
const {catId} =useParams();
const {data:catDataById} = useQuery(
    ["categoryById",catId], 
    ()=> CategoryService.getCategoryById(catId),
{
    enabled: Boolean(catId),
}
 
);



const singleCatData = catDataById?.data?.results;
// console.log(singleCatData,"singleCatID")



return(
    <>
<h2>Category Detail</h2>
{singleCatData?.posts?.length > 0 
? singleCatData?.posts?.map((SinglePost)=>{
    return <SinglePost singlePost = {SinglePost}/>;
})
: <h2>No Post Found</h2> 
}</>   
);

}



export default CategoryDetail;
