import React, { Component } from "react";
import { API } from "../../config/API";
//import moment from "moment";
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
      <div style={{ textAlign: "center" }}>
        {/* USER PROFILE CARD */}
        <div className="userProfileCard" style={{ marginTop: 100 }}>
          <UserProfileCard {...user} />
        </div>

        {/* ALL POSTS MADE BY USER */}
        <h3>Previous posts by {user.first_name}</h3>
        <hr style={{ width: "70vw" }} />
        <div
          className="userPostsCard"
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
        >
          {blogposts.map((blogpost) => (
            <UserCard key={blogpost.id} {...blogpost} {...user} />
          ))}
        </div>

        {/* POSTS WAAR IK OP HEB GECOMMENT */}
        <h3 style={{ marginTop: 30 }}>Comments made by {user.first_name}</h3>
        <hr style={{ width: "70vw" }} />
        {comments.map((comment) => (
          <UsersComments key={comment.id} {...comment} {...user} />
        ))}
      </div>
    );
    ///////ES6 IF/ELSE TO SET SPINNER WHILE LOADING////////
    const spinner = <Spinner />;
    const pageIsLoaded = !loaded ? spinner : userOutput;

    return <div>{pageIsLoaded}</div>;
  }
}

export default User;
