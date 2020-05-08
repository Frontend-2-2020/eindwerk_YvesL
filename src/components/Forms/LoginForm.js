import React, { Component } from "react";
import { Form, Field } from "formik";
import "./LoginForm.css";
import CustomErrorMessage from "../Forms/CustomErrorMessage";

export default class loginForm extends Component {
  render() {
    return (
      <Form>
        <section className="login-panel">
          <div className="right-side">
            <h1>Log In</h1>

            <label htmlFor="username">email</label>
            <Field type="email" name="login_email" />
            <CustomErrorMessage name="username" />
            <br />

            <label htmlFor="password">password</label>
            <input type="password" name="login_password" />
          </div>
          <div>
            <input
              type="submit"
              value="loggedIn"
              className="btn btn-outline-dark"
            />
          </div>
        </section>
      </Form>
    );
  }
}
