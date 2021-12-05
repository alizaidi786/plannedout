import React, { useState } from "react";
import Axios from "../Axios";
import { useHistory } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import "./Login.css";

export default function SignUp() {
  const history = useHistory();
  const UserModel = () => useStoreState((state) => state.GlobelStore.user);
  const User = UserModel();
  const SetUser = useStoreActions((actions) => actions.GlobelStore.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userName, setUserName] = useState("");
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log("Enter");
    Axios.put("http://localhost:4000/user", {
      userName: userName,
      profilePic: profilePic,
      email: email,
      password: password,
    }).then((data) => {
      if (data.status == 200) {
        console.log(data.data.body.data);
        SetUser(data.data.body.data);
        alert("Register Succesfully");
        history.push("/homepage");
      } else if (data.status == 400) {
        alert("Server Down Try again after sometime");
      }
    });
  };

  return (
    <div className="outer">
      <div className="inner">
        <form>
          <h3>Register</h3>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Profile Picture</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Link"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
            />
          </div>

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

          <button
            type="submit"
            className="btn btn-dark btn-lg btn-block"
            onClick={handelSubmit}
          >
            Register
          </button>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
