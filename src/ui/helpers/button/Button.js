import React from "react";
import "./Button.css";

const Button = (props) => {
  return <button className="customBtn">{props.btnTxt}</button>;
};

export default Button;
