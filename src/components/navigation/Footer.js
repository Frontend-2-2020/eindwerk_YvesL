import React from "react";
import customlogo from "../../assets/images/LogoAfroCode.png";

const Footer = (props) => {
  return (
    <div style={{ backgroundColor: "rgb(246, 248, 250)" }}>
      <hr />
      <footer class="container py-5">
        <div class="row">
          <div class="col-12 col-md">
            <img
              src={customlogo}
              alt="logo"
              style={{ height: "60px", width: "60px" }}
            />
            <small class="d-block mb-3 text-muted">&copy; 2017-2019</small>
          </div>
          <div class="col-6 col-md">
            <h5>Features</h5>
            <ul class="list-unstyled text-small">
              <li>
                <a class="text-muted" href="f">
                  Cool stuff
                </a>
              </li>
              <li>
                <a class="text-muted" href="f">
                  Random feature
                </a>
              </li>
              <li>
                <a class="text-muted" href="f">
                  Team feature
                </a>
              </li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h5>Resources</h5>
            <ul class="list-unstyled text-small">
              <li>
                <a class="text-muted" href="f">
                  Resource
                </a>
              </li>
              <li>
                <a class="text-muted" href="f">
                  Resource name
                </a>
              </li>
              <li>
                <a class="text-muted" href="f">
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