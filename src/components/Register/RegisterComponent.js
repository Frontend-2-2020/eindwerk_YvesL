import React, { Component } from "react";
import { API } from "../../config/API";
import Validate from "../Forms/RegisterValidate";
import { registerAction } from "../../redux/actions/RegisterActions";
import { connect } from "react-redux";

class RegisterComponent extends Component {
  state = {
    color: "#FFFF",
  };

  register = (values) => {
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
      this.props.registerAction();
    });
  };

  render() {
    return (
      <div>
        <Validate submit={this.register} />;
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { register: state.register };
};

const mapDispatchToProps = (dispatch) => {
  return {
    RegisterAction: () => dispatch(registerAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
