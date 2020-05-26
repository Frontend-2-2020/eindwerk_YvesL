import React, { PureComponent } from "react";
import { API } from "../../config/API";
import classes from "./Home.module.css";
import OverviewCard from "./OverviewCard";
import Pagination from "react-js-pagination";
import { Spinner } from "../../ui/spinner/Spinner";
import Validate from "../Forms/Validate";
import AddPostBtn from "../../ui/helpers/button/AddPostBtn";
import CloseBtn from "../../ui/helpers/button/CloseBtn";
import griffith from "../../assets/images/griffith.jpg";

class Home extends PureComponent {
  state = {
    posts: [],
    loading: false,
    user: {},
    activePage: 1,
    isClicked: false,
    allUsers: [],
  };

  ///////MAKING THE API CALL TO GET THE POSTS////////
  getposts() {
    const { activePage } = this.state;
    API.get("api/posts?page=" + activePage)
      .then((response) => {
        const { data } = response.data;
        this.setState({
          posts: data,
          loading: true,
        });
      })
      .catch((err) => console.log(err));
  }

  ////////OPTIONAL GETTING ALL USERS AND LOOPING THROUGH ALL PAGES//////////////
  getAllUsers() {
    API.get("api/users")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  ////////PAGINATION, I CHOSE TO USE THE PAGINATION NODE HERE////////
  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => this.getposts());
  };

  ///////PREVENTING AN INFINITE LOOP////////////
  componentDidMount() {
    this.getposts();
    this.getAllUsers();
    //RELOADING THE PAGE EVERY 10 SEC
    // setInterval(() => {
    //   this.getposts();
    // }, 10000);
  }

  //////TO DISPLAY THE MAKE POST FORM/////////
  createPostHandler = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  ////////PERFORMING AN AXIOS PUT TO PLACE THE NEW POST ON THE SERVER//////////////
  ////////REFRESHING THE PAGE AFTER SUBMIT TO GO BACK TO THE HOMEPAGE//////////////
  addPostHandler(values) {
    const data = {
      title: values.title,
      body: values.body,
    };
    API.post("api/posts", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { posts, loading, isClicked /*allUsers*/ } = this.state;

    ///////STORING THE PAGE CONTENT IN A VARIABLE TO OUTPUT WHEN LOADING IS COMPLETE///////
    const AllPosts = (
      <div>
        <div className={classes.poster}>
          <div className={classes.blogtitle}>
            <h1 className={classes.maintitle}>Adventured Out</h1>
            <p>Scroll for more!</p>
          </div>
          <img src={griffith} alt="pp" />
        </div>
        <div className={classes.row}>
          <div className="col-lg-8 col-md-11 col-ml-2  ">
            <div className={classes.innerleftcol}>
              <div className={classes.intro}>
                <div
                  onClick={this.createPostHandler}
                  style={{ width: 100, margin: "auto" }}
                >
                  <AddPostBtn />
                </div>

                <div className={classes.pagination}>
                  <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.state.activePage}
                    itemsCountPerPage={15}
                    totalItemsCount={56}
                    pageRangeDisplayed={4}
                    onChange={this.handlePageChange}
                  />
                </div>
              </div>
              <br />

              {posts.map((post) => (
                <div key={post.id}>
                  <OverviewCard
                    postid={post.id}
                    posts={post.user_id}
                    {...post}
                    {...post.user}
                    date={post.created_at}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-3 md-2 ">
            <div className={classes.sidebar1}>
              <div className={classes.headersidebar}>Most active users</div>
              <div className={classes.contentsidebar}>
                {" "}
                <ul>
                  <li>Angelo</li>
                  <li>Tim</li>
                  <li>Yves</li>
                  <li>Carl</li>
                </ul>
              </div>
            </div>
            <div className={classes.sidebar2}>
              <div className={classes.headersidebar}>Popular Topics</div>
              <div className={classes.contentsidebar}>
                {" "}
                <ul id="pop">
                  <li>Latest Movies</li>
                  <li>Music releases</li>
                  <li>Car DIY</li>
                  <li>Pets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    //////IF LOADING IS TRUE SHOW SPINNER ELSE SHOW PAGE///////
    const spinner = <Spinner />;
    const pageIsLoaded = !loading ? spinner : AllPosts;

    //////HERE WE ARE DISPLAYING THE POSTFORM TO ADD A NEW POST//////
    const postBox = (
      <div style={{ display: "flex", flexFlow: "column" }}>
        <div onClick={this.createPostHandler}>
          <CloseBtn btnTxt="cancel" color="red" />
        </div>

        <Validate
          submit={this.addPostHandler}
          btnTxt="Post"
          formTxt="Add Post"
        />
      </div>
    );

    ////////BY CLICKING THE "CREATE POST" BUTTON WE DISPLAY THE POSTFORM,//////////
    ////////IF NOT ALL THE POSTS ARE SHOWN//////////////////////////////////////

    return isClicked ? postBox : pageIsLoaded;
  }
}

export default Home;
