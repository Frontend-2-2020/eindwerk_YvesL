import React, { Component } from "react";
import { Formik } from "formik";
import Form from "./Form";

export default class Validate extends Component {
  validate = (values) => {
    const errors = {};
    const requiredFields = ["body"];
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
          validate={this.validate}
          initialValues={{
            title: "",
            body: "",
          }}
        >
          {(props) => (
            <Form
              {...props}
              buttonTxt={this.props.btnTxt}
              formTxt={this.props.formTxt}
            />
          )}
        </Formik>
      </div>
    );
  }
}
