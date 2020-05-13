import React, { Component } from "react";
import { Form, Field } from "formik";
import { SwatchesPicker } from "react-color";
import "./RegisterForm.css";
import CustomErrorMessage from "../Forms/CustomErrorMessage";

export default class componentName extends Component {
  state = {
    color: "#fff",
  };

  handleChangeComplete = (color) => {
    ///// COLOR PICKED WITH SWTCHESPICKER GETS STORED IN DE STATE/////////
    this.setState({ color: color.hex });
  };
  render() {
    return (
      <Form>
        <section className="login-panel">
          <div className="right-side">
            <h1>Sign Up</h1>

            <label htmlFor="first_name">
              first_name <span>*</span>
            </label>
            <Field type="text" name="firstname" />
            <CustomErrorMessage name="firstname" />
            <br />
            <br />

            <label htmlFor="last_name">
              last_name <span>*</span>
            </label>
            <Field type="text" name="lastname" />
            <CustomErrorMessage name="lastname" />
            <br />
            <br />

            <label htmlFor="email">
              email <span>*</span>
            </label>
            <Field type="email" name="email" />
            <CustomErrorMessage name="email" />
            <br />
            <br />

            <label htmlFor="password">password</label>
            <input type="password" name="password" />
          </div>
          <div className="left-side">
            <label htmlFor="favorite_color">Pick your favorite_color</label>
            <SwatchesPicker
              color={this.state.color}
              onChangeComplete={this.handleChangeComplete}
            />
            <input type="submit" value="let's go" className="submit-btn" />
          </div>
        </section>
      </Form>
    );
  }
}
