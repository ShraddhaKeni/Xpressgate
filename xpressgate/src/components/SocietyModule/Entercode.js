import React, { useRef } from "react";
import "../SocietyModule/Entercode.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const Entercode= () => {
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
    <div className="logincontainer3">
      <div id="loginimgid3">
        <img src="/images/societylogin.svg" alt="" />
      </div>
      <div id="loginformid3">
        <Form>
          <div className="input_fields3">
          <div id="logoid3">
            <img src="/images/loginlogo.svg" alt="" />
          </div>
         <br/>
            <div className="btsign" disabled>
              FORGOT PASSWORD
            </div>
            <br />
            <div className="email_input">
              <label className="entercode">Enter code</label>
              <input
                ref={username}
                type="text"
                className="form-control emailtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="loginemailid"
                placeholder="Enter code"
              ></input>
            </div>
            <br></br>
            <div className="email_input">
              <br />
              <Button
                type="button"
                className="btlogin3"
                onClick={() => {
                  loginGuard();
                }}
              >
                Verify
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Entercode;
