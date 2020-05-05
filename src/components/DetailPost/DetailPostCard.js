import React from "react";
// import "./DetailCard.css";
import { Link } from "react-router-dom";
import { Trashcan } from "../../ui/helpers/Trashcan";
import moment from "moment";

const DetailPostCard = (props) => {
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

              <strong dangerouslySetInnerHTML={{ __html: props.body }}></strong>
              <Link to={"/user/" + props.iduser}>
                <p> {props.author}</p>
              </Link>

              <ul style={{ padding: "1rem" }}>{props.comment}</ul>
              <hr style={{ width: "40%" }} />
              <p>
                <strong>posted on:</strong>
                {moment(props.created).format("llll")}
              </p>
              <p>
                <strong>updated on:</strong>
                {moment(props.updated).format("llll")}
              </p>
              <span onClick={props.clicked}>
                <Trashcan />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPostCard;
