import React, { Component } from "react";
import { API } from "../../config/API";
import Validate from "../Forms/RegisterValidate";
import { withRouter } from "react-router";

class RegisterComponent extends Component {
  state = {
    color: "#FFFF",
  };

  register = (values) => {
    //////HERE WE CREATE A USER ,ALL FIELDS ARE REQUIRED AND DETERMINED BY THE API////////
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
      this.props.history.push("/login");
    });
  };

  render() {
    console.log(this.props.history);
    return (
      <div>
        <Validate submit={this.register} />;
      </div>
    );
  }
}
////USED COMPOSE TO USE WITHROUTER IN COMBINATION WITH CONNECT
export default withRouter(RegisterComponent);
