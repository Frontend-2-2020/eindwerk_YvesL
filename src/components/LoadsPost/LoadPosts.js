import React, { Component } from "react";
import { API } from "../../config/API";
import classes from "./LoadPosts.module.css";
import PostsCard from "../PostsCard/PostsCard";
import NewPost from "../NewPost/NewPost";
//import Page404 from "../../pages/Page404";
import Pagination from "react-js-pagination";
import { Spinner } from "../../ui/spinner/Spinner";

class LoadPosts extends Component {
  state = {
    posts: [],
    loading: false,
    user: {},
    activePage: 1,
    isClicked: false,
  };

  ///////MAKING THE API CALL TO GET THE POSTS////////
  getposts() {
    const { activePage } = this.state;
    API.get("api/posts?page=" + activePage)
      .then((response) => {
        const { data } = response.data;
        console.log(data);
        ////UPDATING THE STATE TO STORE THE POSTS AND SET THE LOADING TO TRUE(SPINNER)//////
        this.setState({
          posts: data,
          loading: true,
        });
      })
      .catch((err) => console.log(err));
  }
  ////////PAGINATION, I CHOSE TO USE THE PAGINATION NODE HERE////////
  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber }, () => this.getposts());
  };

  ///////PREVENTING AN INFINITE LOOP////////////
  componentDidMount() {
    this.getposts();
    //////REFRESHING THE PAGE EVERY 5 MINUTES
    // setInterval(() => {
    //   this.getposts();
    // }, 300000);
  }

  //////TO DISPLAY THE CREATE POST FORM/////////
  createPostHandler = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  ////////PERFORMING AN AXIOS PUT TO PLACE THE NEW POST ON THE SERVER//////////////
  addPostHandler() {
    const data = {
      body: document.getElementById("body").value,
      title: document.getElementById("title").value,
    };
    API.post("api/posts", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { posts, loading, isClicked } = this.state;

    ///////STORING ALL THE PAGE CONTENT IN A VARIABLE TO OUTPUT WHEN LOADING IS COMPLETE///////
    const AllPosts = (
      <div className={classes.row}>
        {posts.map((post) => (
          <div key={post.id}>
            <PostsCard
              title={post.title}
              body={post.body}
              timestamp={post.created_at}
              updated={post.updatedAt}
              comments={post.comments_count}
              id={post.user_id}
              name={post.user.first_name}
              postid={post.id}
              avatar={post.user.avatar}
              posts={post.user_id}
            />
          </div>
        ))}
        ;
      </div>
    );

    //////IF LOADING IS TRUE SHOW SPINNER ELSE SHOW PAGE///////
    const spinner = <Spinner />;
    const loadAllPosts = AllPosts;
    const pageIsLoaded = !loading ? spinner : loadAllPosts;

    //////HERE WE ARE DISPLAYING THE POSTFORM TO ADD A NEW POST//////
    const postBox = (
      <div style={{ display: "flex", flexFlow: "column" }}>
        <NewPost />
        <button
          className="btn btn-outline-dark"
          type="submit"
          onClick={this.addPostHandler}
          style={{ width: "70%", margin: "auto", marginTop: "10px" }}
        >
          Submit Post
        </button>{" "}
      </div>
    );

    // const catcherror = <Page404 error={errorMessage.err} />;

    ////////BY CLICKING THE "CREATE POST" BUTTON WE DISPLAY THE POSTFORM,//////////
    ////////OTHERWISE ALL THE POSTS ARE SHOWN//////////////////////////////////////
    const showPostBox = isClicked ? postBox : pageIsLoaded;
    // const errorHandler = errorMessage ? catcherror : pageIsLoaded;

    return (
      <div>
        <button
          className="btn btn-outline-dark"
          onClick={this.createPostHandler}
        >
          + POST
        </button>

        <div className={classes.pagination}>
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={this.state.activePage}
            itemsCountPerPage={15}
            totalItemsCount={56}
            pageRangeDisplayed={4}
            onChange={this.handlePageChange}
          />
        </div>
        {showPostBox}
      </div>
    );
  }
}

export default LoadPosts;
