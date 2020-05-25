import React from "react";
import { Link } from "react-router-dom";
import { Trashcan } from "../../ui/helpers/Trashcan";
import moment from "moment";
import { API } from "../../config/API";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

const CommentPostCard = (props) => {
  const deleteComment = () => {
    console.log("delete");

    API.delete("api/comments/" + props.id)
      .then((res) => alert("Comment" + props.id + "has been deleted" + res))
      .catch((err) =>
        alert(
          "You are not Authorized to delete a comment from another user" + err
        )
      )
      .then(() => props.history.push("/"));
  };

  const { user } = props;

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
                src={user.avatar}
                style={{
                  fontSize: "3.5rem",
                  borderRadius: "10px",
                }}
                alt="avatar"
              />
            </div>
            <div className="card-body text-center">
              <h3 className="card-title pt-1">
                <Link to={"/user/" + user.id}>{user.first_name}</Link>
                <p>commented with</p>
              </h3>
              <br />
              <hr style={{ width: "80%", backgroundColor: "green" }} />
              <strong dangerouslySetInnerHTML={{ __html: props.body }}></strong>
              <hr style={{ width: "80%", backgroundColor: "green" }} />
              <p>
                <strong>posted on:</strong>
                {moment(props.created_at).format("llll")}
              </p>
              <p>
                <strong>updated on:</strong>
                {moment(props.updated_at).format("llll")}
              </p>
              {/* <span onClick={props.clicked}>
                <Trashcan />
              </span> */}
              {user.first_name === "Yves" ? (
                <span onClick={() => deleteComment()}>
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

export default withRouter(CommentPostCard);

CommentPostCard.propTypes = {
  first_name: PropTypes.string,
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  body: PropTypes.string,
  author: PropTypes.string,
  comment: PropTypes.array,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
};
