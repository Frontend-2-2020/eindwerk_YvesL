import React, { Component } from "react";
import { API } from "../../config/API";
import "./User.css";
import { Spinner } from "../../ui/spinner/Spinner";
import UsersPost from "./UsersPost";
import UsersProfile from "./UsersProfile";
import UsersComments from "./UsersComments";
import PropTypes from "prop-types";

export class User extends Component {
  /////////INITIAL STATE//////////
  state = {
    user: {},
    blogposts: [],
    comments: [],
    blog: [],
    loaded: false,
  };

  ///////API CALL TO GET THE USERS DETAIL, RECEIVING ID PROPS FROM USER.JS (URL PARAMS)//////
  getuser() {
    const { id } = this.props.match.params;
    API.get("api/users/" + id).then((response) => {
      const { data } = response;
      data.comments.map((comm) => this.setState({ blog: comm.blog_post }));

      ///////SETTING THE NEW STATE////////
      this.setState({
        user: data,
        blogposts: data.blog_posts,
        comments: data.comments,
        loaded: true,
      });
    });
  }

  //////PREVENTING INFINITE LOOP///////
  componentDidMount() {
    this.getuser();
  }

  render() {
    const { user, blogposts, comments, loaded } = this.state;

    //////USE LATER ON!!!!!//////////
    const numberOfPosts = Object.keys(blogposts).length;

    ///////ASSIGNING A CONSTANT TO THE JSX BLOCK TO OUTPUT//////////
    const userOutput = (
      <div className="profilepage">
        {/* USER PROFILE CARD */}
        <UsersProfile {...user} />

        {/* PREVIOUS POSTS MADE BY USER */}
        <h3>
          {numberOfPosts} Previous posts by {user.first_name}
        </h3>
        <hr />
        <div className="userPostsCard">
          {blogposts.map((blogpost) => (
            <UsersPost key={blogpost.id} {...blogpost} {...user} />
          ))}
        </div>

        {/* POSTS WHERE I COMMENTED ON */}
        <h3>Comments made by {user.first_name}</h3>
        <hr />
        {comments.map((comment) => (
          <UsersComments
            key={comment.id}
            commId={comment.id}
            {...comment}
            {...user}
            {...comments}
            name={this.props}
          />
        ))}
      </div>
    );
    ///////SPINNER WHILE LOADING////////
    const spinner = <Spinner />;
    const pageIsLoaded = !loaded ? spinner : userOutput;

    return <div>{pageIsLoaded}</div>;
  }
}

export default User;

User.propTypes = {
  first_name: PropTypes.string,
};
