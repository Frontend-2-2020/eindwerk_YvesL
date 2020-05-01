import React, { Component } from "react";
import DetailPost from "../components/DetailPost/DetailPost";

export class Detail extends Component {
  render() {
    return (
      <div>
        <DetailPost id={this.props.match.params.id} />
      </div>
    );
  }
}

export default Detail;
