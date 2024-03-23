import React,{useMemo} from "react";
import { useQuery} from "react-query"
import { helpservice } from "../utils/helper";
import { postService } from "../services/post.service";

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
                        return(
                            <>
                            <h2>
                    <a href="#">{singlePost?.post_title}</a>
                </h2>
                <p className="lead">
                    by <a href="index.php">{singlePost?.post_author}</a>
                </p>
                <p><span className="glyphicon glyphicon-time"></span> Posted on 
                {helpservice.convertDate(singlePost?.post_date)}</p>
                <hr/>
                {singlePost?.image ? (
                    <img src={singlePost?.image}/>
                ):(
                    <img className="img-responsive"
                     src="http://placehold.it/900x300"
                      alt=""/>
                )}
                
                <hr />
                <p>{singlePost?.post_content}</p>
                <a className="btn btn-primary" href="#">
                Read More {" "}
                <span className="glyphicon glyphicon-chevron-right"></span></a>

                <hr/>
                </>

                        )
                    })
                ):(
                    <h2>NO Post Found!</h2>
                )}
    </div>
    )
}

export default Home;