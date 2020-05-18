import React, { Component } from "react";
import RegisterComponent from "../components/Register/RegisterComponent";

class Register extends Component {
  render() {
    return <RegisterComponent {...this.props} />;
  }
}

export default Register;
