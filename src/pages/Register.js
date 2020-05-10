import React, { Component } from "react";
import RegisterComponent from "../components/Register/RegisterComponent";

class Register extends Component {
  render() {
    return (
      <div className="container">
        <RegisterComponent {...this.props} />
      </div>
    );
  }
}

export default Register;
