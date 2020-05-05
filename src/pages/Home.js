import React from "react";
import LoadPosts from "../components/LoadsPost/AllPosts/LoadPosts";
import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <div>
      <div className={classes.home}>
        <div className={classes.loadposts}>
          <LoadPosts />
        </div>
      </div>
    </div>
  );
};

export default Home;
