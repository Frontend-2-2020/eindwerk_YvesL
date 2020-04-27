import React from "react";
import PostComponent from "../components/PostComponent/PostComponent";
import "./Home.css";

const Home = (props) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          boxShadow: "4px 6px 10px #95AFF9",
          width: "80%",
          margin: "0px auto",
        }}
      >
        <div style={{ flex: 2, margin: 15, height: "auto" }}>
          <PostComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;
