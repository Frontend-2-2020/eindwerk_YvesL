import React from "react";
import moment from "moment";
import "./UsersComments.css";

const UsersComments = (props) => {
  return (
    <div>
      <div className="page">
        <div className="details">
          <p>Admin user id:{props.blog_post.user_id}</p>
          <p>{moment(props.blog_post.updated_at).format("llll")}</p>
        </div>
        <div className="contentbody">
          <h4 className="title">{props.blog_post.title}</h4>
          <hr />
          <p className="text">{props.blog_post.body} </p>
        </div>
        <div className="contentcomment">
          <h4>{props.first_name} said ...</h4>
          <hr />
          <div>
            <p className="text">{props.body} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersComments;
