import React, { Component } from "react";
import DetailComponent from "../components/DetailComponent/DetailComponent";

export class Detail extends Component {
  render() {
    return (
      <div>
        <DetailComponent id={this.props.match.params.id} />
      </div>
    );
  }
}

export default Detail;
