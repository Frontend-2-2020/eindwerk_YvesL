import React from "react";
import { Trashcan } from "../../ui/helpers/Trashcan";
import { connect } from "react-redux";
import HeartIcon from "../../ui/helpers/HeartIcon";
import PropTypes from "prop-types";
import moment from "moment";

const DetailCard = (props) => {
  const { user } = props.user;
  const { likes } = props;

  const likedBy = likes.map((like) => (
    <li key={like.id} style={{ display: "flex" }}>
      {like.user.first_name} {like.user.last_name}
    </li>
  ));

  return (
    <div>
      <div className="row pt-5 mt-30 ">
        <div className="col-lg-8 col-sm-6 mb-1 pb-1 m-auto">
          <div className="card">
            <div
              className="head"
              style={{
                backgroundColor: "lightgrey",
                padding: "10",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                className="name"
                style={{
                  textAlign: "left",
                  margin: "20px 20px",
                  flex: "1",
                }}
              >
                {props.first_name} {props.last_name}
              </p>

              <div
                className=" bg-white rounded-circle mx-auto text-center"
                style={{
                  width: "90px",
                  height: "90px",
                  marginTop: "-45px auto",
                }}
              >
                <img
                  src={props.avatar}
                  style={{
                    fontSize: "3.5rem",
                    borderRadius: "50px",
                    padding: 10,
                    flex: "1",
                  }}
                  alt="avatar"
                />
              </div>
              <p
                style={{
                  textAlign: "right",
                  flex: "1",
                  margin: "20px 20px",
                }}
              >
                {moment(props.dateposted).format("llll")}
              </p>
            </div>

            <div className="card-body text-center">
              <h3 className="card-title pt-1 mb-3">{props.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: props.body }}></p>
              <hr style={{ width: "40%" }} />

              <p>
                <strong>updated on:</strong>
                {moment(props.updated_at).format("llll")}
              </p>
              {/* ////FADE TRASHCAN WHEN USER IS NOT LOGGED IN USER ////// */}
              {user !== undefined && user.first_name === props.first_name ? (
                <span onClick={props.delete}>
                  {" "}
                  <Trashcan />
                </span>
              ) : (
                <div style={{ opacity: "0.3" }}>
                  <Trashcan />
                </div>
              )}
              <hr style={{ width: "60vw", backgroundColor: "black" }} />
              <div
                style={{
                  display: "flex",
                  flexFlow: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* //////LIKES AND COMMENTS DISPLAYED IN DETAILCARD////// */}
                <div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ display: "flex" }}
                  >
                    <HeartIcon />{" "}
                    <span
                      className="badge badge-light"
                      style={{ margin: "5px" }}
                    >
                      {props.likes.length}
                    </span>
                  </button>
                  <ul>{likedBy}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(DetailCard);

DetailCard.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  body: PropTypes.string,
  iduser: PropTypes.number,
  author: PropTypes.string,
  comment: PropTypes.array,
  created: PropTypes.instanceOf(Date),
  updated: PropTypes.instanceOf(Date),
};
