import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Profile.css";
import PropTypes from "prop-types";

const Profile = (props) => {
  console.log(props);
  return (
    <div className="profile">
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
                  borderRadius: "50%",
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

export default Profile;

Profile.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  avatar: PropTypes.string,
  email: PropTypes.string,
  favorite_color: PropTypes.string,
};
