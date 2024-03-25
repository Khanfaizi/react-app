import React,{useMemo} from "react";
import { useQuery} from "react-query"
import { postService } from "../services/post.service";
import SinglePost from "../components/SinglePost/SinglePost";

function Home(){
    const {data: postData} = useQuery("posts", () => postService.getPosts())
   const posts = useMemo(
    () => postData?.data?.results,
    [postData?.data?.results,]
   );
   console.log(posts,"posts")
    return(
        <div>
                 <h1 class="page-header"> Blog Posts</h1>

                {/* <!-- First Blog Post --> */}
                {posts?.length > 0 ? (
                    posts.map((singlePost)=>{
                        return <SinglePost singlePost={singlePost}/>
                    })
                ):(
                    <h2>NO Post Found!</h2>
                )}
    </div>
    )
}

export default Home;