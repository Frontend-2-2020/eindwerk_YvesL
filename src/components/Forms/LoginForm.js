import React, { Component } from "react";
import { Form, Field } from "formik";
import "./LoginForm.css";
import CustomErrorMessage from "../Forms/CustomErrorMessage";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

export default class loginForm extends Component {
  render() {
    //const { user } = this.props;
    //console.log(user);
    // const ledlights = (
    //   <div className="led">
    //     {user ? (
    //       <div className="loggedIn">
    //         <div className="ledgreen"></div>{" "}
    //       </div>
    //     ) : (
    //       <div className="loggedOut">
    //         {" "}
    //         <div className="ledred"></div>
    //       </div>
    //     )}
    //   </div>
    // );

    return (
      <div className="con">
        {/* {ledlights} */}
        <div className="content-con">
          <Form>
            <label htmlFor="username">email</label>
            <Field type="email" name="username" />
            <CustomErrorMessage name="username" />
            <br />

            <label htmlFor="password">password</label>
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
