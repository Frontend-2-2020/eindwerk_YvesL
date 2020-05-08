import React, { Component } from "react";
import { Formik } from "formik";
import LoginForm from "../Forms/LoginForm";

export default class Validate extends Component {
  validateHandler = (values) => {
    console.log("validated");
    const errors = {};
    const requiredFields = ["username"];

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
          onSubmit={this.props.submit}
          validate={this.validateHandler}
          initialValues={{
            login_email: "",
          }}
        >
          {(props) => <LoginForm {...props} />}
        </Formik>
      </div>
    );
  }
}
