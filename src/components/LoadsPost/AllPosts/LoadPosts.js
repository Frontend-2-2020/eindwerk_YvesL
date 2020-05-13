import React, { Component } from "react";
import { API } from "../../../config/API";
import classes from "./LoadPosts.module.css";
import PostsCard from "../PostsCard/PostsCard";
import Pagination from "react-js-pagination";
import { Spinner } from "../../../ui/spinner/Spinner";
import Validate from "../../Forms/Validate";

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
        this.setState({
          posts: data,
          loading: true,
        });
      })
      .catch((err) => console.log(err));
  }

  ////////PAGINATION, I CHOSE TO USE THE PAGINATION NODE HERE////////
  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => this.getposts());
  };

  ///////PREVENTING AN INFINITE LOOP////////////
  componentDidMount() {
    this.getposts();
    //REFRESHING THE PAGE EVERY 10 SEC
    // setInterval(() => {
    //   this.getposts();
    // }, 10000);
  }

  //////TO DISPLAY THE MAKE POST FORM/////////
  createPostHandler = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  ////////PERFORMING AN AXIOS PUT TO PLACE THE NEW POST ON THE SERVER//////////////
  ////////REFRESHING THE PAGE AFTER SUBMIT TO GO BACK TO THE HOMEPAGE//////////////
  addPostHandler(values) {
    const data = {
      title: values.title,
      body: values.body,
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
        {posts.map((post) => (
          <div key={post.id}>
            <PostsCard
              postid={post.id}
              posts={post.user_id}
              {...post}
              {...post.user}
            />
          </div>
        ))}
      </div>
    );

    //////IF LOADING IS TRUE SHOW SPINNER ELSE SHOW PAGE///////
    const spinner = <Spinner />;
    const loadAllPosts = AllPosts;
    const pageIsLoaded = !loading ? spinner : loadAllPosts;

    //////HERE WE ARE DISPLAYING THE POSTFORM TO ADD A NEW POST//////
    const postBox = (
      <div style={{ display: "flex", flexFlow: "column" }}>
        <Validate
          submit={this.addPostHandler}
          btnTxt="Post"
          formTxt="Add Post"
        />
      </div>
    );

    ////////BY CLICKING THE "CREATE POST" BUTTON WE DISPLAY THE POSTFORM,//////////
    ////////OTHERWISE ALL THE POSTS ARE SHOWN//////////////////////////////////////
    const showPostBox = isClicked ? postBox : pageIsLoaded;

    return showPostBox;
  }
}

export default LoadPosts;
