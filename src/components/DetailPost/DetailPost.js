import React, { Component } from "react";
import { API } from "../../config/API";
import moment from "moment";
import DetailPostCard from "./DetailPostCard";
import { Link, Redirect } from "react-router-dom";
import "./DetailPost.css";
import { Spinner } from "../../ui/spinner/Spinner";
import Validate from "../Forms/Validate";
import { FaEdit } from "react-icons/fa";

export class DetailPost extends Component {
  state = {
    postDetails: {},
    user: {},
    comments: [],
    loading: false,
    redirect: false,
  };

  ///////HIDE OR SHOW THE INPUT FORM///////////
  showEditpostBtn() {
    let editBtn = document.querySelector(".container");
    if (editBtn.style.display === "none") {
      editBtn.style.display = "block";
    } else {
      editBtn.style.display = "none";
    }
  }

  ///////PREVENTING THE INFINITE LOOP////////
  componentDidMount() {
    this.getDetailedpost();
  }

  /////GET THE DETAILS OF THE SPECIFIC POST, PROPS (ID) RECEIVED FROM BUTTON POSTSCARD(ROUTER/:ID)//////
  getDetailedpost() {
    const { id } = this.props;
    API.get("api/posts/" + id).then((response) => {
      const detail = response.data;
      const user = detail.user;
      const comments = detail.comments;
      this.setState({
        postDetails: detail,
        user: user,
        comments: comments,
        loading: true,
      });
    });
  }

  ///////MAKING A PUT REQUEST TO EDIT THE SPECIFIC POST(SAME ID AS RECEIVED FROM PROPS)///////
  //////PASSING THE TITLE AND BODY THAT WE LIKE TO EDIT//////////
  submitHandler = (values) => {
    const { id } = this.props;

    console.log(values.title);
    const data = {
      title: values.title,
      body: values.body,
    };
    API.put("api/posts/" + id, data)
      .then((res) => alert("You updated your post succesfully" + res))
      .then(() => this.setState({ redirect: true }))
      // .then(() => window.location.reload())
      .catch((err) => alert("Oops! Something went wrong" + err));
  };

  /////////DELETE THE POST (I CAN ONLY DELETE MY OWN POSTS)/////////
  deletePost = () => {
    console.log("delete");
    const { id } = this.props;

    API.delete("api/posts/" + id)
      .then((res) => alert("Post" + id + "has been deleted" + res))
      .then(() => this.setState({ redirect: true }))
      // .then(() => window.location.reload())
      .catch((err) =>
        alert("You are not Authorized to delete a post from another user" + err)
      );
  };

  render() {
    const { postDetails, user, comments, loading, redirect } = this.state;

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

    //////USER'S ORIGINAL POST//////
    const pageContent = (
      <div className="cards">
        <div style={{ textAlign: "center", cursor: "pointer" }}>
          <FaEdit onClick={this.showEditpostBtn} style={{ fontSize: 35 }} />
          <p>Change Post</p>
        </div>

        {/* ///////FORMIK//////// */}
        <div className="container">
          <Validate
            btnTxt="Edit"
            formTxt="Edit Post"
            submit={this.submitHandler}
          />
        </div>

        <div>
          <h1 className="headers">{user.first_name}'s post</h1>
          <DetailPostCard
            {...postDetails}
            {...user}
            clicked={this.deletePost}
          />
        </div>

        <h1 className="headers">See comments on {user.first_name}'s post</h1>
        <DetailPostCard
          {...user}
          comment={postComments}
          blogid={postComments.blog_post_id}
        />
      </div>
    );

    //////SPINNER///////
    const pageIsloaded = !loading ? <Spinner /> : pageContent;

    ////REDIRECT TO HOMEPAGE AFTER //////
    if (redirect) {
      return <Redirect to="/" />;
    } else {
      return pageIsloaded;
    }
  }
}

export default DetailPost;
