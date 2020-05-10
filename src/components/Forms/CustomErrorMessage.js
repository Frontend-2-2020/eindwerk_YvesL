import React, { Component } from "react";
import { ErrorMessage } from "formik";

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
