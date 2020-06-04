import React, { Component } from "react";
import "@reach/dialog/styles.css";
import "./Detail.css";
import { Redirect } from "react-router";
import { API } from "../config/API";
import { Spinner } from "../ui/spinner/Spinner";
import Validate from "../components/Forms/Validate";
import { FaEdit } from "react-icons/fa";
import DetailCard from "../components/Posts/DetailCard";
import Comments from "../components/Comments/Comments";

export class Detail extends Component {
  state = {
    postDetails: {},
    user: {},
    comments: [],
    loading: false,
    redirect: false,
  };

  ///////HIDE OR SHOW THE INPUT FORM///////////
  editPostHandler() {
    let editBtn = document.querySelector(".editForm");
    if (editBtn.style.display === "none") {
      editBtn.style.display = "block";
    } else {
      editBtn.style.display = "none";
    }
  }

  ///////PREVENTING THE INFINITE LOOP////////
  componentDidMount() {
    this.getDetail();
  }

  /////GET THE DETAILS OF THE SPECIFIC POST, PROPS (ID) RECEIVED FROM BUTTON POSTSCARD(ROUTER/:ID)//////
  getDetail() {
    const { id } = this.props.match.params;
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
    const { id } = this.props.match.params;
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
    const { id } = this.props.match.params;
    const confirmDelete = window.confirm(
      "Are you sure want to delete your post?"
    );
    if (confirmDelete === true) {
      API.delete("api/posts/" + id)
        .then((res) => alert("Post" + id + "has been deleted"))
        .then(() => this.setState({ redirect: true }))
        .catch((err) =>
          alert(
            "You are not authorized to delete a post from another user" + err
          )
        );
    }
  };

  render() {
    const { postDetails, user, comments, loading, redirect } = this.state;
    console.log(user);
    const pageContent = (
      <div className="detailpage">
        {/* ///////EDIT POST BUTTON//////// */}
        <div className="showEditForm">
          <FaEdit onClick={this.editPostHandler} style={{ fontSize: 35 }} />
          <p>Edit Post</p>
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
          <DetailCard
            {...postDetails}
            {...user}
            delete={this.deletePostHandler}
          />
        </div>
        <div>
          {/* //////COMMENTS MADE ON THAT POST//////// */}
          {comments.map((comment) => (
            <Comments
              key={comment.id}
              blog_post={postDetails}
              title={postDetails.title}
              comment={comment}
              name={comment.user.first_name}
              updated_at={postDetails.updated_at}
              user_id={postDetails.user_id}
              body={postDetails.body}
              first_name={postDetails.user.first_name}
              commentbody={comment.body}
              showOriginalPost={false}
              avatar={comment.user.avatar}
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

export default Detail;
