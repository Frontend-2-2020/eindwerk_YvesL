import React, { Component } from "react";
import { API } from "../../config/API";
import LoginValidate from "../Forms/LoginValidate";
import { connect } from "react-redux";
import { loginAuth } from "../../redux/actions/authActions";
import { logoutAuth } from "../../redux/actions/authActions";

class LoginComponent extends Component {
  login = (values) => {
    /////CLIENT_ID EN CLIENT_SECRET IS PROVIDED BY THE API (ITC JANNICK)//////
    ////API CALL NAAR "API + OAUTH/TOKEN" , ALL FIEDS ARE REQUIRED FOR OATH2///////
    API.post("oauth/token", {
      grant_type: "password",
      client_id: 2,
      client_secret: "iwrHFPcaiQ3bZTzHEwQpYkpiuHUlbIOJ9SAI6DLI",
      username: document.querySelector("[name=username]").value,
      password: document.querySelector("[name=password]").value,
    }).then((response) => {
      ////STORING OUR TOKEN IN THE APPLICATION'S LOCAL STORAGE//////
      window.localStorage.setItem(
        "yves_acces_token",
        response.data.access_token
      );
      ////// PROVIDE OUR CALL WITH THE ACCES TOKEN SO WE DON'T NEED IT AGAIN AFTER REFRESH(API.JS)/////////
      API.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.access_token;
      ///////NOW THAT WE HAVE AN ACCES TOKEN WE CAN RUN THE AXIOS CALL TO GET THE POSTS
      this.props.loginAuth();
    });
  };

  ////ON LOGOUT WE REMOVE THE TOKEN FROM THE LOCAL STORAGE////////
  logout = () => {
    this.props.logoutAuth(); /////<-----LOGOUT FUNCTION FROM AUTH ACTIONS
  };

  render() {
    return (
      <div>
        <button
          className="logout"
          style={{ width: 100, float: "right", margin: 20 }}
          onClick={this.logout}
        >
          LOGOUT
        </button>
        <LoginValidate submit={this.login} {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAuth: () => dispatch(loginAuth()),
    logoutAuth: () => dispatch(logoutAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
