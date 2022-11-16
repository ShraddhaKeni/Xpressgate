import React, { useRef } from "react";
import "./Login.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const Login_society = () => {
  let username = useRef([]);
  let password = useRef([]);

  const loginGuard = async () => {
    try {
      const loginCreds = {
        username: username.current.value,
        password: password.current.value,
      };
      const { data } = await axios.post(`api/auth/guardlogin`, loginCreds);
      localStorage.clear();
      localStorage.setItem("accesstoken", data.data.accessToken);
      localStorage.setItem("community_id", data.data.community_id);
      localStorage.setItem("guard_id", data.data.id);
      window.location.href = "/dashboard";
    } catch (err) {
      document.getElementById("loginemailid").style.border = "2px solid red";
      document.getElementById("loginpassword").style.border = "2px solid red";
    }
  };
  return (
    <div className="logincontainer1">
      
        

      <div id="loginimgid1">
        <img src="/images/societylogin.svg" alt="" />
      </div>
      <div id="loginformid1">
        <Form>
          <div className="input_fields1">
          <div id="logoid1">
            <img src="/images/loginlogo.svg" alt="" />
          </div>
         <br/><br/>
            <div className="btsign" disabled>
              SIGN IN
            </div>
            <br />
            <div className="email_input">
              <label className="name">User Name</label>
              <input
                ref={username}
                type="text"
                className="form-control emailtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="loginemailid"
                placeholder="Username"
              ></input>
            </div>
            <br></br>
            <div className="email_input">
              <label className="password1">Password</label>
              <input
                ref={password}
                type="password"
                className="form-control passwordtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="loginpassword"
                placeholder="Password"
              ></input>
              <br />
              <Button
                type="button"
                className="btlogin1"
                onClick={() => {
                  loginGuard();
                }}
              >
                Login
              </Button>
            </div>

            <div className="forgotpassword1">
              <a
                href="https://gitlab.com/users/password/new"
                style={{ color: "#FD6B22" }}
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login_society;
