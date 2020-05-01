import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./PostsCard.module.css";
import { API } from "../../config/API";
import Comments from "../Comments/Comments";
import moment from "moment";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  //FaWhatsapp,
  //FaThumbsUp,
  //FaThumbsDown,
  //FaFacebook,
  //FaTwitter,
  //FaInstagram,
  FaRegComment,
  FaCommentMedical,
} from "react-icons/fa";

class CardComponent extends Component {
  state = {
    isClicked: false,
    id: null,
    commentInput: [],
  };

  ///////HANDLER THAT OPENS THE BOX TO WRITE YOUR COMMENTS///////
  showCommentHandler = () => {
    console.log("works");
    this.setState({ isClicked: !this.state.isClicked, id: this.props.postid });
  };

  onChangeInEditor = (event, editor) => {
    const data = editor.getData();
    this.setState({ commentInput: data });
  };

  /////WE RECEIVER THE NEEDED ID FROM THE SETSTATE AND STORE IT IN A CONST///////
  ////THEN WE STORE THE VALUES THAT WE WANNA POST ALSO IN A VARIABLE(DATA ITC)///
  addCommentHandler = () => {
    const { id } = this.state;
    const { commentInput } = this.state;

    const data = {
      blog_post_id: id,
      body: commentInput,
    };
    /////POSTING OUT DATA TO THE SERVER THROUGH AXIOS//////////
    API.post("api/comments", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) =>
        alert(
          err +
            " ,Make sure that you are logged in if you want to make a comment"
        )
      );
  };

  render() {
    const { isClicked } = this.state;
    const { body } = this.props;
    const sub = body.substring(0, 10);
    const blogtext = body.length > 10 ? sub + "..." : body;

    ///////BOX WHERE WE TYPE OUR COMMENTS//////////
    const commentfield = (
      <div className={classes.commentInputbox}>
        <div className={classes.outer} onClick={this.showCommentHandler}>
          <div className={classes.inner}>
            <label>Back</label>
          </div>
        </div>

        <Comments {...this.props} />
        <CKEditor
          editor={ClassicEditor}
          data=""
          onChange={(event, editor) => this.onChangeInEditor(event, editor)}
        />
        <button
          className="btn btn-outline-dark"
          style={{ float: "right", marginRight: "50px", margin: 10 }}
          onClick={this.addCommentHandler}
        >
          SUBMIT
        </button>
      </div>
    );

    ///////WHEN WE CLICK 'ADDCOMMENT' THE COMMENTFIELD APPEARS
    const showcommentfield = isClicked ? commentfield : null;

    return (
      <div className={classes.card}>
        <div className={classes.cardbody}>
          <div className={classes.cardheader}>
            <img src={this.props.avatar} alt="profile pic" />
            <h3>{this.props.title}</h3>

            <div className={classes.posted}>
              <div className="btn">
                {" "}
                <Link to={"/user/" + this.props.id}>
                  <button className={classes.followbutton}>+ Profile</button>
                </Link>
              </div>

              <div className={classes.timediv}>
                <p style={{ margin: 10 }}>
                  <span style={{ color: "black" }}>
                    Posted by{" "}
                    <Link to={"/user/" + this.props.id}>
                      {this.props.name}{" "}
                    </Link>
                    on{""}
                  </span>
                </p>
                <div style={{ margin: 10, color: "grey" }}>
                  {moment(this.props.timestamp).format("llll")}
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div className={classes.cardheader2}>
            <div>
              <div className={classes.cardtext}>
                {blogtext}
                <div className={classes.readpost}>
                  <Link to={"/detail/" + this.props.postid}>
                    <button className="btn btn-outline-dark">Full post</button>
                  </Link>
                </div>
              </div>
            </div>

            <div
              className={classes.commentsAndLikes}
              style={{ display: "flex", justifyContent: "space-between " }}
            >
              <div className={classes.commentbox}>
                <div>
                  <Link to={"/detail/" + this.props.postid}>
                    <FaRegComment /> {this.props.comments} Comments
                  </Link>
                </div>

                <div onClick={this.showCommentHandler}>
                  {" "}
                  <div style={{ color: "#5dbcd2" }}>
                    <FaCommentMedical />
                    Add Comment
                  </div>
                </div>
              </div>
            </div>
            {showcommentfield}
          </div>
          <hr />
          {/* <div className={classes.cardfooter}>
            <div className={classes.socialbox}>
              <FaWhatsapp />
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
            </div>
          </div>  */}
        </div>
      </div>
    );
  }
}
////USING REACT.MEMO H.O.C.
export default React.memo(CardComponent, (prevProps, nextProps) => {
  if (
    prevProps.posts.length > 0 &&
    nextProps.posts.length > 0 &&
    prevProps.posts[0].title === nextProps.posts[0].title
  ) {
    return true;
  }
  return false;
});
