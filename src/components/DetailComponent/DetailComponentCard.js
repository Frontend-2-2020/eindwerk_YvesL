import React from "react";
import "./DetailComponent.css";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import moment from "moment";

const DetailComponentCard = (props) => {
  return (
    <div>
      <div className="row pt-5 mt-30 ">
        <div className="col-lg-4 col-sm-6 mb-30 pb-5 m-auto">
          <div className="card" href="http">
            <div
              className="box-shadow bg-white rounded-circle mx-auto text-center"
              style={{ width: "90px", height: "90px", marginTop: "-45px" }}
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
                {props.title} {props.name}
              </h3>
              <p className="card-text text-sm">
                {props.body} {props.email}
              </p>
              <Link to={"/user/" + props.iduser}>
                <p> {props.author}</p>
              </Link>

              <ul style={{ padding: "1rem" }}>{props.comment}</ul>
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
        </div>
      </div>
    </div>
  );
};

export default DetailComponentCard;
