import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./OverviewCard.module.css";
import { API } from "../../config/API";
import CreateComment from "./CreateComments";
import moment from "moment";
import {
  FaRegComment,
  FaCommentMedical,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaRegThumbsUp,
  //FaRegThumbsDown,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { textLimit } from "../../config/API";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

class OverviewCard extends Component {
  state = {
    isClicked: false,
    id: null,
    commentInput: [],
  };
  //////VALIDATE COMMENTS/////////////
  onChangeInEditor = (event, editor) => {
    const data = editor.getData();
    this.setState({ commentInput: data });
  };

  ///////HANDLER THAT OPENS THE BOX TO WRITE YOUR COMMENTS///////
  showCommentHandler = () => {
    this.setState({ isClicked: !this.state.isClicked, id: this.props.postid });
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

  addLikeHandler = () => {
    API.post("api/posts/" + this.props.postid + "/like")
      .then((res) => {
        alert("Your liked this post");
      })
      .catch((err) => alert(err + " You can only like a post once"));
  };

  unLikeHandler = () => {
    API.post("api/posts/" + this.props.postid + "/unlike")
      .then((res) => {
        alert("Your unlike was succesfull");
      })
      .then(this.setState({ likeClick: !this.state.likeClick }))
      .catch((err) => alert(err + " You can only unlike a post once"));
  };

  render() {
    const { isClicked } = this.state;
    const { props } = this;
    const str = props.body; //FUNCTION IN CONFIG
    TimeAgo.addLocale(en); //PACKAGE USED FOR ...DAYS AGO
    const timeAgo = new TimeAgo("en-US");

    ///////BOX WHERE WE TYPE OUR COMMENTS//////////
    const commentfield = (
      <CreateComment
        commentbox={this.showCommentHandler}
        addComment={this.addCommentHandler}
        editor={this.onChangeInEditor}
      />
    );

    ///////ONCLICK 'ADDCOMMENT' THE COMMENTFIELD APPEARS
    const showcommentfield = isClicked ? commentfield : null;

    return (
      <div className={classes.card}>
        <hr className={classes.postcardEnd} />
        <div className={classes.cardbody}>
          {/* AVATAR / USERINFO / DATE POSTED / LAST LOGIN */}
          <div className={classes.cardheader}>
            <img src={props.avatar} alt="profile pic" />
            <h3 style={{ color: "grey", textDecoration: "underline" }}>
              {props.title}
            </h3>

            <div style={{ color: "black" }}>
              <br />
              <strong>
                Last online{" "}
                {timeAgo.format(
                  moment.utc(props.last_login_at).local().toDate()
                )}
              </strong>
            </div>
          </div>
          {/* POSTBODY */}
          <div className={classes.cardheader2}>
            <div>
              <div className={classes.cardtext}>
                <Link to={"/user/" + props.id}>
                  <h3>{props.first_name}</h3>
                </Link>
                <div
                  className={classes.balloon}
                  dangerouslySetInnerHTML={{
                    __html: textLimit(str),
                  }}
                ></div>
                <div className={classes.dateposted}>
                  <div style={{ margin: 10 }}>
                    <span style={{ color: "black", fontSize: 12 }}>
                      {moment(props.date).format("llll")}
                    </span>
                  </div>
                </div>
                {/* </div> */}
                <div className={classes.readpost}>
                  <Link to={"/detail/" + props.postid}>
                    <button className="btn btn-no outline">Full post</button>
                  </Link>
                </div>
              </div>
            </div>
            {/* COMMENTS / LIKES */}
            <div className={classes.commentsAndLikes}>
              <div className={classes.commentbox}>
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
                </div>
                <div className={classes.nofcomments}>
                  <Link to={"/detail/" + props.postid}>
                    <span>
                      <FaRegComment style={{ marginBottom: 3 }} />{" "}
                      {props.comments_count}
                    </span>
                  </Link>

                  <div>
                    <div
                      className={classes.addcomments}
                      onClick={this.showCommentHandler}
                    >
                      <span>
                        <FaCommentMedical /> Add
                      </span>
                    </div>
                  </div>

                  <div className="likeBtn">
                    {/* <FaRegThumbsDown
                      onClick={this.unLikeHandler}
                      style={{ cursor: "pointer" }}
                    />{" "} */}
                    <FaRegThumbsUp
                      onClick={this.addLikeHandler}
                      style={{ marginBottom: 3, cursor: "pointer" }}
                    />{" "}
                    <span>{props.likes_count}</span>
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
//USING REACT.MEMO H.O.C.
export default React.memo(OverviewCard, (prevProps, nextProps) => {
  if (
    prevProps.title.length > 0 &&
    nextProps.title.length > 0 &&
    prevProps.title === nextProps.title
  ) {
    return true;
  }
  return false;
});

OverviewCard.propTypes = {
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
