import React from "react";
import customlogo from "../../assets/images/LogoAfroCode.png";

const Footer = (props) => {
  return (
    <div style={{ backgroundColor: "rgb(246, 248, 250)" }}>
      <hr />
      <footer className="contain py-5 ml-5">
        <div className="row">
          <div className="col-12 col-md">
            <img
              src={customlogo}
              alt="logo"
              style={{ height: "60px", width: "60px" }}
            />
            <small className="d-block mb-3 text-muted">&copy; 2017-2019</small>
          </div>
          <div className="col-6 col-md">
            <h5>Features</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="text-muted" href="f">
                  Cool stuff
                </a>
              </li>
              <li>
                <a className="text-muted" href="f">
                  Random feature
                </a>
              </li>
              <li>
                <a className="text-muted" href="f">
                  Team feature
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Resources</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="text-muted" href="f">
                  Resource
                </a>
              </li>
              <li>
                <a className="text-muted" href="f">
                  Resource name
                </a>
              </li>
              <li>
                <a className="text-muted" href="f">
                  Another resource
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <hr />
    </div>
  );
};

export default Footer;
