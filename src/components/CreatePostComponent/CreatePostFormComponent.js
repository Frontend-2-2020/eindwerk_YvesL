import React from "react";

const CreatePostFormComponent = (props) => {
  return (
    <div
      className="postForm"
      style={{ padding: 10, margin: 10, border: "2px solid black" }}
    >
      <form name="title">
        <label htmlFor="title"></label>

        <input
          style={{ margin: 10 }}
          type="text"
          placeholder="Title"
          name="title"
          id="title"
        />
        <hr />
        <label htmlFor="body"></label>
        <textarea
          type="textarea"
          placeholder="Type here"
          name="body"
          id="body"
        />
        <hr />
      </form>
    </div>
  );
};

export default CreatePostFormComponent;
