import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import classes from "./App.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Navi from "./components/navigation/Navbar";
import { connect } from "react-redux";
import { loginAuth } from "./redux/actions/authActions";
//import Page404 from "./pages/Page404";

/////IMPORTING THROUGH REACT.LAZY
const User = React.lazy(() => import("./components/UserPage/User"));
const Detail = React.lazy(() => import("./components/DetailPage/Detail"));
const Register = React.lazy(() => import("./components/Register/Register"));
const Login = React.lazy(() => import("./components/LoginPage/Login"));
const Home = React.lazy(() => import("./components/HomePage/Home"));

class App extends Component {
  componentDidMount() {
    this.props.loginAuth();
  }
  render() {
    return (
      <div className={classes.App}>
        {/* <Social /> */}
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
  };
};

export default connect(undefined, mapDispatchToProps)(App);
