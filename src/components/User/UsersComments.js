import React, { Component } from "react";
import { withRouter } from "react-router";
import { API } from "../../config/API";
import Validate from "../Forms/Validate";
import moment from "moment";
import "./UsersComments.css";
import { Trashcan } from "../../ui/helpers/Trashcan";
import PropTypes from "prop-types";
import Button from "../../ui/helpers/button/Button";

class UsersComments extends Component {
  state = {
    clicked: false,
  };
  editComment = (values) => {
    console.log("edit");
    const { commId } = this.props;
    const data = {
      body: values.body,
    };
    API.put("api/comments/" + commId, data)
      .then((res) => alert("You updated your comment succesfully" + res))
      .catch((err) => alert("Oops! Something went wrong" + err))
      .then(() => this.props.history.push("/"));
  };

  deleteComment = () => {
    const { commId } = this.props;
    console.log("delete");
    const confirm = window.confirm(
      "Do you really want to Delete this comment?"
    );
    if (confirm === true) {
      API.delete("api/comments/" + commId)
        .then((res) => alert("Comment" + commId + "has been deleted" + res))
        .catch((err) =>
          alert(
            "You are not Authorized to delete a comment from another user" + err
          )
        )
        .then(() => this.props.history.push("/"));
    }
  };

  showEditCommentBtn = () => {
    console.log("edit works");
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    const { blog_post, first_name, body } = this.props;
    const { clicked } = this.state;
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
      <div>
        <div className="commented">
          <div className="postheader">Original post</div>

          <div className="contentbody">
            <div className="bodyheader">
              <div className="details">
                <p>Admin user id:{blog_post.user_id}</p>
                <p>{moment(blog_post.updated_at).format("llll")}</p>
              </div>
            </div>
            <h4 className="title">{blog_post.title}</h4>
            <hr />

            <p className="text">{blog_post.body} </p>
          </div>
          <div className="contentcomment">
            <div className="commentsheader">Comment</div>
            <h4 className="title">{first_name} said ...</h4>

            <hr />

            <div>
              {/* ////////////GETTING RID OF THE HTML TAGS////////// */}
              <div style={{ marginBottom: 20 }}>
                <p dangerouslySetInnerHTML={{ __html: body }}></p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexFlow: "row",
                  justifyContent: "space-between",
                }}
              >
                <div onClick={this.deleteComment} style={{ marginTop: 35 }}>
                  <Trashcan />
                </div>
                <div
                  onClick={this.showEditCommentBtn}
                  /* style={{ marginTop: 20 }} */
                >
                  <Button btnTxt="Edit Comment" />
                </div>
              </div>

              {/* HIDE THIS EDITCOMMENTBOX */}
              {/* ///////FORMIK//////// */}
              {showEditComment}
              {/* ///////END FORMIK///////// */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UsersComments);

UsersComments.propTypes = {
  title: PropTypes.string,
  user_id: PropTypes.number.isRequired,
  updated_at: PropTypes.string,
  body: PropTypes.string,
  first_name: PropTypes.string,
};
