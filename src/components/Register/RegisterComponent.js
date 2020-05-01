import React, { Component } from "react";
import { Form, Field, ErrorMessage } from "formik";

class RegisterComponent extends Component {
  render() {
    return (
      <Form className="">
        <div className="row mt-4">
          <div className="col">
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <Field
                type="text"
                name="firstname"
                className="form-control"
                id="firstname"
              />
              <ErrorMessage name="firstname"></ErrorMessage>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <Field
                type="text"
                name="lastname"
                className="form-control"
                id="lastname"
              />
              <ErrorMessage name="lastname"></ErrorMessage>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Email address</label>
              <Field
                type="email"
                className="form-control"
                name="email"
                placeholder="name@example.com"
              />
              <ErrorMessage name="email"></ErrorMessage>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Password</label>
              <Field type="password" className="form-control" name="password" />
              <ErrorMessage name="password"></ErrorMessage>
            </div>
          </div>
        </div>
        <input
          className="btn btn-primary float-right"
          type="submit"
          value="Submit"
        ></input>
      </Form>
    );
  }
}

export default RegisterComponent;

// handleChangeComplete = (color) => {
//   /////COLOR GETS STORED IN DE STATE/////////
//   this.setState({ color: color.hex });
// };

// register = () => {
//   //////HERE WE CREATE A USER ,REQUIRED FIELDS ARE DETERMINED BY THE API////////
//   API.post("api/users", {
//     first_name: document.querySelector("[name=first_name]").value,
//     last_name: document.querySelector("[name=last_name]").value,
//     email: document.querySelector("[name=email]").value,
//     password: document.querySelector("[name=password]").value,
//     favorite_color: this.state.color,
//     avatar:
//       "https://api.adorable.io/avatars/285/" +
//       document.querySelector("[name=email]").value,
//   }).then((response) => {
//     alert(response.statusText);
//   });
// };

/* <h1>Register</h1>

        <p>
          <label htmlFor="first_name">first_name</label>
          <input type="text" name="first_name" />
        </p>

        <p>
          <label htmlFor="last_name">last_name</label>
          <input type="text" name="last_name" />
        </p>

        <p>
          <label htmlFor="email">email</label>
          <input type="text" name="email" />
        </p>

        <p>
          <label htmlFor="password">password</label>
          <input type="password" name="password" />
        </p>

        <label htmlFor="favorite_color">favorite_color</label>
        <SwatchesPicker
          color={this.state.color}
          onChangeComplete={this.handleChangeComplete}
        />

        <br />
        <br />

        <button onClick={this.register}>Register</button> */
