import React, { Component } from "react";
import { API } from "../../config/API";
import moment from "moment";
import DetailComponentCard from "./DetailComponentCard";
import { Link } from "react-router-dom";
import "./DetailComponent.css";
import { Spinner } from "../../ui/social/spinner/Spinner";

export class DetailComponent extends Component {
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
      const user = detail.user;
      console.log(user);
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
    const { postDetails } = this.state;
    const { user } = this.state;
    const { comments } = this.state;
    const { loading } = this.state;

    const postComments = comments.map((comment) => (
      <div key={comment.id}>
        <li style={{ marginBottom: "15px", listStyleType: "none" }}>
          <p style={{ color: "green" }}>
            <strong>
              <Link to={"/user/" + comment.user_id}>
                {comment.user.first_name}
              </Link>
            </strong>{" "}
            commented
          </p>
          <strong>{comment.body}</strong>
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
      <div className="cards">
        <h1 style={{ textAlign: "center" }}>{user.first_name}'s post</h1>
        <DetailComponentCard
          title={postDetails.title}
          author={"Author: " + user.first_name}
          body={postDetails.body}
          created={postDetails.created_at}
          updated={postDetails.updated_at}
          avatar={user.avatar}
          iduser={user.id}
        />
        <h1 style={{ textAlign: "center" }}>{user.first_name}'s Details</h1>
        <DetailComponentCard
          name={user.first_name + " " + user.last_name}
          email={user.email}
          updated={user.updated_at}
          avatar={user.avatar}
        />
        <h1 style={{ textAlign: "center" }}>
          People who commented on {user.first_name}'s post
        </h1>
        <DetailComponentCard
          comment={postComments}
          avatar={user.avatar}
          blogid={postComments.blog_post_id}
          create={user.created_at}
          update={user.updated_at}
        />
      </div>
    );

    const pageIsloaded = !loading ? <Spinner /> : pageContent;

    return <div>{pageIsloaded}</div>;
  }
}

export default DetailComponent;
