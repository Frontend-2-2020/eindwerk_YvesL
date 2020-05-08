import React, { Component } from "react";
import { API, TOKEN } from "../../config/API";
//import classes from "./LoginComponent.module.css";
import LoginValidate from "../Forms/LoginValidate";

class LoginComponent extends Component {
  _isMounted = true;
  state = {
    user: "",
  };

  componentDidMount() {
    if (TOKEN) {
      //////IF WE HAVE A TOKEN ,COMPONENTDIDMOUNT WILL EXECUTE THE AXIOS CALL/////////
      this.getUserData();
    }
  }

  getUserData = () => {
    /////BECAUSE WE GET THE CURRENT LOGGED IN PERSON HERE WE NEED AUTHORIZATION (TOKEN)//////
    API.get("api/user")
      .then((response) => {
        //////PUSH THE RESPONSE.DATA IN DE STATE.USER WITH SETSTATE/////
        this.setState({
          user: response.data,
        });
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  login = () => {
    console.log("loggedIn");
    /////CLIENT_ID EN CLIENT_SECRET IS PROVIDED BY THE API (ITC JANNICK)//////
    ////API CALL NAAR "API + OAUTH/TOKEN" , ALL FIEDS ARE REQUIRED FOR OATH2///////
    API.post("oauth/token", {
      grant_type: "password",
      client_id: 2,
      client_secret: "iwrHFPcaiQ3bZTzHEwQpYkpiuHUlbIOJ9SAI6DLI",
      username: document.querySelector("[name=login_email]").value,
      password: document.querySelector("[name=login_password]").value,
    }).then((response) => {
      ////STORING OUR TOKEN IN THE APPLICATION'S LOCAL STORAGE//////
      window.localStorage.setItem(
        "yves_acces_token",
        response.data.access_token
      );

      // Om vanaf nu onze API requests te voorzien van een token moeten we dit als volgt instellen.
      // Volgende refresh is dit niet meer nodig want dan doen we exact dit in de API.js
      API.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.access_token;

      ///////NOW THAT WE HAVE AN ACCES TOKEN WE CAN RUN THE AXIOS CALL TO GET THE POSTS
      this.getUserData();
    });
  };

  //////ON LOGOUT WE REMOVE THE TOKEN FROM THE LOCAL STORAGE////////
  logout = () => {
    window.localStorage.removeItem("yves_acces_token", undefined);
    API.defaults.headers.common["Authorization"] = undefined;
    this.setState({ user: undefined });
    console.log("loggedout");
  };

  render() {
    // const { user } = this.state;
    // const ledlights = (
    //   <div className={classes.led}>
    //     <h1>Login</h1>
    //     {user ? (
    //       <div className={classes.loggedIn}>
    //         <div className={classes.ledgreen}></div>
    //       </div>
    //     ) : (
    //       <div className={classes.loggedOut}>
    //         <div className={classes.ledred}></div>
    //       </div>
    //     )}
    //   </div>
    // );

    return (
      <LoginValidate submit={this.login} />
      /* <div className={classes.LoginField}>
        {ledlights}
        <p>
          <label htmlFor="email">email</label>
          <input type="text" placeholder="email" name="login_email" />
        </p>
        <p>
          <label htmlFor="password">password</label>
          <input type="password" placeholder="password" name="login_password" />
        </p>
         message when logged in 
        {user ? (
          <div>
            <p>
              <strong>{user.first_name}</strong> you are now logged in
            </p>
            <button className="btn btn-outline-dark" onClick={this.logout}>
              logout
            </button>
          </div>
        ) : (
          <div>
            <p>Log in to place a new post</p>
            <button className="btn btn-outline-dark" onClick={this.login}>
              Login
            </button> 
          </div>
        )} */

      /* <button onClick={this.login}>login</button>
        <button onClick={this.logout}>logout</button> */
      //</div>
    );
  }
}

export default LoginComponent;
