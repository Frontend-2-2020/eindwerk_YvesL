import React from "react";
import "./UserCard.css";
import { FaArrowCircleRight } from "react-icons/fa";
import moment from "moment";
import PropTypes from "prop-types";

const UserCard = (props) => {
  return (
    <div className="usercard">
      <div className="box-shadow bg-white rounded-circle mx-auto text-center">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="card-body text-center">
        <h3 className="card-title pt-1">{props.title}</h3>
        <p className="card-text text-xl">{props.body}</p>
        Fav color :{props.favorite_color}
        <hr />
        <p>
          <strong>posted on:</strong>
          {moment(props.created_at).format("llll")}
        </p>
        <p>
          <strong>updated on:</strong>
          {moment(props.updated_at).format("llll")}
        </p>
        <span className="text-sm text-uppercase font-weight-bold">
          Learn More&nbsp;
          <FaArrowCircleRight style={{ marginBottom: "4px" }} />
        </span>
      </div>
    </div>
  );
};

export default UserCard;

UserCard.propTypes = {
  avatar: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  favorite_color: PropTypes.string,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
};
