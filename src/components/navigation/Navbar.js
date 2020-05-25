import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { FaRedditAlien } from "react-icons/fa";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import $ from "jquery";

const Navi = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  //const state = store.getState();
  //const { led } = state.auth;
  const loginToken = localStorage.getItem("yves_acces_token");

  $(window).scroll(function () {
    if ($(window).scrollTop() >= 700) {
      $(".navb").css("background-color", "white");
    } else {
      $(".navb").css("background-color", "hsla(0, 0%, 0%, 0)");
    }
  });

  return (
    <Navbar className="navb" fixed="top" name="Yves">
      <Link to="/" className="mr-auto navbar-brand">
        <FaRedditAlien style={{ color: "black", height: 50, width: 50 }} />
      </Link>
      {/* ////SHOW THE LOGIN LED IN THE NAVBAR////// */}
      <div className="loggedIn">
        {loginToken != null ? (
          <div className="ledgreen"></div>
        ) : (
          <div className="ledred"></div>
        )}
      </div>
      <Link to="/login" style={{ margin: 10 }}>
        <button type="button" className="btn btn-outline-dark navbar-right">
          login
        </button>
      </Link>
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

export default Navi;

// const mapStateToProps = (state) => {
//   return { auth: state.auth };
// };

// export default connect(mapStateToProps)(Navi);
