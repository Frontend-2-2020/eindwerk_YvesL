import React from "react";
import classes from "./App.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Navi from "./components/navigation/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Social from "./ui/social/Social/Social";
import User from "./pages/User";

function App() {
  return (
    <div className={classes.App}>
      <Social />

      <Router>
        <Navi />
        <Switch>
          <Route path="/404" component={Page404}></Route>
          <Route path="/user/:id" component={User} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
