import React, { Component } from "react";
import { API } from "../../config/API";
import { withRouter } from "react-router";
import { Formik } from "formik";
import RegisterForm from "../Forms/RegisterForm";

class RegisterComponent extends Component {
  state = {
    color: "",
  };

  ////CREATING A USER ,ALL FIELDS ARE REQUIRED AND DETERMINED BY THE API////////
  register = (values) => {
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

  ///// COLOR PICKED WITH SWTCHESPICKER GETS STORED IN DE STATE/////////
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

////USED WITHROUTER TO GET ACCES TO HISTORY TO REDIRECT TO THE LOGIN/////
export default withRouter(RegisterComponent);
