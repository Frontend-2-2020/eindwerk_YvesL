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
import store from "../../redux/Store";

const Navi = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  console.log(store);

  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <Navbar className="navb" color="dark" light fixed="top" name="Yves">
      <NavbarBrand href="/" className="mr-auto">
        <FaRedditAlien style={{ color: "white", height: 50, width: 50 }} />
      </NavbarBrand>
      <div className="loggedIn">
        <div className="ledgreen"></div>
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
