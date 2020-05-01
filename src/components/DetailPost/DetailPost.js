import React, { Component } from "react";
import { API } from "../../config/API";
import moment from "moment";
import DetailPostCard from "./DetailPostCard";
import { Link, Redirect } from "react-router-dom";
import "./DetailPost.css";
import { Spinner } from "../../ui/spinner/Spinner";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export class DetailPost extends Component {
  state = {
    postDetails: {},
    user: {},
    comments: [],
    loading: false,
    editpostdata: {},
  };

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
        editpostdata: [],
        redirect: false,
      });
    });
  }
  ///////PREVENTING THE INFINITE LOOP////////
  componentDidMount() {
    this.getDetailedpost();
  }
  ///////CKEDITOR TO EDIT THE POSTS//////////
  onChangeInEditor = (event, editor) => {
    const data = editor.getData();
    this.setState({ editpostdata: data });
  };
  ///////MAKING A PUT REQUEST TO EDIT THE SPECIFIC POST(SAME ID AS RECEIVED FROM PROPS)///////
  //////PASSING THE TITLE AND BODY THAT WE LIKE TO EDIT//////////
  updateDetailpost = () => {
    const { id } = this.props;
    const { editpostdata } = this.state;
    const data = {
      title: "updated",
      body: editpostdata,
    };
    API.put("api/posts/" + id, data)
      .then((res) => alert("You updated your post succesfully" + res))
      .catch((err) => alert("Oops! Something went wrong" + err));
  };
  /////////DELETE THE POST (I CAN ONLY DELETE MY OWN POSTS)/////////
  deletePost = () => {
    const { id } = this.props;

    API.delete("api/posts/" + id)
      .then((res) => alert("Post" + id + "has been deleted" + res))
      .then(() => this.setState({ redirect: true }))
      .catch((err) => console.log(err));
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

    const pageContent = (
      //////USER'S ORIGINAL POST//////
      <div className="cards">
        <div>
          <CKEditor
            editor={ClassicEditor}
            data=""
            onChange={(event, editor) => this.onChangeInEditor(event, editor)}
          />
          <button
            className="btn btn-outline-dark"
            style={{ float: "right", marginRight: "50px", margin: 10 }}
            onClick={this.updateDetailpost}
          >
            SUBMIT
          </button>
          <button
            className="btn btn-outline-dark"
            style={{ float: "right", marginRight: "50px", margin: 10 }}
            onClick={this.deletePost}
          >
            DELETE
          </button>
        </div>
        <h1 className="headers">{user.first_name}'s post</h1>
        <DetailPostCard {...postDetails} {...user} />

        <h1 className="headers">
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

    // redirect ?  <Redirect to="/" /> : pageIsloaded

    if (redirect) {
      return <Redirect to="/" />;
    } else {
      return pageIsloaded;
    }
  }
}

export default DetailPost;
