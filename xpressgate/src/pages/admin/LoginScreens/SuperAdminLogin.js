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
      const { data } = await axios.post(`${window.env_var}api/auth/adminlogin`, loginCreds);
      localStorage.clear();
      localStorage.setItem("accesstoken", data.data.accessToken);
      // localStorage.setItem("community_id", data.data.community_id);
      localStorage.setItem("admin_id", data.data.id);
      localStorage.setItem('mode', 'admin')
      window.location.href = "/admin/dashboard";
    } catch (err) {
      console.log(err)
      document.getElementById("loginemailid").style.border = "2px solid red";
      document.getElementById("loginpassword").style.border = "2px solid red";
    }
  };
  return (
    <div className="superadmincontainer">
        <div id="Superadminlogo">
              <img src="/images/loginlogo.svg" alt="" />
            <div className="Admin_SignIn">
              <label className="Admin_SignIn_Label">SIGN IN</label>
            </div>
            </div>
        <div id="superadminloginimg">
        <img src="./images/SuperAdminImg.svg" alt="" />
      </div>
      <div id="Superadminloginform">
        <Form>
          <div className="Superadmininputfield">
           
            <div className="email_input">
              <label className="adminemail">Username</label>
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
            <div className="email_input mt-4">
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
                className="adminloginbtn "
                onClick={() => {
                  loginGuard();
                }}
              >
                Login
              </Button>
            </div>

            <div className="adminforgotpassword ">
              <a
                href="/adminresetpass"
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
