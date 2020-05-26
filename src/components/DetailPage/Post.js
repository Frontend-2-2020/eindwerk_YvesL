import React from "react";
import { Trashcan } from "../../ui/helpers/Trashcan";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Post = (props) => {
  console.log(props.first_name);

  return (
    <div>
      <h1 className="headers">{props.first_name}</h1>
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
              <h3 className="card-title pt-1">{props.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: props.body }}></p>
              <hr style={{ width: "40%" }} />
              <p>
                <strong>posted on:</strong>
                {moment(props.created_at).format("llll")}
              </p>
              <p>
                <strong>updated on:</strong>
                {moment(props.updated_at).format("llll")}
              </p>

              {props.first_name === props.user.first_name ? (
                <span onClick={props.delete}>
                  {" "}
                  <Trashcan />
                </span>
              ) : (
                <div style={{ opacity: "0.3" }}>
                  <Trashcan />
                </div>
              )}
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

export default connect(mapStateToProps)(Post);

Post.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  body: PropTypes.string,
  iduser: PropTypes.number,
  author: PropTypes.string,
  comment: PropTypes.array,
  created: PropTypes.instanceOf(Date),
  updated: PropTypes.instanceOf(Date),
};