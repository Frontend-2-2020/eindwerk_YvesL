import React, { Component } from "react";
import RegisterComponent from "../components/Register/RegisterComponent";
import { connect } from "react-redux";
import { registerAction } from "../redux/actions/authActions";

class Register extends Component {
  render() {
    return (
      <div className="container">
        <RegisterComponent {...this.props} />
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  return {};
};

const MapDispatchToProps = (dispatch) => {
  return {
    registerAction: (registerValues, history) =>
      dispatch(registerAction(registerValues, history)),
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(Register);
