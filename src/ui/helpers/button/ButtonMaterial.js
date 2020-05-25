import React from "react";
import { Add } from "@material-ui/icons";
import "./ButtonMaterial.css";

const ButtonMaterial = (props) => {
  return (
    <div className="material">
      <h1>Post</h1>

      <Add className="postbtn" fontSize="large" />
    </div>
  );
};

export default ButtonMaterial;
