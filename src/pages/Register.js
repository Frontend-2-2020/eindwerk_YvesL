import React, { Component } from "react";
import RegisterComponent from "../components/Register/RegisterComponent";
import { Formik } from "formik";
import { connect } from "react-redux";
import { registerAction } from "../redux/actions/authActions";

class Register extends Component {
  subimitHandler = () => {
    const registerValues = {
      first_name: document.querySelector("[name=firstname]").value,
      last_name: document.querySelector("[name=lastname]").value,
      email: document.querySelector("[name=email]").value,
      password: document.querySelector("[name=password]").value,
      favorite_color: "#f9a373",
      avatar:
        "https://api.adorable.io/avatars/285/" +
        document.querySelector("[name=email]").value,
    };

    this.props.registerAction(registerValues, this.props.history);
  };

  validateHandler = (values) => {
    const errors = {};
    const requiredFields = ["firstname", "lastname", "email"];

    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = "required";
      }
    });
    return errors;
  };

  render() {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Register Form</h1>
        <Formik
          onSubmit={this.subimitHandler}
          validate={this.validateHandler}
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
          }}
        >
          <RegisterComponent />
        </Formik>
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  return {};
};

const MapDispatchToProps = (dispatch) => {
  return {
    registerAction: (registerValues, history) =>
      dispatch(registerAction(registerValues, history)),
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(Register);
