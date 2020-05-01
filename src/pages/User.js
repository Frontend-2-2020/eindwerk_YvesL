import React, { Component } from "react";
import Users from "../components/User/Users";

export class User extends Component {
  render() {
    console.log(this.props.match.params.id);
    return (
      <div>
        <Users id={this.props.match.params.id} />
      </div>
    );
  }
}

export default User;
