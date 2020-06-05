import React, { Component } from "react";
import { Form, Field } from "formik";
import { SketchPicker } from "react-color";
import "./RegisterForm.css";
import CustomErrorMessage from "../Forms/CustomErrorMessage";

export default class componentName extends Component {
  render() {
    return (
      <Form>
        <section className="login-panel">
          <div className="right-side">
            <h1>Register</h1>

            <p htmlFor="first_name">
              first_name <span>*</span>
            </p>
            <Field type="text" name="firstname" />
            <CustomErrorMessage name="firstname" />
            <br />
            <br />

            <p htmlFor="last_name">
              last_name <span>*</span>
            </p>
            <Field type="text" name="lastname" />
            <CustomErrorMessage name="lastname" />
            <br />
            <br />

            <p htmlFor="email">
              email <span>*</span>
            </p>
            <Field type="email" name="email" />
            <CustomErrorMessage name="email" />
            <br />
            <br />

            <p htmlFor="password">password</p>
            <input type="password" name="password" />
          </div>
          <div className="left-side">
            <p htmlFor="favorite_color">Pick your favorite_color</p>

            <SketchPicker
              color={this.props.color}
              onChangeComplete={this.props.click}
            />

            <input type="submit" value="Sign Up" className="submit-btn" />
          </div>
        </section>
      </Form>
    );
  }
}
