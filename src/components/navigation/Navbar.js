import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../redux/Store";
import { FaRedditAlien } from "react-icons/fa";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";

const Navi = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const state = store.getState();
  const { led } = state.auth;

  return (
    <Navbar className="navb" color="dark" light fixed="top" name="Yves">
      <Link to="/" className="mr-auto navbar-brand">
        <FaRedditAlien style={{ color: "white", height: 50, width: 50 }} />
      </Link>

      <div className="loggedIn">
        {led ? (
          <div className="ledgreen"></div>
        ) : (
          <div className="ledred"></div>
        )}
        ;
      </div>
      <Link to="/login" style={{ margin: 10 }}>
        <button type="button" className="btn btn-outline-primary navbar-right">
          login
        </button>
      </Link>
      <Link to="/register" style={{ margin: 10 }}>
        <button type="button" className="btn btn-outline-primary ">
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
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Navi);
