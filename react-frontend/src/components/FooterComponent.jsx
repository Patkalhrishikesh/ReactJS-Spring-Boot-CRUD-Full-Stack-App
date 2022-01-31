import React, { Component } from "react";
import "./Styles/mycss.css";

class FooterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="footerbgi mt-2">
          <footer className="page-footer font-small blue pt-4">
            <div className="container-fluid text-center text-md-left">
              <div className="row">
                <div className="col-md-6 mt-md-0 mt-3">
                  <h5 className="text-uppercase h2 fw-lighter text-light">
                    student management system
                  </h5>
                  <p className=" h4 fw-lighter text-light">
                    Here you can see your details
                  </p>
                </div>

                <hr className="clearfix w-100 d-md-none pb-3" />

                <div className="col-md-3 mb-md-0 mb-3">
                  <h5 className="text-uppercase text-light">Links</h5>

                  <ul className="list-unstyled">
                    <li>
                      <a href="#!" className="text-light text-decoration-none">
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-light text-decoration-none">
                        Youtube
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-light text-decoration-none">
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-light text-decoration-none">
                        Linkedin
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-md-3 mb-md-0 mb-3">
                  <h5 className="text-uppercase text-light">Links</h5>

                  <ul className="list-unstyled">
                    <li>
                      <a href="#!" className="text-light text-decoration-none">
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-light text-decoration-none">
                        Youtube
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-light text-decoration-none">
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-light text-decoration-none">
                        Linkedin
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer-copyright text-light list-unstyled text-center py-3">
              © 2022 Copyright:
              <a
                className="text-light"
                href="https://react-bootstrap.github.io/"
              >
                StudentManagement.com
              </a>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

export default FooterComponent;
