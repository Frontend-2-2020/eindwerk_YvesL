import React, { Component } from "react";
import { API } from "../config/API";
import "./User.css";
import { Spinner } from "../ui/spinner/Spinner";
import Post from "../components/Posts/Post";
import Profile from "../components/User/Profile";
import Comments from "../components/Comments/Comments";
import { connect } from "react-redux";
import userbg from "../assets/images/userbg.jpg";

import PropTypes from "prop-types";

export class User extends Component {
  /////////INITIAL STATE//////////
  state = {
    user: {},
    blogposts: [],
    comments: [],
    loaded: false,
  };

  ///////API CALL TO GET THE USERS DETAIL, RECEIVING ID PROPS FROM USER.JS (URL PARAMS)//////
  getuser() {
    const { id } = this.props.match.params;
    API.get("api/users/" + id).then((response) => {
      const { data } = response;
      data.comments.map((comment) =>
        this.setState({ blog: comment.blog_post })
      );
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
    const numberOfPosts = Object.keys(blogposts).length;
    //console.log(this.props);
    console.log(user);

    ///////PROFILE  ,  POSTS MADE BY THAT USER  ,  POSTS WHERE THAT USER COMMENTED ON//////////
    const userOutput = (
      <div
        className="profilepage"
        style={{ backgroundImage: `url(${userbg})` }}
      >
        <Profile {...user} />
        <p>
          {user.first_name} made {numberOfPosts} posts
        </p>
        <div className="usercard">
          {blogposts.map((post) => (
            <Post
              key={post.id}
              post={post}
              user_id={user.id}
              avatar={user.avatar}
              first_name={user.first_name}
              last_login_at={user.last_login_at}
            />
          ))}
        </div>

        <p>Comments {user.first_name} made</p>
        <div className="commentcard">
          {comments.map((comment) => (
            <Comments
              key={comment.id}
              name={user.first_name}
              comment={comment}
              title={comment.blog_post.title}
              updated_at={comment.blog_post.updated_at}
              user_id={comment.blog_post.user_id}
              body={comment.blog_post.body}
              commentbody={comment.body}
              showOriginalPost={true}
              avatar={user.avatar}
            />
          ))}
        </div>
      </div>
    );
    ///////SPINNER WHILE LOADING////////
    const spinner = <Spinner />;
    const pageIsLoaded = !loaded ? spinner : userOutput;

    return pageIsLoaded;
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  auth: state.auth,
});

export default connect(mapStateToProps)(User);

User.propTypes = {
  first_name: PropTypes.string,
};
