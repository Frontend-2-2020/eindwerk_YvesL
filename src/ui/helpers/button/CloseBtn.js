import React from "react";
import "./CloseBtn.css";

const CloseBtn = (props) => {
  return (
    <button className="customBtn" color={props.color}>
      {props.btnTxt}
    </button>
  );
};

export default CloseBtn;
