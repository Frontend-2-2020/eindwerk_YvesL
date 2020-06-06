import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./Post.module.css";
import { API } from "../../config/API";
import CreateComment from "../Comments/CreateComments";
import moment from "moment";
import {
  FaRegComment,
  FaCommentMedical,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { textLimit } from "../../config/API";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import HeartIcon from "../../ui/helpers/HeartIcon";
import NoHeartIcon from "../../ui/helpers/NoHeartIcon";

class OverviewCard extends Component {
  state = {
    isClicked: false,
    id: null,
    commentInput: [],
    likes: this.props.post.likes_count,
    comments: this.props.post.comments_count,
    color: "black",
  };

  //////VALIDATE COMMENTS/////////////
  onChangeInEditor = (event, editor) => {
    const data = editor.getData();
    this.setState({ commentInput: data });
  };

  ///////HANDLER THAT OPENS THE BOX TO WRITE YOUR COMMENTS///////
  showCommentHandler = () => {
    const { id } = this.props.post;
    this.setState({ isClicked: !this.state.isClicked, id: id });
  };

  ////COMMENT ON THE RIGHT ID AND SEND THE DATA TO THE SERVER///
  addCommentHandler = () => {
    const { id, commentInput } = this.state;
    const data = {
      blog_post_id: id,
      body: commentInput,
    };
    API.post("api/comments", data)
      .then((res) => alert("Your comment was posted succesfully"))
      .catch((err) => alert(err + "Make sure that you are logged in"))
      .then(
        this.setState({
          isClicked: !this.state.isClicked,
          comments: this.props.post.comments_count + 1,
        })
      );
  };

  addLikeHandler = () => {
    const { id } = this.props.post;
    API.post("api/posts/" + id + "/like")
      .then((res) => {
        this.setState({
          likes: this.props.post.likes_count + 1,
          heart: !this.state.heart,
          color: "red",
        });
      })
      .catch((err) => alert(err + " You can only like a post once"));
  };

  unLikeHandler = () => {
    const { id } = this.props.post;
    API.post("api/posts/" + id + "/unlike")
      .then((res) => {
        this.setState({
          likes: this.props.post.likes_count - 1,
        });
        alert("Your unlike was succesfull");
      })
      .catch((err) => alert(err + " You can only unlike a post once"));
  };

  render() {
    const { isClicked, likes, comments, color } = this.state;
    const str = this.props.post.body; //FUNCTION TEXTLIMIT IN CONFIG
    TimeAgo.addLocale(en); //PACKAGE USED FOR ...DAYS AGO
    const timeAgo = new TimeAgo("en-US");
    const { props } = this;

    ///////CK EDITOR WHERE WE TYPE OUR COMMENTS//////////
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
        <hr className={classes.cardrule} />
        <div className={classes.cardbody}>
          {/* AVATAR / USERINFO / DATE POSTED / LAST LOGIN */}
          <div className={classes.cardheader}>
            <img src={props.avatar} alt="profile pic" />
            <div className={classes.cardtitle}>{props.post.title}</div>
            <div className={classes.lastOnline} style={{ color: "black" }}>
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
                <Link to={"/user/" + props.user_id}>
                  <div className={classes.cardusername}>{props.first_name}</div>
                </Link>
                <Link
                  to={"/detail/" + props.post.id}
                  style={{
                    textDecoration: "none",
                    color: "#333",
                    cursor: "pointer",
                  }}
                >
                  <div
                    className={classes.balloon}
                    dangerouslySetInnerHTML={{
                      __html: textLimit(str),
                    }}
                  ></div>
                </Link>
                <div className={classes.dateposted}>
                  <div style={{ margin: 10, color: "black" }}>
                    <span>{moment(props.post.created_at).format("llll")}</span>
                  </div>
                </div>

                <div className={classes.readpost}>
                  <Link to={"/detail/" + props.post.id}>
                    <button className="btn btn-no outline">Detail post</button>
                  </Link>
                </div>
              </div>
            </div>
            {/* COMMENTS / LIKES */}
            <div className={classes.commentslikes}>
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
                <div className={classes.commentscount}>
                  <Link to={"/detail/" + props.post.id}>
                    <span>
                      <FaRegComment style={{ marginBottom: 3 }} /> {comments}
                    </span>
                  </Link>
                  {/* //////ADD COMMENTS////// */}
                  <div>
                    <div
                      className={classes.addcomments}
                      onClick={this.showCommentHandler}
                    >
                      <FaCommentMedical style={{ fontSize: "1.2rem" }} />
                    </div>
                  </div>
                  {/* //////ADD LIKES////// */}

                  <div className={classes.likebtnbox}>
                    <div
                      className={classes.likebtn}
                      onClick={this.addLikeHandler}
                    >
                      <div style={{ color: color }}>
                        <HeartIcon />{" "}
                      </div>
                      <span style={{ marginTop: 1 }}>{likes}</span>
                    </div>

                    <div
                      className={classes.likebtn}
                      onClick={this.unLikeHandler}
                    >
                      <NoHeartIcon />{" "}
                    </div>
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
    prevProps.post.title.length > 0 &&
    nextProps.post.title.length > 0 &&
    prevProps.post.title === nextProps.post.title
  ) {
    return true;
  }
  return false;
});

OverviewCard.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  timediv: PropTypes.instanceOf(Date),
  timstamp: PropTypes.instanceOf(Date),
  first_name: PropTypes.string,
  postid: PropTypes.number,
  body: PropTypes.string,
  comments_count: PropTypes.number,
};
