import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navi from "./components/navigation/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";

import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Navi />
        <Switch>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/" exact component={Home}></Route>
          <Route path="/" component={Page404}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
