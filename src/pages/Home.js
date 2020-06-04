import React, { PureComponent } from "react";
import { API } from "../config/API";
import classes from "./Home.module.css";
import Post from "../components/Posts/Post";
import ReactPaginate from "react-paginate";
import { Spinner } from "../ui/spinner/Spinner";
import Validate from "../components/Forms/Validate";
import AddPostBtn from "../ui/helpers/button/AddPostBtn";
import CloseBtn from "../ui/helpers/button/CloseBtn";
import griffith from "../assets/images/griffith.jpg";
import { connect } from "react-redux";
import { fetchPosts, setTotalPages } from "../redux/actions/postactions";
import { Link } from "react-router-dom";

class Home extends PureComponent {
  state = {
    loading: true,
    user: {},
    isClicked: false,
    allUsers: [],
  };

  ////////OPTIONAL GETTING ALL USERS AND LOOPING THROUGH ALL PAGES//////////////
  getAllUsers() {
    API.get("api/users?nopaginate")
      .then((response) => {
        const { data } = response;
        this.setState({ allUsers: data });
      })
      .catch((err) => console.log(err));
  }

  ////////PAGINATION, I CHOSE TO USE THE PAGINATION NODE HERE////////
  handlePageClick = (data) => {
    this.props.fetchPosts(data.selected + 1);
  };

  ///////PREVENTING AN INFINITE LOOP////////////
  componentDidMount() {
    this.getAllUsers();
    this.props.setTotalPages();
    //RELOADING THE PAGE EVERY 10 SEC
    // setInterval(() => {
    //   this.props.getPosts();
    // }, 10000);
  }

  //////TO DISPLAY THE MAKE POST FORM/////////
  createPostHandler = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  ////////PERFORMING AN AXIOS PUT TO PLACE THE NEW POST ON THE SERVER//////////////
  ////////RELOAD THE PAGE AFTER SUBMIT TO GO BACK TO THE HOMEPAGE//////////////
  addPostHandler(values) {
    const data = {
      title: values.title,
      body: values.body,
    };
    API.post("api/posts", data)
      .then((res) => {
        console.log(res);
        if (res) {
          window.location.reload();
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { loading, isClicked, allUsers } = this.state;
    const { posts } = this.props;
    const list = allUsers.map((user) => {
      if (user.blog_posts.length >= 8) {
        return (
          <li key={user.id}>
            <Link to={"/user/" + user.id}>
              <img
                src={user.avatar}
                alt="avatar"
                style={{ height: 15, width: 15 }}
              />
            </Link>{" "}
            {user.first_name + " posted " + user.blog_posts.length + " posts"}
          </li>
        );
      } else {
        return null;
      }
    });

    ///////STORING THE PAGE CONTENT IN A VARIABLE TO OUTPUT WHEN LOADING IS COMPLETE///////
    const AllPosts = (
      <div id="scrollToTop">
        <div className={classes.poster}>
          <div className={classes.blogtitle}>
            <h1 className={classes.postertitle}>Adventured Out</h1>
            <p>Scroll for more!</p>
          </div>
          <img src={griffith} alt="pp" />
        </div>
        <div className={classes.row}>
          <div className="col-lg-8 col-md-11 col-ml-2 ">
            <div className={classes.innerleftcol}>
              <div className={classes.intro}>
                <div
                  onClick={this.createPostHandler}
                  style={{ width: 100, margin: "auto" }}
                >
                  {/* //////ADD POST BTN (HELPERS)//////// */}
                  <AddPostBtn />
                </div>
                {/* /////PAGINATION////// */}
                <div className={classes.pagination}>
                  <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.props.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  ></ReactPaginate>
                </div>
              </div>
              <br />
              {/* ///////POST//////// */}

              {posts.map((post) => (
                <div key={post.id}>
                  <Post
                    post={post}
                    avatar={post.user.avatar}
                    first_name={post.user.first_name}
                    user_id={post.user_id}
                    last_login_at={post.user.last_login_at}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* /////SIDEBAR////// */}
          <div className="col-lg-3 md-2 ">
            <div className={classes.sidebar1}>
              <div className={classes.headersidebar}>Most active users</div>
              <div className={classes.contentsidebar}>
                {" "}
                <ul
                  style={{
                    listStyleType: "none",
                    textAlign: "left",
                    paddingLeft: 20,
                  }}
                >
                  {list}
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.posts.posts,
    totalPages: state.posts.totalPages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTotalPages: () => dispatch(setTotalPages()),
    fetchPosts: (activePage) => dispatch(fetchPosts(activePage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
