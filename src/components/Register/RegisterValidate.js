import React, { Component } from "react";
import { Formik } from "formik";
import RegisterForm from "../../components/Register/RegisterForm";

export default class Validate extends Component {
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
