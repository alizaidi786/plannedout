import React from "react";
import "./LoginContent.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Homepage from "./Component/Homepage/Homepage";

import Login from "./Component/Login";
import SignUp from "./Component/Signup";
export default function LoginContent() {
  return (
    <div>
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>
                RemoteStack
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>
                      Sign in
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>
                      Sign up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/homepage"}>
                      Homepage
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="outer" style={{ marginTop: "150px" }}>
            <div className="inner">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/sign-in" component={Login} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/Homepage" component={Homepage} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}
