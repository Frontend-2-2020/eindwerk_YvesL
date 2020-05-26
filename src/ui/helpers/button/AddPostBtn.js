import React from "react";
import { Add } from "@material-ui/icons";
import "./AddPostBtn.css";

const AddPostBtn = (props) => {
  return (
    <div className="AddPost">
      <h1>Post</h1>

      <Add className="postbtn" fontSize="large" />
    </div>
  );
};

export default AddPostBtn;
