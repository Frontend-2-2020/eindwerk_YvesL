import React, { Component } from "react";
import { Form, Field } from "formik";
import "./LoginForm.css";
import CustomErrorMessage from "../Forms/CustomErrorMessage";
import { FaFacebookF, FaGoogle } from "react-icons/fa";


export default class loginForm extends Component {
  render() {
    return (
      <div className="container">
        
        <div className="content">
          <Form>
            <h4 htmlFor="username">Email <span>*</span></h4>
            <Field type="email" name="username" />
            <CustomErrorMessage name="username" />
            <br />

            <h4 htmlFor="password">Password <span>*</span></h4>
            <input type="password" name="password" />

            <div>
              <input
                type="submit"
                value="Log in"
                className=" login btn btn-outline-dark"
              />
            </div>

            <button className="media fb">
              <div style={{ margin: "auto" }}>
                <FaFacebookF />
              </div>
            </button>
            <button className="media g">
              <div style={{ margin: "auto" }}>
                <FaGoogle />
              </div>
            </button>
          </Form>
        </div>
      </div>
    );
  }
}
