import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./PostsCard.module.css";
import { API } from "../../../config/API";
import Comments from "./Comments/Comments";
import moment from "moment";
import {
  FaRegComment,
  FaCommentMedical,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { textLimit } from "../../../config/API";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

class CardComponent extends Component {
  state = {
    isClicked: false,
    id: null,
    commentInput: [],
  };

  ///////HANDLER THAT OPENS THE BOX TO WRITE YOUR COMMENTS///////
  showCommentHandler = () => {
    this.setState({ isClicked: !this.state.isClicked, id: this.props.postid });
  };

  onChangeInEditor = (event, editor) => {
    const data = editor.getData();
    this.setState({ commentInput: data });
  };

  /////WE RECEIVER THE NEEDED ID FROM THE SETSTATE AND STORE IT IN A CONST///////
  ////THEN WE STORE THE VALUES THAT WE WANNA POST ALSO IN A VARIABLE(DATA ITC)///
  addCommentHandler = () => {
    const { id, commentInput } = this.state;
    const data = {
      blog_post_id: id,
      body: commentInput,
    };
    /////POSTING COMMENT DATA TO THE SERVER THROUGH AXIOS//////////
    API.post("api/comments", data)
      .then((res) => {
        alert("Your comment was posted succesfully");
      })
      .catch((err) =>
        alert(
          err +
            " ,Make sure that you are logged in if you want to make a comment"
        )
      )
      .then(this.setState({ isClicked: !this.state.isClicked }));
  };

  render() {
    const { isClicked } = this.state;
    const { props } = this;
    const str = props.body; //FUNCTION IN CONFIG
    console.log(props.user);
    TimeAgo.addLocale(en); //PACKAGE USED FOR ...DAYS AGO
    const timeAgo = new TimeAgo("en-US");

    ///////BOX WHERE WE TYPE OUR COMMENTS//////////
    const commentfield = (
      <Comments
        commentbox={this.showCommentHandler}
        addComment={this.addCommentHandler}
        editor={this.onChangeInEditor}
      />
    );

    ///////WHEN WE CLICK 'ADDCOMMENT' THE COMMENTFIELD APPEARS
    const showcommentfield = isClicked ? commentfield : null;

    return (
      <div className={classes.card}>
        <div className={classes.cardbody}>
          <div className={classes.contactinfo}>
            <div className={classes.social}>
              <a href="https://www.instagram.com">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com">
                <FaLinkedin />
              </a>

              <a href="https://www.twitter.com">
                <FaTwitter />
              </a>
            </div>
            <div className={classes.iconuser}>
              <div className="btn">
                {" "}
                <Link to={"/user/" + props.id}>
                  <button className={classes.followbutton}>
                    <FaUser />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className={classes.cardheader}>
            <img src={props.avatar} alt="profile pic" />
            <h3>{props.first_name}</h3>

            <div className={classes.dateposted}>
              <div style={{ margin: 10 }}>
                <span style={{ color: "black" }}>
                  Posted by{" "}
                  <Link to={"/user/" + props.id}>{props.first_name} </Link>
                  on {moment(props.date).format("llll")}
                </span>
              </div>
              <div style={{ margin: 10, color: "grey" }}>
                <br />
                <strong>
                  {timeAgo.format(new Date(props.date) - 2 * 60 * 60 * 1000)}
                </strong>
              </div>
            </div>
          </div>

          <div className={classes.cardheader2}>
            <div>
              <div className={classes.cardtext}>
                <div className="noname">
                  <h3 style={{ color: "grey", textDecoration: "underline" }}>
                    {props.title}
                  </h3>
                  <p
                    className={classes.balloon}
                    dangerouslySetInnerHTML={{
                      __html: textLimit(str),
                    }}
                  ></p>
                </div>
                <div className={classes.readpost}>
                  <Link to={"/detail/" + props.postid}>
                    <button className="btn btn-outline-dark">Full post</button>
                  </Link>
                </div>
              </div>
            </div>

            <div className={classes.commentsAndLikes}>
              <div className={classes.commentbox}>
                <div className={classes.nofcomments}>
                  <Link to={"/detail/" + props.postid}>
                    <span>
                      <FaRegComment style={{ marginBottom: 3 }} />{" "}
                      {props.comments_count} Comments
                    </span>
                  </Link>
                </div>

                <div
                  className={classes.addcomments}
                  onClick={this.showCommentHandler}
                >
                  {" "}
                  <div>
                    <span>
                      <FaCommentMedical /> Add Comment
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {showcommentfield}
          </div>
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

CardComponent.propTypes = {
  avatar: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  timediv: PropTypes.instanceOf(Date),
  timstamp: PropTypes.instanceOf(Date),
  first_name: PropTypes.string.isRequired,
  postid: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  comments_count: PropTypes.number,
};
