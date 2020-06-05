import React, { Component } from "react";
import { ErrorMessage } from "formik";
import PropTypes from "prop-types";

class CustomErrorMessage extends Component {
  render() {
    return (
      <ErrorMessage
        name={this.props.name}
        render={(error) => (
          <small className="error" style={{ color: "red" }}>
            {error}
          </small>
        )}
      />
    );
  }
}

export default CustomErrorMessage;

CustomErrorMessage.propTypes = {
  name: PropTypes.string,
};
