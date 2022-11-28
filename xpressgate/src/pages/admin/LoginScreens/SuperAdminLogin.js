import React, { useRef } from "react";
import "../../../styles/SuperAdminLogin.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const SuperAdminLogin = () => {
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
    <div className="superadmincontainer">
      
        

      <div id="superadminloginimg">
        <img src="./images/SuperAdminImg.svg" alt="" />
      </div>
      <div id="Superadminloginform">
        <Form>
          <div className="Superadmininputfield">
          <div id="Superadminlogo">
            <img src="/images/loginlogo.svg" alt="" />
          </div>
         <br/><br/>
            <div className="signinlabel" disabled>
              SIGN IN
            </div>
            <br />
            <div className="email_input">
              <label className="adminemail">Email</label>
              <input
                ref={username}
                type="text"
                className="form-control adminemailtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="loginemailid"
                placeholder="Username"
              ></input>
            </div>
            <br></br>
            <div className="email_input">
              <label className="adminpassword">Password</label>
              <input
                ref={password}
                type="password"
                className="form-control adminpasswordbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="loginpassword"
                placeholder="Password"
              ></input>
              <br />
              <Button
                type="button"
                className="adminloginbtn"
                onClick={() => {
                  loginGuard();
                }}
              >
                Login
              </Button>
            </div>

            <div className="adminforgotpassword">
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

export default SuperAdminLogin;
