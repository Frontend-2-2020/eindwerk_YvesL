import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { FaRedditAlien } from "react-icons/fa";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import $ from "jquery";
import { connect } from "react-redux";
import { logoutAuth } from "../../redux/actions/authActions";
import PropTypes from "prop-types";

/////!!!!!!!!!CHANGE TO VANILLA JS/////
$(window).scroll(function () {
  if ($(window).scrollTop() >= 700) {
    $(".navb").css("background-color", "white", "transition", "750ms ease");
  } else {
    $(".navb").css("background-color", "hsla(0, 0%, 0%, 0)");
  }
});

const Navi = (props) => {
  const [collapsed, setCollapsed] = useState();
  const toggleNavbar = () => setCollapsed(!collapsed);

  const logout = () => {
    props.logoutAuth(); /////<-----LOGOUT FUNCTION FROM AUTH ACTIONS
  };

  return (
    <Navbar className="navb" fixed="top" light style={{ opacity: "0.6" }}>
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
      {/* ///////TOGGLE LOGIN/LOGOUT BTN/////// */}
      {!props.user.user ? (
        <Link to="/login" style={{ margin: 10 }}>
          <button type="button" className="btn btn-outline-dark navbar-right">
            login
          </button>
        </Link>
      ) : (
        <button
          type="button"
          className="btn btn-outline-dark navbar-right"
          onClick={() => logout()}
        >
          logout
        </button>
      )}
      <Link to="/register" style={{ margin: 10 }}>
        <button type="button" className="btn btn-outline-dark ">
          register
        </button>
      </Link>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={collapsed} navbar>
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

NavbarToggler.propTypes = {
  type: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // pass in custom element to use
};
