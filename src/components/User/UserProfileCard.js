import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./UserProfileCard.css";

const UserProfileCard = (props) => {
  return (
    <div className="container">
      <h3>User Profile {props.first_name}</h3>
      <div className="row">
        <div className="profile-card">
          <div className="profile-img">
            <img src={props.avatar} alt="avatar" />
          </div>
          <div className="profile-content">
            <h2 className="title">
              {props.firstname} {props.lastname}
              <span>{props.useremail}</span>
            </h2>
            <ul className="social-link">
              <li>
                <FaFacebook />
              </li>
              <li>
                <FaTwitter />
              </li>
              <li>
                <FaInstagram />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
