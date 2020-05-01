import React, { Component } from "react";
import { API } from "../../config/API";
import moment from "moment";
import DetailPostCard from "./DetailPostCard";
import { Link } from "react-router-dom";
import "./DetailPost.css";
import { Spinner } from "../../ui/spinner/Spinner";

export class DetailPost extends Component {
  state = {
    postDetails: {},
    user: {},
    comments: [],
    loading: false,
  };
  getDetailedpost() {
    const { id } = this.props;

    API.get("api/posts/" + id).then((response) => {
      const detail = response.data;
      //console.log(response.data); ///logs the comments made
      const user = detail.user;
      //console.log(user);
      const comments = detail.comments;
      this.setState({
        postDetails: detail,
        user: user,
        comments: comments,
        loading: true,
      });
    });
  }

  componentDidMount() {
    this.getDetailedpost();
  }

  render() {
    const { postDetails, user, comments, loading } = this.state;

    const postComments = comments.map((comment) => (
      <div key={comment.id} id="comments">
        <li style={{ marginBottom: "15px", listStyleType: "none" }}>
          <p style={{ color: "green" }}>
            <strong>
              <Link to={"/user/" + comment.user_id}>
                {comment.user.first_name}
              </Link>
            </strong>{" "}
            commented
          </p>
          <strong dangerouslySetInnerHTML={{ __html: comment.body }}></strong>
          <p style={{ marginTop: "35px" }}>
            {" "}
            On: {moment(comment.created_at).format("llll")}
          </p>
          <p>Updated: {moment(comment.updated_at).format("llll")}</p>
        </li>
        <hr />
      </div>
    ));

    const pageContent = (
      //////USER'S ORIGINAL POST//////
      <div className="cards">
        <h1 style={{ textAlign: "center" }}>{user.first_name}'s post</h1>
        <DetailPostCard {...postDetails} {...user} />

        <h1 style={{ textAlign: "center" }}>
          People who commented on {user.first_name}'s post
        </h1>
        <DetailPostCard
          {...user}
          comment={postComments}
          blogid={postComments.blog_post_id}
        />
      </div>
    );

    const pageIsloaded = !loading ? <Spinner /> : pageContent;

    return <div>{pageIsloaded}</div>;
  }
}

export default DetailPost;
