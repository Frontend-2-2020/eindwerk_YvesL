import React from "react";
import "./Trashcan.css";

export const Trashcan = (props) => {
  return (
    <div className="icon-trash" onClick={props.clicked}>
      <div className="trash-lid" style={{ backgroundColor: "#51b6ed" }}></div>
      <div
        className="trash-container"
        style={{ backgroundColor: "#51b6ed" }}
      ></div>
      <div className="trash-line-1"></div>
      <div className="trash-line-2"></div>
      <div className="trash-line-3"></div>
    </div>
  );
};
