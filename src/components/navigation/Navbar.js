import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRedditAlien } from "react-icons/fa";
import "./NavBar.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const Navi = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <Navbar className="navb" color="dark" light fixed="top">
      <NavbarBrand href="/" className="mr-auto">
        <FaRedditAlien style={{ color: "white", height: 50, width: 50 }} />
      </NavbarBrand>
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
            <NavLink href="/login" style={{ color: "white" }}>
              login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/register" style={{ color: "white" }}>
              register
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Navi;

/* <nav
      className="navbar navbar-expand-lg navbar-light bg-dark "
      style={{
        marginBottom: 30,
      }}
    >
      <div class="container-fluid">
        <a className="navbar-brand" href="www">
          <FaRedditAlien style={{ color: "white", height: 50, width: 50 }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <Link to="/" style={{ margin: 10 }}>
              Home
            </Link>
            <Link to="/register" style={{ margin: 10 }}>
              <button type="button" className="btn btn-outline-primary ">
                register
              </button>
            </Link>
            <Link to="/login" style={{ margin: 10 }}>
              <button
                type="button"
                className="btn btn-outline-primary navbar-right"
              >
                login
              </button>
            </Link>
          </ul>
        </div>
      </div>
    </nav> */
