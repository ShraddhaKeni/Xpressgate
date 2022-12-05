import React, { useEffect, useRef, useState } from "react";
import "../SocietyModule/Enter_new_pswd.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { validatePassword } from "../auth/validation";

const Enter_new_pswd = () => {
  let password = useRef([]);
  let confirmpassword = useRef([]);

  const [member,setMember] = useState({})

  const location = useLocation()


  const handleSubmit =async()=>{
    try {
      if( await validatePassword(password.current.value))
      {
        console.log(validatePassword(password.current.value))
          if((password.current.value===confirmpassword.current.value)&&(password.current.value!==""&&confirmpassword.current.value!==""))
          {
          const sendData={
            password:confirmpassword.current.value,
            mem_id:location.state.mem_id
          }
          const {data} = await axios.post(`${window.env_var}api/society/societyupdatepass`,sendData)
          window.location.href = '/societylogin'
        }
        else
        {
          document.getElementById('loginemailid').style.border='2px solid red'
          document.getElementById('loginpassword').style.border='2px solid red'
        }
      }
      else
      {
        document.getElementById('loginemailid').style.border='2px solid red'
        document.getElementById('loginpassword').style.border='2px solid red'
      }
      
    } catch (error) {
      document.getElementById('loginemailid').style.border='2px solid red'
      document.getElementById('loginpassword').style.border='2px solid red'
      console.log(error)
    }
  }
  
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
                ref={password}
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
                ref={confirmpassword}
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
                  handleSubmit();
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
