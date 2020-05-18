import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import classes from "./App.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Navi from "./components/navigation/Navbar";
import Page404 from "./pages/Page404";
import Social from "./ui/social/Social";
// import User from "./pages/User";
// import Detail from "./pages/Detail";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Home from "./pages/Home";

/////IMPORTING THROUGH REACT.LAZY
const User = React.lazy(() => import("./pages/User"));
const Detail = React.lazy(() => import("./pages/Detail"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Home"));

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Social />
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
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  }
}

export default App;
