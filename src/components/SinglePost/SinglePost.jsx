import React from "react";
import { helpservice } from "../../utils/helper";
// import { UNAUTHENTICATED_ROUTES } from "../../utils/constant";


function SinglePost({ singlePost }) {
  return (
    <>
      <h2>
        <a href="#">{singlePost?.post_title}</a>
      </h2>
      <p className="lead">
        by <a href="index.php">{singlePost?.post_author}</a>
      </p>
      <p>
        <span className="glyphicon glyphicon-time"></span> Posted on
        {helpservice.convertDate(singlePost?.post_date)}
      </p>
      <hr />
      {singlePost?.image ? (
        <img src={singlePost?.image} />
      ) : (
        <img
          className="img-responsive"
          src="http://placehold.it/900x300"
          alt=""
        />
      )}

      <hr />
      <p>{singlePost?.post_content}</p>
      <a className="btn btn-primary" href="#">
        Read More <span className="glyphicon glyphicon-chevron-right"></span>
      </a>

      <hr />
    </>
  );
}

export default SinglePost;