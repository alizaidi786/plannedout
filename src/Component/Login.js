import React, { useState } from "react";
import Axios from "../Axios";
import { useHistory } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const UserModel = () => useStoreState((state) => state.GlobelStore.user);
  const User = UserModel();

  const SetUser = useStoreActions((actions) => actions.GlobelStore.setUser);

  const handelSubmit = (e) => {
    e.preventDefault();

    Axios.get(
      `http://localhost:4000/user?email=${email}&password=${password}`
    ).then((data) => {
      console.log(data);
      if (data.data.body.status == "SUCCESS") {
        console.log(data.data.body);
        SetUser(data.data.body.data);
        alert("Login Succesfully");
        history.push("/homepage");
      } else if (data.data.body.status == "ERROR") {
        alert("User Not Found");
      }
    });
  };

  return (
    <div className="outer">
      <div className="inner">
        <form>
          <h3>Log in</h3>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-dark btn-lg btn-block"
            onClick={handelSubmit}
          >
            Sign in
          </button>
          <p className="forgot-password text-right">
            Not registered <a href="/sign-up">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
