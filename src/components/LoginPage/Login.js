import React, { Component } from "react";
import { API } from "../../config/API";
import { Formik } from "formik";
import { connect } from "react-redux";
import { loginAuth } from "../../redux/actions/authActions";
import LoginForm from "../Forms/LoginForm";

class Login extends Component {
  login = (values, { resetForm }) => {
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
      resetForm(values);
    });
  };

  validateHandler = (values) => {
    console.log("validated");
    const errors = {};
    const requiredFields = ["username", "password"];

    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = "required";
      }
    });
    return errors;
  };

  render() {
    return (
      <div>
        <Formik
          onSubmit={this.login}
          validate={this.validateHandler}
          initialValues={{
            username: "",
            password: "",
          }}
        >
          {(props) => <LoginForm {...props} />}
        </Formik>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
