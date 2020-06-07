import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchPosts } from "../src/redux/actions/postactions";
import { loginAuth } from "./redux/actions/authActions";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Navi from "./components/navigation/Navbar";
import classes from "./App.module.css";
//import Page404 from "./pages/Page404";

/////IMPORTING THROUGH REACT.LAZY
const User = React.lazy(() => import("./pages/User"));
const Detail = React.lazy(() => import("./pages/Detail"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Home"));

class App extends Component {
  componentDidMount() {
    this.props.loginAuth();
    this.props.fetchPosts();
  }
  render() {
    return (
      <div className={classes.App}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            {" "}
            <Navi />
            <Switch>
              <Route path="/user/:id" component={User} />
              <Route path="/detail/:id" component={Detail} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/" component={Home} />
              {/* <Route component={Page404} /> */}
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAuth: () => dispatch(loginAuth()),
    fetchPosts: () => dispatch(fetchPosts()),
  };
};

export default connect(undefined, mapDispatchToProps)(App);
