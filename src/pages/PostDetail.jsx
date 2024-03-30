import React from "react";
import {useQuery} from "react-query"
import {useParams ,Link} from "react-router-dom";
import { postService } from "../services/post.service";
import { helpservice } from "../utils/helper";
import {UNAUTHENTICATED_ROUTES} from "../utils/constant"

function PostDetail() {
  const { postId } = useParams();
  const { data: postDetailPage } = useQuery(
    ["postDetail", postId],
    () => postService.getPostById(postId),
    {
      enabled: Boolean(postId),
    }
  );

  const singlePost = postDetailPage?.data?.results;
  return (
    <div>
      {/* <!-- Blog Post --> */}

      {/* <!-- Title --> */}
      <h1>Post Detail</h1>
      <h1>{singlePost?.post_title}</h1>

      {/* <!-- Author --> */}
      <p className="lead">
        by <a href="#">{singlePost?.post_author}</a>
      </p>

      <hr />

      {/* <!-- Date/Time --> */}
      <p>
        <span className="glyphicon glyphicon-time"></span> Posted on{" "}
        {helpservice.convertDate(singlePost?.post_date)}
      </p>

      <hr />

      {/* <!-- Preview Image --> */}
      <Link
      to={UNAUTHENTICATED_ROUTES.POST_DETAIL.replace(
        "postId",
        singlePost?.id
      )}
      >
        {singlePost?.image ?(
             <img src={singlePost?.image}/>
        ) : (
            <img
            className="img-responsive"
            src="http://placehold.it/900x300"
            alt=""
          />
        )}
        </Link>

      <hr />

      {/* <!-- Post Content --> */}
      <p class="lead">{singlePost?.post_content}</p>

      <hr />

      {/* <!-- Blog Comments --> */}

      {/* <!-- Comments Form --> */}
      <div className="well">
        <h4>Leave a Comment:</h4>
        <form role="form">
          <div className="form-group">
            <textarea className="form-control" rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <hr />

      {/* <!-- Posted Comments --> */}

      {/* <!-- Comment --> */}
      <div className="media">
        <a className="pull-left" href="#">
          <img
            className="media-object"
            src="http://placehold.it/64x64"
            alt=""
          />
        </a>
        <div className="media-body">
          <h4 className="media-heading">
            Start Bootstrap
            <small>August 25, 2014 at 9:30 PM</small>
          </h4>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
          scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in
          vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
          vulputate fringilla. Donec lacinia congue felis in faucibus.
        </div>
      </div>
      </div>
  );
  }

export default PostDetail;
