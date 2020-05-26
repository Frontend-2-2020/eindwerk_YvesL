import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { FaRedditAlien } from "react-icons/fa";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import $ from "jquery";
import { connect } from "react-redux";
import { logoutAuth } from "../../redux/actions/authActions";

const Navi = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  /////!!!!!!!!!CHANGE TO VANILLA JS/////
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 700) {
      $(".navb").css("background-color", "white");
    } else {
      $(".navb").css("background-color", "hsla(0, 0%, 0%, 0)");
    }
  });

  const logout = () => {
    console.log("clicked");
    props.logoutAuth(); /////<-----LOGOUT FUNCTION FROM AUTH ACTIONS
  };

  console.log(props);

  return (
    <Navbar className="navb" fixed="top" name="Yves">
      <Link to="/" className="mr-auto navbar-brand">
        <FaRedditAlien style={{ color: "black", height: 50, width: 50 }} />
      </Link>
      {/* ////SHOW THE LOGIN LED IN THE NAVBAR////// */}
      <div className="loggedIn">
        {props.user.user ? (
          <div className="ledgreen"></div>
        ) : (
          <div className="ledred"></div>
        )}
      </div>

      {!props.user.user ? (
        <Link to="/login" style={{ margin: 10 }}>
          <button type="button" className="btn btn-outline-dark navbar-right">
            login
          </button>
        </Link>
      ) : (
        /* <Link to="/login" style={{ margin: 10 }}> */
        <button
          type="button"
          className="btn btn-outline-dark navbar-right"
          onClick={() => logout()}
        >
          logout
        </button>
        /* </Link> */
      )}
      <Link to="/register" style={{ margin: 10 }}>
        <button type="button" className="btn btn-outline-dark ">
          register
        </button>
      </Link>

      <NavbarToggler onClick={toggleNavbar} className="mr-2 " />

      <Collapse isOpen={!collapsed} navbar>
        <Nav navbar>
          <NavItem>
            <Link to="/login" style={{ color: "white" }}>
              login
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/register" style={{ color: "white" }}>
              register
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutAuth: () => dispatch(logoutAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navi);
