import React, { useRef, useEffect, useState } from "react";
import "./Main_reset.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Loader } from "../Loader";

const Main_reset = () => {
  let username = useRef([]);
  let password = useRef([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false);
  }, [])

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
    <div className="logincontainer5">
      <div id="loginimgid5">
        <img src="/images/societylogin.svg" alt="" />
      </div>
      <div id="loginformid5">
        <Loader loading={loading}>
          <Form>
            <div className="input_fields5">
              <div id="logoid5">
                <img src="/images/loginlogo.svg" alt="" />
              </div>
              <br/>
              <div className="btsign" disabled>
                RESET PASSWORD
              </div>
              <br/>
              <div className="email_input">
                <label className="Currentpswd" >Current Password</label>
                <input ref={username} type="text" className="form-control emailtextbox" onKeyPress={(e) => { document.getElementById(e.target.id).style.border = "none"; }} id="loginemailid" placeholder="Current Password" ></input>
              </div>
              <br></br>
              <div className="email_input">
                <label className="password2">New Password</label>
                <input ref={password} type="password" className="form-control passwordtextbox" onKeyPress={(e) => { document.getElementById(e.target.id).style.border = "none"; }} id="loginpassword" placeholder="New Password" ></input>
                <br/>
                <label className="password3">Confirm Password</label>
                <input ref={password} type="password" className="form-control passwordtextbox" onKeyPress={(e) => { document.getElementById(e.target.id).style.border = "none"; }} id="loginpassword" placeholder="Password" ></input>
                <br />
                <Button type="button" className="btlogin6" onClick={() => { loginGuard(); }} > Login </Button>
              </div>
            </div>
          </Form>
        </Loader>
      </div>
    </div>
  );
};
export default Main_reset;