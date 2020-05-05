import React, { Component } from "react";
import { API } from "../../config/API";
import "./Users.css";
import UserCard from "./UserCard";
import { Spinner } from "../../ui/spinner/Spinner";
import UserProfileCard from "./UserProfileCard";
import UsersComments from "./UsersComments";

export class User extends Component {
  /////////INITIAL STATE//////////
  state = {
    user: {},
    blogposts: [],
    comments: [],
    blogs: [],
    loaded: false,
  };

  ///////API CALL TO GET THE USERS DETAIL, RECEIVING ID PROPS FROM USER.JS (URL PARAMS)//////
  getuser() {
    const { id } = this.props;
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

    ///////ASSIGNING A CONSTANT TO THE JSX BLOCK TO OUTPUT//////////
    const userOutput = (
      <div className="profilepage">
        {/* USER PROFILE CARD */}
        <UserProfileCard {...user} />

        {/* PREVIOUS POSTS MADE BY USER */}
        <h3>Previous posts by {user.first_name}</h3>
        <hr />
        <div className="userPostsCard">
          {blogposts.map((blogpost) => (
            <UserCard key={blogpost.id} {...blogpost} {...user} />
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
