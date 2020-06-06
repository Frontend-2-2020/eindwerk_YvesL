import React, { Component } from "react";
import { withRouter } from "react-router";
import { API } from "../../config/API";
import Validate from "../Forms/Validate";
import moment from "moment";
import "./Comments.css";
import { Trashcan } from "../../ui/helpers/Trashcan";
import PropTypes from "prop-types";
import CloseBtn from "../../ui/helpers/button/CloseBtn";
import { connect } from "react-redux";

class Comments extends Component {
  state = {
    clicked: false,
    postUser: [],
  };

  componentDidMount() {
    this.getPostuser();
  }
  /////GET THE DATA OF THE USER THAT POSTED ORIGINAL POST//////
  getPostuser() {
    API.get("api/users/" + this.props.user_id).then((response) => {
      this.setState({ postUser: response.data });
    });
  }

  editComment = (values) => {
    const { id } = this.props.comment;
    console.log(id);
    const data = {
      body: values.body,
    };
    API.put("api/comments/" + id, data)
      .then((res) => alert("You updated your comment succesfully"))
      .catch((err) => alert("Oops! Something went wrong"))
      .then(() => this.props.history.push("/"));
  };

  deleteComment = () => {
    const { id } = this.props.comment;
    const confirm = window.confirm(
      "Are you sure you want to Delete this comment?"
    );
    if (confirm === true) {
      API.delete("api/comments/" + id)
        .then((res) => alert("Comment met " + id + " has been deleted"))
        .catch((err) => alert("Not authorized to delete this comment "))
        .then(() => this.props.history.push("/"));
    }
  };
  //////TOGGLE THAT MAKES THE CK EDITOR TO EDIT COMMENTS////////
  toggleEditCommentField = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    const { clicked, postUser } = this.state;
    const { user } = this.props.user;
    ////CK EDITOR TO EDIT/////
    const editComment = (
      <div className="commentValidate">
        <Validate
          submit={this.editComment}
          btnTxt="submit"
          clicked={this.deleteComment}
          formTxt="Edit comment"
        />
      </div>
    );
    const showEditComment = clicked ? editComment : null;

    return (
      <div className="commentscontainer">
        {/* //////ORIGINAL POST///// */}
        {this.props.showOriginalPost ? (
          <div className="originalpost">
            <div className="postheader">
              <img src={postUser.avatar} alt="postavatar" />
            </div>
            <div className="postcontent">
              <div className="details">
                <p>
                  {postUser.first_name} {postUser.last_name}
                </p>
                <p>{moment(this.props.updated_at).format("llll")}</p>{" "}
              </div>
              <div className="posttitle">{this.props.title}</div>
              <hr />
              {/* ////////////GETTING RID OF THE HTML TAGS////////// */}
              <p dangerouslySetInnerHTML={{ __html: this.props.body }}></p>
            </div>
          </div>
        ) : null}
        {/* //////COMMENT SECTION///////// */}
        <div className="contentcomment">
          <div className="avatar">
            <img src={this.props.avatar} alt="av" />
          </div>
          <div className="commenttitle">{this.props.name} said ...</div>
          <div className="commentbody">
            <div
              dangerouslySetInnerHTML={{ __html: this.props.commentbody }}
            ></div>
          </div>
          <div className="showhidebin">
            {/* ///////SHOW OR HIDE TRASHBIN//////// */}
            {user !== undefined && user.first_name === this.props.name ? (
              <div className="activeDelete">
                <div onClick={this.deleteComment}>
                  <Trashcan />
                </div>
                <div onClick={this.toggleEditCommentField}>
                  <CloseBtn btnTxt="Edit" />
                </div>
              </div>
            ) : (
              <div className="blurredDelete">
                <div>
                  <Trashcan />
                </div>
                <div>
                  <CloseBtn btnTxt="Edit" />
                </div>
              </div>
            )}
          </div>
          {/* HIDE THIS EDITCOMMENTBOX */}
          {showEditComment}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default withRouter(connect(mapStateToProps)(Comments));

Comments.propTypes = {
  title: PropTypes.string,
  updated_at: PropTypes.string,
  body: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  name: PropTypes.string,
  commentbody: PropTypes.string,
};
