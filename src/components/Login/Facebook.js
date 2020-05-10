import React, { Component } from "react";

class Facebook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
    };

    window.fbAsyncInit = this.init;

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  init = () => {
    window.FB.init({
      appId: "2501851989916558",
      cookie: true,
      xfbml: true,
      version: "v7.0",
    });
    this.getlogin();
  };

  getlogin = () => {
    window.FB.getLoginStatus((response) => {
      if (response.status === "connected") {
        console.log(response);
        console.log("ingelogd");
      } else {
        console.log("niet ingelogd");
        console.log(response);
      }
    });
  };

  getUserData = () => {
    window.FB.api(
      "/me",
      (response) => {
        this.setState({ user: response });
      },
      { fields: "first_name,last_name,email,gender" }
    );
  };

  login = () => {
    window.FB.login((response) => {
      this.getlogin();
      this.getUserData();
      this.props.loginfb();
    }, {});
  };

  logout = () => {
    window.FB.logout((response) => {
      this.getlogin();
    }, {});
  };

  render() {
    const { user } = this.state;
    console.log(user);
    const showName = (
      <div>
        <strong>
          {user.first_name}
          {""}
          {user.last_name}
        </strong>
        <p>is now logged in via Facebook</p>
      </div>
    );

    const hideName = <p>You are logged out</p>;
    const output = user ? showName : hideName;

    return (
      <div>
        {output}
        <button onClick={this.login}>Login</button>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Facebook;
