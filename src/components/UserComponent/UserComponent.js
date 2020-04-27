import React, { Component } from "react";
import { API } from "../../config/API";
import moment from "moment";
import UserComponentCard from "./UserComponentCard";
import { Spinner } from "../../ui/social/spinner/Spinner";
import UserProfileCard from "./UserProfileCard";

export class UserComponent extends Component {
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
    const { user } = this.state;
    const { blogposts } = this.state;
    const { comments } = this.state;
    const { loaded } = this.state;
    ///////ASSIGNING A CONSTANT TO THE JSX BLOCK TO OUTPUT//////////
    const userOutput = (
      <div style={{ textAlign: "center" }}>
        {/* USER PROFILE CARD */}
        <div className="userProfileCard" style={{ marginTop: 100 }}>
          <UserProfileCard
            firstname={user.first_name}
            avatar={user.avatar}
            lastname={user.last_name}
            useremail={user.email}
            color={user.favorite_color}
          />
        </div>

        {/* POSTS MADE BY USER CARDS */}
        <h3>Previous posts by {user.first_name}</h3>
        <hr style={{ width: "70vw" }} />
        <div
          className="userPostsCard"
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
        >
          {blogposts.map((blogpost) => (
            <UserComponentCard
              key={blogpost.id}
              title={blogpost.title}
              avatar={user.avatar}
              body={blogpost.body}
              created={blogpost.created_at}
              updated={blogpost.updated_at}
            />
          ))}
        </div>

        {/* COMMENTS MADE BY USER CARDS */}
        <h3 style={{ marginTop: 30 }}>Comments made by {user.first_name}</h3>
        <hr style={{ width: "70vw" }} />
        {comments.map((comment) => {
          return (
            <div
              key={comment.id}
              className="page"
              style={{
                width: "80vw",
                margin: "auto",
                border: "1px solid black",
                marginBottom: 40,
                marginTop: 40,
              }}
            >
              <div className="details" style={{ padding: 20, marginTop: 30 }}>
                <p>Admin user id:{comment.blog_post.user_id}</p>
                <p>{moment(comment.blog_post.updated_at).format("llll")}</p>

                <h4 style={{ fontStyle: "italic", marginTop: 30 }}>
                  {comment.blog_post.title}
                </h4>
              </div>
              <div className="content" style={{ padding: 20 }}>
                <p>{comment.blog_post.body} </p>
              </div>
              <h4>
                <a href="read-more">{user.first_name}'s comment</a>
              </h4>
              <div className="content">
                <p>{comment.body} </p>
              </div>
            </div>
          );
        })}
      </div>
    );
    ///////ES6 IF/ELSE TO SET SPINNER WHILE LOADING////////
    const spinner = <Spinner />;
    const pageIsLoaded = !loaded ? spinner : userOutput;

    return pageIsLoaded;
  }
}

export default UserComponent;
