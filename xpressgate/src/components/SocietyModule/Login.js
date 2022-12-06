import React, { useRef } from "react";
import "../SocietyModule/Login.css";
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
      const { data } = await axios.post(`${window.env_var}api/auth/societylogin`, loginCreds);
      localStorage.clear();
      localStorage.setItem("accesstoken", data.data.accessToken);
      localStorage.setItem("community_id", data.data.community_id);
      localStorage.setItem("member_id", data.data.id);
      localStorage.setItem('mode', 'society')
      window.location.href = "/scDashboard";
    } catch (err) {
      document.getElementById("loginemailid").style.border = "2px solid red";
      document.getElementById("loginpassword").style.border = "2px solid red";
    }
  };
  return (
    <div className="logincontainer1">



      <div id="loginimgid1">
        <img src="./images/societylogin.svg" alt="" />
      </div>
      <div id="loginformid1">
        <Form>
          <div className="socinputfields">
            <div id="soclogoid">
              <img src="/images/loginlogo.svg" alt="" />
            </div>
            <br /><br />
            <div className="socbtnsign">
              <label className="signinsociety">SIGN IN</label>
            </div>
            <br />
            <div className="socemail_input">
              <label className="socname">User Name</label>
              <input
                ref={username}
                type="text"
                className="form-control socemailtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="socloginemailid"
                placeholder="Username"
              ></input>
            </div>
            <br></br>
            <div className="socemail_input">
              <label className="socpassword">Password</label>
              <input
                ref={password}
                type="password"
                className="form-control socpasswordtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="loginpassword"
                placeholder="Password"
              ></input>
              <br />
              <Button
                type="button"
                className="socbtnlogin"
                onClick={() => {
                  loginGuard();
                }}
              >
                Login
              </Button>
            </div>

            <div className="socforgotpassword"><a href="/screset" style={{color:"#FD6B22",fontSize: "15px", marginRight:"5%"}}>Forgot Password?</a></div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login_society;
