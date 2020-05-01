import React from "react";

const NewPost = (props) => {
  return (
    <div
      className="postForm"
      style={{
        padding: 10,
        margin: "auto",
        border: "2px solid black",
        width: "70vw",
      }}
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

export default NewPost;
