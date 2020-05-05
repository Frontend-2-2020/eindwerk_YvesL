import React, { Component } from "react";
import { API } from "../../config/API";
import Validate from "../../components/Register/RegisterValidate";

class RegisterComponent extends Component {
  // state = {
  //   color: "#fff",
  // };
  register = () => {
    //////HERE WE CREATE A USER ,REQUIRED FIELDS ARE DETERMINED BY THE API////////
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
      alert(response.statusText);
    });
  };

  render() {
    return <Validate submit={this.register} />;
  }
}

export default RegisterComponent;
