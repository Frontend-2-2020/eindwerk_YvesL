import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import { logoutAuth } from "../../redux/actions/authActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import customlogo from "../../assets/images/LogoAfroCode.png";
import PropTypes from "prop-types";
import "./NavBar.css";
import $ from "jquery";

/////!!!!!!!!!CHANGE TO VANILLA JS/////
$(window).scroll(function () {
  if ($(window).scrollTop() >= 700) {
    $(".nav").css("background-color", "white", "transition", "750ms ease");
  } else {
    $(".nav").css("background-color", "hsla(0, 0%, 0%, 0)");
  }
});

const Navi = (props) => {
  const [collapsed, setCollapsed] = useState();
  const toggleNavbar = () => setCollapsed(!collapsed);

  const logout = () => {
    props.logoutAuth(); /////<-----LOGOUT FUNCTION FROM AUTH ACTIONS
  };

  return (
    <Navbar className="nav" fixed="top" light>
      <Link to="/" className="mr-auto navbar-brand">
        <img src={customlogo} alt="logo" />
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
          <button type="button" className="btn btn-no-outline navbar-right">
            login
          </button>
        </Link>
      ) : (
        <button
          type="button"
          className="btn btn-no-outline navbar-right"
          onClick={() => logout()}
        >
          logout
        </button>
      )}
      <Link to="/register" style={{ margin: 10 }}>
        <button type="button" className="btn btn-no-outline ">
          register
        </button>
      </Link>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={collapsed} navbar>
        <Nav navbar>
          {!props.user.user ? (
            <NavItem className="btnhide">
              <Link
                to="/login"
                style={{
                  color: "black",
                }}
              >
                login
              </Link>
            </NavItem>
          ) : (
            <NavItem className="btnhide">
              <Link
                to="/"
                style={{
                  color: "black",
                }}
                onClick={() => logout()}
              >
                logout
              </Link>
            </NavItem>
          )}
          <NavItem className="btnhide">
            <Link to="/register" style={{ color: "black" }}>
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
  user: PropTypes.object,
};
