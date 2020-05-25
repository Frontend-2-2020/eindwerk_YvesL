import React, { Component } from "react";
import "@reach/dialog/styles.css";
import "./DetailPost.css";
import { Redirect } from "react-router";
import { API } from "../../config/API";
import { Spinner } from "../../ui/spinner/Spinner";
import Validate from "../Forms/Validate";
import { FaEdit } from "react-icons/fa";
import DetailPostCard from "./DetailPostCard";
import CommentPostcard from "./CommentPostCard";

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
    let editBtn = document.querySelector(".editForm");
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
  //////PASSING THE TITLE AND BODY(RECEIVED FROM VALUES) THAT WE LIKE TO EDIT//////////
  updatePostHandler = (values) => {
    const { id } = this.props;
    const data = {
      title: values.title,
      body: values.body,
    };
    API.put("api/posts/" + id, data)
      .then((res) => alert("You updated your post succesfully" + res))
      .then(() => this.setState({ redirect: true }))
      .catch((err) => alert("Oops! Something went wrong" + err));
  };

  /////////DELETE THE POST (I CAN ONLY DELETE MY OWN POSTS)/////////
  deletePostHandler = () => {
    console.log("delete");
    const { id } = this.props;
    const confirmDelete = window.confirm(
      "Are you sure want to delete your post?"
    );
    if (confirmDelete === true) {
      API.delete("api/posts/" + id)
        .then((res) => alert("Post" + id + "has been deleted"))
        .then(() => this.setState({ redirect: true }))
        .catch((err) =>
          alert(
            "You are not Authorized to delete a post from another user" + err
          )
        );
    }
  };

  render() {
    const { postDetails, user, comments, loading, redirect } = this.state;

    const pageContent = (
      <div className="cards">
        {/* ///////EDIT POST BUTTON//////// */}
        <div className="showEditBtn">
          <FaEdit onClick={this.showEditpostBtn} style={{ fontSize: 35 }} />
          <p>Change Post</p>
        </div>

        {/* ///////FORMIK EDIT POST//////// */}
        <div className="editForm">
          <Validate
            btnTxt="Edit"
            formTxt="Edit Post"
            submit={this.updatePostHandler}
          />
        </div>

        {/* ///////ORIGINAL POST DETAIL//////// */}
        <div>
          <DetailPostCard
            {...postDetails}
            {...user}
            delete={this.deletePostHandler}
          />
        </div>
        <div>
          <h1 className="headers">Comments on {user.first_name}'s post</h1>

          {/* //////COMMENTS MADE ON THAT POST//////// */}
          {comments.map((comment) => (
            <CommentPostcard
              key={comment.id}
              {...postDetails}
              {...comment}
              /* {...this.state.comments} */
            />
          ))}
        </div>
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
