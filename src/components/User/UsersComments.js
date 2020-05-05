import React, { Component } from "react";
import moment from "moment";
import "./UsersComments.css";
import { API } from "../../config/API";
import Validate from "../Forms/Validate";
import { Trashcan } from "../../ui/helpers/Trashcan";

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
      .then(() => window.location.reload());
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
      .then(() => window.location.reload());
  };

  render() {
    return (
      <div>
        <div className="page">
          <div className="details">
            <p>Admin user id:{this.props.blog_post.user_id}</p>
            <p>{moment(this.props.blog_post.updated_at).format("llll")}</p>
          </div>
          <div className="contentbody">
            <h4 className="title">{this.props.blog_post.title}</h4>
            <hr />
            <p className="text">{this.props.blog_post.body} </p>
          </div>
          <div className="contentcomment">
            <h4>{this.props.first_name} said ...</h4>
            <hr />
            <div>
              {/* ////////////GETTING RID OF THE HOML TAGS////////// */}
              <div style={{ backgroundColor: "white", marginBottom: 20 }}>
                <p dangerouslySetInnerHTML={{ __html: this.props.body }}></p>
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

export default UsersComments;
