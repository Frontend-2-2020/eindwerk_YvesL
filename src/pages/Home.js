import React from "react";
import PostComponent from "../components/PostComponent/PostComponent";
import PostComponentSmall from "../components/PostComponent/PostComponentSmall";
import {
  FaInstagram,
  FaCodepen,
  FaGooglePlay,
  FaLinkedin,
  FaFacebookSquare,
  FaTwitter,
} from "react-icons/fa";
import "./Home.css";

function Home() {
  return (
    <div>
      <div className="parallax"></div>

      <div
        style={{
          display: "flex",
          boxShadow: "4px 6px 10px #95AFF9",
          width: "80%",
          margin: "0px auto",
        }}
      >
        <div
          className="social"
          style={{
            position: "fixed",
            left: "20px",
            top: "30%",
            display: "flex",
            flexDirection: "column",
            fontSize: "1.8rem",
          }}
        >
          <a href="https://www.instagram.com">
            <FaInstagram />
          </a>
          <a href="https://www.codepen.io">
            <FaCodepen />
          </a>
          <a href="https://www.googleplus.com">
            <FaGooglePlay />
          </a>
          <a href="https://www.linkedin.com">
            <FaLinkedin />
          </a>
          <a href="https://www.facebook.com">
            <FaFacebookSquare />
          </a>
          <a href="https://www.twitter.com">
            <FaTwitter />
          </a>
        </div>
        <div style={{ flex: 2, margin: 15, height: "auto" }}>
          <PostComponent />
          <PostComponent />
          <PostComponent />
          <PostComponent />
          <PostComponent />
          <PostComponent />
          <PostComponent />
        </div>
        <div style={{ flex: 0.5, margin: 25, height: "auto" }}>
          <PostComponentSmall />
          <PostComponentSmall />
          <PostComponentSmall />
        </div>
      </div>
      <div className="parallax"></div>
    </div>
  );
}

export default Home;
