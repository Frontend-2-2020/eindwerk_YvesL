import React from "react";
import { Link } from "react-router-dom";
import classes from "./CardComponent.module.css";
import {
  FaWhatsapp,
  FaThumbsUp,
  FaThumbsDown,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaRegComment,
  FaCommentMedical,
} from "react-icons/fa";
//import { FiShare } from "react-icons/fi";
import moment from "moment";

import $ from "jquery";

const CardComponent = (props) => {
  $(document).ready(function () {
    // $(".slidedown").hide();

    $(".commentb").click(() => {
      $(".slidedown").slideToggle();
    });
  });

  return (
    <div className={classes.card}>
      <div className="card-body">
        <div className={classes.cardheader}>
          <img src={props.avatar} alt="profile pic" />
          <h3>{props.title}</h3>

          <div className={classes.posted}>
            <div className="btn">
              {" "}
              <Link to={"/user/" + props.id}>
                <button id="follow-button">+ Profile</button>
              </Link>
            </div>

            <div className={classes.timediv}>
              <p style={{ margin: 10 }}>
                <span style={{ color: "black" }}>
                  Posted by <Link to={"/user/" + props.id}>{props.name} </Link>
                  on{""}
                </span>
              </p>
              <div style={{ margin: 10, color: "grey" }}>
                {moment(props.timestamp).format("llll")}
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className="card-body">
          <div className="hidePost"> </div>

          <div className={classes.readpost}>
            {" "}
            <Link to={"/detail/" + props.postid}>
              <button className="btn btn-outline-dark">Read Full post</button>
            </Link>
          </div>
          <div className={classes.cardtext}>{props.body}</div>

          <div
            className="commentsAndLikes"
            style={{ display: "flex", justifyContent: "space-between " }}
          >
            <div className={classes.commentbox}>
              {/* <Link to={"/detail/" + props.postid}> */}
              <FaRegComment /> {props.comments} Comments
              {/* </Link> */}
              <FaCommentMedical /> Add Comment
            </div>
            {/* <p className="slidedown">hello</p> */}
            <div className={classes.likebox}>
              <FaThumbsUp />
              <FaThumbsDown />
            </div>
          </div>
        </div>
        <hr />
        <div className={classes.cardfooter}>
          <div className={classes.socialbox}>
            <FaWhatsapp />
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardComponent;
