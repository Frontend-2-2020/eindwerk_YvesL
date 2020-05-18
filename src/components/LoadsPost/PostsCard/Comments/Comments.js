import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import classes from "./Comments.module.css";

const CreateCommentComponent = (props) => {
  return (
    <div>
      <div className={classes.commentInputbox}>
        <div className={classes.outer} onClick={props.commentbox}>
          <div className={classes.inner}>
            <label>Back</label>
          </div>
        </div>

        <CKEditor
          editor={ClassicEditor}
          data=""
          onChange={(event, editor) => props.editor(event, editor)}
        />
        <button
          className="btn btn-outline-dark"
          style={{ float: "right", marginRight: "50px", margin: 10 }}
          onClick={props.addComment}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default CreateCommentComponent;
