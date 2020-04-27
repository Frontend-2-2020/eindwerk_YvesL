import React from "react";
import "./UserComponentCard.css";
import { FaArrowCircleRight } from "react-icons/fa";
import moment from "moment";

const UserComponentCard = (props) => {
  return (
    <div
      className="card"
      style={{
        width: "40vw",
        margin: "auto",
        marginTop: 60,
        marginBottom: 20,
        boxShadow: "0 0 9px black",
      }}
    >
      <div
        className="box-shadow bg-white rounded-circle mx-auto text-center"
        style={{
          width: "90px",
          height: "90px",
          marginTop: "-45px",
        }}
      >
        <img
          src={props.avatar}
          style={{
            fontSize: "3.5rem",

            borderRadius: "10px",
          }}
          alt="avatar"
        />
      </div>
      <div className="card-body text-center">
        <h3 className="card-title pt-1">
          {props.title}
          {props.firstname} {props.lastname}
        </h3>
        <p className="card-text text-sm">
          {props.body}
          <strong>{props.useremail}</strong>
        </p>
        <p> Fav color :{props.color}</p>
        <ul style={{ padding: "1rem" }}></ul>
        <hr />
        <p>
          <strong>posted on:</strong>
          {moment(props.created).format("llll")}
        </p>
        <p>
          <strong>updated on:</strong>
          {moment(props.updated).format("llll")}
        </p>
        <span className="text-sm text-uppercase font-weight-bold">
          Learn More&nbsp;
          <FaArrowCircleRight style={{ marginBottom: "4px" }} />
        </span>
      </div>
    </div>
  );
};

export default UserComponentCard;
