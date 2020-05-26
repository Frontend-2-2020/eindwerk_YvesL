import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./UsersProfile.css";
import PropTypes from "prop-types";

const UsersProfile = (props) => {
  console.log(props);
  return (
    <div className="profile">
      <h3>User Profile {props.first_name}</h3>
      <hr />
      <div className="row">
        <div className="profile-card">
          <div className="profile-img">
            <img src={props.avatar} alt="avatar" />
          </div>
          <div className="profile-content">
            <h2 className="title">
              {props.first_name} {props.last_name}
              <span>{props.email}</span>
              <p>Favourite color :</p>
              <p
                className="col"
                style={{
                  height: 40,
                  width: 40,
                  margin: "0px auto",
                  backgroundColor: props.favorite_color,
                  border: "1px solid black",
                }}
              ></p>
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

export default UsersProfile;

UsersProfile.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  avatar: PropTypes.string,
  email: PropTypes.string,
  favorite_color: PropTypes.string,
};
