import React from "react";
import "./UsersPost.css";
import moment from "moment";
import PropTypes from "prop-types";

const UsersPost = (props) => {
  return (
    <div className="usercard">
      <div className="box-shadow bg-white rounded-circle mx-auto text-center">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="card-body text-center">
        <h3 className="card-title pt-1">{props.title}</h3>
        <p
          className="card-text text-md"
          dangerouslySetInnerHTML={{ __html: props.body }}
        ></p>
        Fav color :
        <div
          className="visualizeColor"
          style={{ backgroundColor: props.favorite_color }}
        ></div>
        <hr />
        <p>
          <strong>posted on:</strong>
          {moment(props.created_at).format("llll")}
        </p>
        <p>
          <strong>updated on:</strong>
          {moment(props.updated_at).format("llll")}
        </p>
      </div>
    </div>
  );
};

export default UsersPost;

UsersPost.propTypes = {
  avatar: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  favorite_color: PropTypes.string,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
};
