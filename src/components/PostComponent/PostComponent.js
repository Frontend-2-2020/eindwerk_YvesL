import React, { Component } from "react";
import { API } from "../../config/API";
import classes from "./PostComponent.module.css";
import CardComponent from "../CardComponent/CardComponent";
import CreatePostFormComponent from "../CreatePostComponent/CreatePostFormComponent";
import Pagination from "react-js-pagination";
import { Spinner } from "../../ui/social/spinner/Spinner";

class PostComponent extends Component {
  state = {
    posts: [],
    loading: false,
    user: {},
    activePage: 1,
    isClicked: false,
    //CurrentloggedInUser: "",
  };
  ///////MAKING THE API CALL TO GET THE POSTS////////
  getposts() {
    const { activePage } = this.state;
    API.get("api/posts?page=" + activePage).then((response) => {
      const { data } = response.data;
      console.log(data);
      ////UPDATING THE STATE TO STORE THE POSTS AND SET THE LOADING TO TRUE(SPINNER)//////
      this.setState({
        posts: data,
        loading: true,
      });
    });
  }
  ////////PAGINATION, I CHOSE TO USE THE PAGINATION NODE HERE////////
  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber }, () => this.getposts());
  };

  ///////PREVENTING AN INFINITE LOOP////////////
  componentDidMount() {
    this.getposts();
  }
  //////TO DISPLAY THE CREATE POST FORM/////////
  createPostHandler = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  ////////PERFORMING AN AXIOS PUT TO PLACE THE NEW POST ON THE SERVER//////////////
  addPostHandler() {
    API.post("api/posts", {
      body: document.getElementById("body").value,
      title: document.getElementById("title").value,
    }).then((res) => console.log(res));
    console.log("posted");
  }

  render() {
    // this.addPostHandler();
    const { posts } = this.state;
    const { loading } = this.state;
    const { isClicked } = this.state;

    ///////STORING ALL THE PAGE CONTENT IN A VARIABLE TO OUTPUT WHEN LOADING IS COMPLETE///////
    const AllPosts = (
      <div className={classes.row}>
        {posts.map((post) => (
          <div key={post.id}>
            <CardComponent
              title={post.title}
              body={post.body}
              timestamp={post.created_at}
              updated={post.updatedAt}
              comments={post.comments_count}
              id={post.user_id}
              name={post.user.first_name}
              postid={post.id}
              avatar={post.user.avatar}
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
      <div>
        <CreatePostFormComponent />
        <button
          className="btn btn-outline-dark"
          type="submit"
          onClick={this.addPostHandler}
        >
          Submit Post
        </button>{" "}
      </div>
    );

    ////////BY CLICKING THE "CREATE POST" BUTTON WE DISPLAY THE POSTFORM,//////////
    ////////OTHERWISE ALL THE POSTS ARE SHOWN//////////////////////////////////////
    const showPostBox = isClicked ? postBox : pageIsLoaded;

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

export default PostComponent;
