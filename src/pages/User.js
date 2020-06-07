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
    limitPost: 1,
    limitComment: 1,
    totalposts: null,
    totalcomments: null,
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
        totalposts: data.blog_posts.length,
        totalcomments: data.comments.length,
      });
    });
  }

  //////PREVENTING INFINITE LOOP///////
  componentDidMount() {
    this.getuser();
  }

  limitpostsHandler = () => {
    this.setState({ limitPost: this.state.totalposts });
  };

  limitcommentsHandler = () => {
    this.setState({ limitComment: this.state.totalcomments });
  };

  render() {
    const {
      user,
      blogposts,
      comments,
      loaded,
      limitPost,
      limitComment,
    } = this.state;
    const numberOfPosts = Object.keys(blogposts).length;

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
          {blogposts.slice(0, limitPost).map((post) => {
            return (
              <Post
                key={post.id}
                post={post}
                user_id={user.id}
                avatar={user.avatar}
                first_name={user.first_name}
                last_login_at={user.last_login_at}
              />
            );
          })}
        </div>
        <br />
        <button className="loadmore" onClick={this.limitpostsHandler}>
          LOAD MORE
        </button>
        <br />
        <p>Comments {user.first_name} made</p>

        <div className="commentcard">
          {comments.slice(0, limitComment).map((comment) => (
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
        <br />
        <button className="loadmore" onClick={this.limitcommentsHandler}>
          LOAD MORE
        </button>
        <br />
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
