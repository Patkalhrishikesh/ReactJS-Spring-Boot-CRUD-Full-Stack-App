import React, { Component } from "react";

import "./Styles/mycss.css";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <header className="headerbgi">
          <nav className="navbar navbar-expand-md">
            <div>
              <a href="" className="navbar-brand text-center text-light">
                <h3 className="display-5">Student Management App</h3>
              </a>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;
