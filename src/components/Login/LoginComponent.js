import React, { Component } from "react";
//import { SwatchesPicker } from "react-color";
import { API, TOKEN } from "../../config/API";
import classes from "./LoginComponent.module.css";

class LoginComponent extends Component {
  state = {
    /////#FFF IS STORED AS DEFAULT IN THE INITIAL STATE
    color: "#fff",
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
    API.get("api/user").then((response) => {
      // Als dat lukt dan steken we die data in de state. Hiervoor was state.user dus undefined.
      this.setState({
        user: response.data,
      });
      console.log(response.data);
    });
  };

  login = () => {
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
    window.localStorage.setItem("yves_acces_token", undefined);
    API.defaults.headers.common["Authorization"] = undefined;
    this.setState({ user: undefined });
    console.log("loggedout");
  };

  render() {
    const { user } = this.state;

    return (
      <div className={classes.LoginField}>
        <h1>Login</h1>
        <p>
          {/* <label htmlFor="email">email</label> */}
          <input type="text" placeholder="email" name="login_email" />
        </p>

        <p>
          {/* <label htmlFor="password">password</label> */}
          <input type="password" placeholder="password" name="login_password" />
        </p>

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
        )}

        {/* <h1>Register</h1>

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

        <button onClick={this.register}>Register</button> */}

        {/* <button onClick={this.logout}>Logout</button> */}
      </div>
    );
  }
}

export default LoginComponent;

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
