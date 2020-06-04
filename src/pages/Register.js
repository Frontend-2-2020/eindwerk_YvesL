import React, { Component } from "react";
import { API } from "../config/API";
import { withRouter } from "react-router";
import { Formik } from "formik";
import RegisterForm from "../components/Forms/RegisterForm";

class Register extends Component {
  state = {
    color: "",
  };

  ////CREATING A USER ,ALL FIELDS ARE REQUIRED AND DETERMINED BY THE API////////
  register = (values, { resetForm }) => {
    API.post("api/users", {
      first_name: document.querySelector("[name=firstname]").value,
      last_name: document.querySelector("[name=lastname]").value,
      email: document.querySelector("[name=email]").value,
      password: document.querySelector("[name=password]").value,
      favorite_color: this.state.color,
      avatar:
        "https://api.adorable.io/avatars/285/" +
        document.querySelector("[name=email]").value,
    }).then((response) => {
      alert(
        response.statusText +
          "Your account has been created, please login to continue"
      );
      this.props.history.push("/login");
      resetForm(values);
    });
  };

  //////VALIDATION///////////////////
  validateHandler = (values) => {
    const errors = {};
    const requiredFields = ["firstname", "lastname", "email"];

    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = field + " is required";
      }
    });
    return errors;
  };

  ///// COLOR PICKED WITH SWATCHESPICKER GETS STORED IN DE STATE/////////
  ///// AND ADDED AS A VALUE TO THE FAVOURITE_COLOR KEY/////////////////
  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
  };

  render() {
    console.log(this.state.color);
    return (
      <div>
        <Formik
          onSubmit={this.register}
          validate={this.validateHandler}
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            color: "",
          }}
        >
          {(props) => (
            <RegisterForm
              {...props}
              click={this.handleChangeComplete}
              color={this.state.color}
            />
          )}
        </Formik>
      </div>
    );
  }
}

////HOC WITHROUTER TO GET ACCES HISTORY PROPS AND REDIRECT TO LOGIN/////
export default withRouter(Register);
