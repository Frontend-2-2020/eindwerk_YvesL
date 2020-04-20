import React, { Component } from "react";
import "./PostComponentSmall.css";
import picture from "../../assets/images/yves_sitting.JPG";

import {
  FaWhatsapp,
  FaThumbsUp,
  FaThumbsDown,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaRegComment,
} from "react-icons/fa";
import { FiShare } from "react-icons/fi";

class PostComponent extends Component {
  render() {
    return (
      <div
        className="cardsmall"
        /* style={{
        
        }} */
      >
        <div className="card-bodysmall">
          <div
            className="card-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "0 3px 8px #B5ABA9",
              //backgroundColor: "#B9C4E1",
            }}
          >
            <img
              src={picture}
              alt="profile pic"
              style={{ width: 80, height: 80 }}
            />
            {/* <h3 style={{ fontFamily: "Lobster" && "cursive" }}>Topic</h3> */}
            <div
              className="postedsmall"
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "space-between",
                //marginLeft: "15px",
              }}
            >
              <div className="btn">
                {" "}
                <button className="follow-button">+ Follow</button>
              </div>

              <div
                style={{
                  display: "flex",
                  color: "grey",
                }}
              >
                <p style={{ margin: 10 }}>
                  <span style={{ color: "black" }}>
                    Posted by <a href="https://">Yves</a>{" "}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div className="card-bodysmall">
            {/* <div
              className="card-text"
              style={{ marginBottom: 20, color: "white" }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Reprehenderit quaerat nemo nisi obcaecati ratione excepturi, sint
              labore quibusdam eaque magni ipsa dolor possimus facilis iste
              vitae veniam aperiam distinctio id.Iusto rem ducimus illo esse.
              Quas architecto enim quaerat dicta nihil vel ullam possimus
              corporis dolore magni a ducimus, quos, dolorem optio eos!
              Similique, aut beatae vero eaque assumenda iure!
            </div> */}

            <div
              className="commentsAndLikes"
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "space-between ",
              }}
            >
              <div className="comment-box" style={{ color: "#9E9A99" }}>
                <FaRegComment style={{ margin: 10 }} />
                33 Comments
                <FiShare style={{ margin: 10 }} />
                Share
              </div>
              <div className="like-box">
                <FaThumbsUp style={{ margin: 10 }} />
                <FaThumbsDown style={{ margin: 10 }} />
              </div>
            </div>
          </div>
          <hr />
          <div
            className="card-footerSmall"
            style={{ margin: 10, boxShadow: "0 3px 8px #B5ABA9" }}
          >
            <div
              className="likebox"
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <FaWhatsapp />
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostComponent;
