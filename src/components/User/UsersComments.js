import React, { Component } from "react";
import { withRouter } from "react-router";
import { API } from "../../config/API";
import Validate from "../Forms/Validate";
import moment from "moment";
import "./UsersComments.css";
import { Trashcan } from "../../ui/helpers/Trashcan";
import PropTypes from "prop-types";

class UsersComments extends Component {
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
    API.delete("api/comments/" + commId)
      .then((res) => alert("Comment" + commId + "has been deleted" + res))
      .catch((err) =>
        alert(
          "You are not Authorized to delete a comment from another user" + err
        )
      )
      .then(() => this.props.history.push("/"));
  };

  render() {
    const { blog_post, first_name, body } = this.props;

    return (
      <div>
        <div className="page">
          <div className="details">
            <p>Admin user id:{blog_post.user_id}</p>
            <p>{moment(blog_post.updated_at).format("llll")}</p>
          </div>
          <div className="contentbody">
            <h4 className="title">{blog_post.title}</h4>
            <hr />
            <p className="text">{blog_post.body} </p>
          </div>
          <div className="contentcomment">
            <h4>{first_name} said ...</h4>
            <hr />
            <div>
              {/* ////////////GETTING RID OF THE HTML TAGS////////// */}
              <div style={{ backgroundColor: "white", marginBottom: 20 }}>
                <p dangerouslySetInnerHTML={{ __html: body }}></p>
                <div onClick={this.deleteComment}>
                  <Trashcan />
                </div>
              </div>

              {/* ///////FORMIK//////// */}
              <div className="container">
                <Validate
                  submit={this.editComment}
                  btnTxt="Change Comment"
                  clicked={this.deleteComment}
                  formTxt="Change your comment"
                />
              </div>
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
