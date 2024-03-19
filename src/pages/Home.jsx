import React from "react";

function Home(){
    return(
        <div>
                 <h1 class="page-header">
                    Blog Posts
                    <small></small>
                </h1>

                {/* <!-- First Blog Post --> */}
                <h2>
                    <a href="#">Blog Post Title</a>
                </h2>
                <p className="lead">
                    by <a href="index.php">Start Bootstrap</a>
                </p>
                <p><span className="glyphicon glyphicon-time"></span> Posted on August 28, 2013 at 10:00 PM</p>
                <hr/>
                <img className="img-responsive" src="http://placehold.it/900x300" alt=""/>
                <hr />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, veritatis, tempora, necessitatibus inventore nisi quam quia repellat ut tempore laborum possimus eum dicta id animi corrupti debitis ipsum officiis rerum.</p>
                <a className="btn btn-primary" href="#">Read More <span className="glyphicon glyphicon-chevron-right"></span></a>

                <hr/>

                {/* <!-- Second Blog Post --> */}
                <h2>
                    <a href="#">Blog Post Title</a>
                </h2>
                <p className="lead">
                    by <a href="index.php">Start Bootstrap</a>
                </p>
                <p><span className="glyphicon glyphicon-time"></span> Posted on August 28, 2013 at 10:45 PM</p>
                <hr/>
                <img className="img-responsive" src="http://placehold.it/900x300" alt=""/>
                <hr/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, quasi, fugiat, asperiores harum voluptatum tenetur a possimus nesciunt quod accusamus saepe tempora ipsam distinctio minima dolorum perferendis labore impedit voluptates!</p>
                <a className="btn btn-primary" href="#">Read More <span class="glyphicon glyphicon-chevron-right"></span></a>
        </div>
    )
};

export default Home;