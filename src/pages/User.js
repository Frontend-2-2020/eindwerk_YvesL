import React, { Component } from "react";
import UserComponent from "../components/UserComponent/UserComponent";

export class User extends Component {
  render() {
    console.log(this.props.match.params.id);
    return (
      <div>
        <UserComponent id={this.props.match.params.id} />
      </div>
    );
  }
}

export default User;
