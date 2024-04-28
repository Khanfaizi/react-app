import React, { useMemo,useState } from "react";
import {useQuery } from "react-query"
import "../../frotend-assets/css/blog-home.css"
import "../../frotend-assets/css/bootstrap.min.css"
import {Outlet,Link, useNavigate} from "react-router-dom";
import {CategoryService} from "../../services/categories.service"
import {AUTHENTICATED_ROUTE, UNAUTHENTICATED_ROUTES} from "../../utils/constant"
import { AuthService } from "../../utils/auth.services";


function FrontendLayout(){
  const { data : categoriesData} = useQuery("categories",() => 
  CategoryService.getCategory()
  )
  // console.log(categoriesData,"data")

  const firstFiveCategories = useMemo(
    ()=> categoriesData?.data?.results?.splice(0,5),
    [categoriesData]
    );

    
  const firstTenCategories = useMemo(
    ()=> categoriesData?.data?.results?.splice(0,10),
    [categoriesData]
    );

    const [searchInput , setSearchInput] = useState("");

    const navigate = useNavigate();


   const searchInputHandler = (e) =>{
    e.preventDefault();
    setSearchInput(e.target.value);
   }
   console.log(searchInputHandler)
  
    const searchBtnHandler = (e) => {
      e.preventDefault()
      navigate(
        UNAUTHENTICATED_ROUTES.SEARCH_DETAIL.replace(":query", searchInput)
      );
    };
    
    return(
        <>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="container">
            {/* <!-- Brand and toggle get grouped for better mobile display --> */}
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to={UNAUTHENTICATED_ROUTES.HOME}>
                Home
              </Link>
            </div>
            {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav">
                {firstFiveCategories?.length > 0 &&
                firstFiveCategories?.map((singleCategory)=>{
                  return(
                    <li key={singleCategory?.cat_id}>
                      <Link to={UNAUTHENTICATED_ROUTES.CATEGORY_DETAIL.replace(
                        ":catId",
                        singleCategory?.cat_id
                      )}
                      >
                        {singleCategory?.cat_title}
                      </Link>
                    </li>
                  );
         
                })}
                {AuthService.isUserLoggedIn() ? (
                <>
                <li>
                  <Link to = {AUTHENTICATED_ROUTE.DASHBOARD}>Dashboard
                  </Link>
                  </li>
                  <li>
                  <a 
                  href="#"
                  onClick={() => {
                    AuthService.removeToken();
                    window.location.href = UNAUTHENTICATED_ROUTES.LOGIN;
                  }}
                  >
                    Logout
                    </a>
                </li>
                </>
                ) : ( 
                <>
                <li>
                  <Link to = {UNAUTHENTICATED_ROUTES.REGISTER}>Register</Link>
                </li>
                <li>
                  <Link to = {UNAUTHENTICATED_ROUTES.LOGIN}>Login</Link>
                </li>
                </>
                )}
                </ul>
            
            </div>
        
            {/* <!-- /.navbar-collapse --> */}
          </div>
          {/* <!-- /.container --> */}
        </nav>
  
        <div className="container">
          <div className="row">
            {/* <!-- Blog Entries Column --> */}
            <div className="col-md-8" style={{
              marginTop:40
            }}>
              <Outlet />
            </div>
  
            {/* <!-- Blog Sidebar Widgets Column --> */}
            <div className="col-md-4">
              {/* <!-- Blog Search Well --> */}
             
              <div className="well">
                <h4>Blog Search</h4>
                <form onSubmit={searchBtnHandler}>
                <div className="input-group">
                  <input type="text" 
                  className="form-control" 
                  onChange={searchInputHandler}
                  value={searchInput}
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button">
                      <span className="glyphicon glyphicon-search"></span>
                    </button>
                  </span>
                </div>
                {/* <!-- /.input-group --> */}
                 </form>
              </div>
  
              {/* <!-- Blog Categories Well --> */}
              <div className="well">
                <h4>Blog Categories</h4>
                <div className="row">
                  <div className="col-lg-6">
                    <ul className="list-unstyled">
                      {firstTenCategories?.length > 0 && 
                      firstTenCategories.map((singleCategory)=>{
                        return (
                          <li>
                        <Link to={UNAUTHENTICATED_ROUTES.CATEGORY_DETAIL.replace(
                        ":catId",
                        singleCategory?.cat_id
                      )}
                      >
                        {singleCategory?.cat_title}
                      </Link>
                      </li>
                        )
                      })}
                      {/* <li>
                        <a href="#">Category Name</a>
                      </li>
                      <li>
                        <a href="#">Category Name</a>
                      </li>
                      <li>
                        <a href="#">Category Name</a>
                      </li>
                      <li>
                        <a href="#">Category Name</a>
                      </li> */}
                    </ul>
                  </div>
                  {/* <!-- /.col-lg-6 --> */}
                  {/* <div className="col-lg-6">
                    <ul className="list-unstyled">
                      <li>
                        <a href="#">Category Name</a>
                      </li>
                      <li>
                        <a href="#">Category Name</a>
                      </li>
                      <li>
                        <a href="#">Category Name</a>
                      </li>
                      <li>
                        <a href="#">Category Name</a>
                      </li>
                    </ul> */}
                  </div>
                  {/* <!-- /.col-lg-6 --> */}
                </div>
                {/* <!-- /.row --> */}
              </div>
  
              {/* <!-- Side Widget Well --> */}
              {/* <div className="well">
                <h4>Side Widget Well</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Inventore, perspiciatis adipisci accusamus laudantium odit
                  aliquam repellat tempore quos aspernatur vero.
                </p>
                  // </div> */}
            </div>
          </div>
          {/* <!-- /.row --> */}
  
          <hr />
  
          {/* <!-- Footer --> */}
          <footer>
            <div className="row">
              <div className="col-lg-12">
                <p>Copyright &copy; Your Website 2014</p>
              </div>
              {/* <!-- /.col-lg-12 --> */}
            </div>
            {/* <!-- /.row --> */}
          </footer>
        {/* <!-- /.container --> */}
  
        {/* <!-- jQuery --> */}
        <script src="js/jquery.js"></script>
  
        {/* <!-- Bootstrap Core JavaScript --> */}
        <script src="js/bootstrap.min.js"></script>
      </>
    );
  }

  export default FrontendLayout;
  