import React, { useRef } from "react";
import "../SocietyModule/Enter_new_pswd.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const Enter_new_pswd = () => {
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
    <div className="logincontainer2">
      
        

      <div id="loginimgid2">
        <img src="/images/societylogin.svg" alt="" />
      </div>
      <div id="loginformid2">
        <Form>
          <div className="input_fields2">
          <div id="logoid2">
            <img src="/images/loginlogo.svg" alt="" />
          </div>
         <br/>
            <div className="btsign" disabled>
              FORGOT PASSWORD
            </div>
            <br />
            <div className="email_input">
              <label className="newpswd">New password</label>
              <input
                ref={username}
                type="text"
                className="form-control emailtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="loginemailid"
                placeholder="New Password"
              ></input>
            </div>
            <br></br>
            <div className="email_input">
              <label className="cnfpswd">Confirm Password</label>
              <input
                ref={password}
                type="password"
                className="form-control passwordtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="loginpassword"
                placeholder="Confirm Password"
              ></input>
              <br />
              <Button
                type="button"
                className="btlogin2"
                onClick={() => {
                  loginGuard();
                }}
              >
                Change Password
              </Button>
            </div>

            {/* <Button
              type="button"
              className="btnlogin"
              onClick={() => {
                loginGuard();
              }}
            >
              Login
            </Button> */}
            {/* <div className="forgotpassword">
              <a
                href="https://gitlab.com/users/password/new"
                style={{ color: "#FD6B22" }}
              >
                Forgot Password?
              </a>
            </div> */}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Enter_new_pswd;
