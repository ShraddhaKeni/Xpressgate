import React, { useRef } from "react";
import "./Reset.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const Reset= () => {
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
    <div className="logincontainer4">
      {/* <div id="logoid">
        <img src="/images/loginlogo.svg" alt="" />
        </div> */}
        

      <div id="loginimgid4">
        <img src="/images/societylogin.svg" alt="" />
      </div>
      <div id="loginformid4">
        <Form>
          <div className="input_fields4">
          <div id="logoid4">
            <img src="/images/loginlogo.svg" alt="" />
          </div>
         
            <div className="btsign" disabled>
              FORGOT PASSWORD
            </div>
            <br />
            <div className="email_input">
              <label className="entermob">Enter Mobile</label>
              <input
                ref={username}
                type="text"
                className="form-control emailtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="loginemailid"
                placeholder=""
              ></input>
            </div>
            <br></br>
            <div className="email_input">
              
              <br />
              <Button
                type="button"
                className="btlogin4"
                onClick={() => {
                  loginGuard();
                }}
              >
                Send Code
              </Button>
            </div>

            
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Reset;
