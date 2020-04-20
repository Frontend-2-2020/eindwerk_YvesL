import React, { Component } from "react";
import "./PostComponent.css";
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
import $ from "jquery";

class PostComponent extends Component {
  componentDidMount() {
    $(".hidePostBtn").hide();
    $(".card-text").hide();
  }

  hidePostHandler = () => {
    $(".card-text").hide();
    $(".hidePostBtn").hide();
    $(".showPostBtn").show();
    console.log("hide");
  };
  showPostHandler = () => {
    $(".card-text").show();
    $(".hidePostBtn").show();
    $(".showPostBtn").hide();
    console.log("show");
  };
  render() {
    return (
      <div
        className="card"
        style={{
          display: "flex",
          width: "auto",
          height: "auto",
          margin: 20,
          borderRadius: "8px",
          boxShadow: "4px 6px 10px #95AFF9",
        }}
      >
        <div className="card-body">
          <div
            className="card-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "0 3px 8px #B5ABA9",
              /* backgroundColor: "#B9C4E1", */
            }}
          >
            <img
              src={picture}
              alt="profile pic"
              style={{ width: 120, height: 160 }}
            />
            <h3 style={{ fontFamily: "Lobster" && "cursive" }}>Topic</h3>
            <div
              className="posted"
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "space-between",
              }}
            >
              <div className="btn">
                {" "}
                <button id="follow-button">+ Follow</button>
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
                  3 hours ago
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div className="card-body">
            <div className="hidePost">
              {" "}
              <button
                className="hidePostBtn"
                style={{
                  borderRadius: 5,
                  border: "1px solid red ",
                  color: "red",
                }}
                onClick={this.hidePostHandler}
              >
                hide Post
              </button>
            </div>
            <div
              className="readPost"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {" "}
              <button
                className="showPostBtn"
                style={{
                  borderRadius: 5,
                  border: "1px solid  green ",
                  color: "green",
                  justifyContent: "center",
                }}
                onClick={this.showPostHandler}
              >
                Read Blogpost
              </button>
            </div>
            <div className="card-text" style={{ marginBottom: 20 }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Reprehenderit quaerat nemo nisi obcaecati ratione excepturi, sint
              labore quibusdam eaque magni ipsa dolor possimus facilis iste
              vitae veniam aperiam distinctio id.Iusto rem ducimus illo esse.
              Quas architecto enim quaerat dicta nihil vel ullam possimus
              corporis dolore magni a ducimus, quos, dolorem optio eos!
              Similique, aut beatae vero eaque assumenda iure!
            </div>

            <div
              className="commentsAndLikes"
              style={{ display: "flex", justifyContent: "space-between " }}
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
            className="card-footer"
            style={{
              margin: 10,
              boxShadow: "0 3px 8px #B5ABA9",
              //backgroundColor: "#B9C4E1",
            }}
          >
            <div
              className="likebox"
              style={{ display: "flex", justifyContent: "space-between" }}
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
