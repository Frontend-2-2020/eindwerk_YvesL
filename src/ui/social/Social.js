import React from "react";
import classes from "./Social.module.css";
import {
  FaInstagram,
  FaCodepen,
  FaGooglePlay,
  FaLinkedin,
  FaFacebookSquare,
  FaTwitter,
} from "react-icons/fa";

function Social() {
  return (
    <div className={classes.social}>
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
  );
}

export default Social;
