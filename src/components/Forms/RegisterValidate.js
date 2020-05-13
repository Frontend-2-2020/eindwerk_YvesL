import React, { Component } from "react";
import { Formik } from "formik";
import RegisterForm from "../Forms/RegisterForm";

export default class Validate extends Component {
  validateHandler = (values) => {
    console.log("reg validated");
    const errors = {};
    const requiredFields = ["firstname", "lastname", "email"];

    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = field + " is required";
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
            firstname: "",
            lastname: "",
            email: "",
            color: "#fff",
          }}
        >
          {(props) => <RegisterForm {...props} />}
        </Formik>
      </div>
    );
  }
}
