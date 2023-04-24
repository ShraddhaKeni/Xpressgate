import React, { useEffect, useRef, useState  } from "react";
import "../../../styles/AdminEnterNewPass.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { validatePassword } from "../../../components/auth/validation";

const AdminEnterNewPass = () => {
  let password = useRef([]);
  let confirmpassword = useRef([]);

  const [member,setMember] = useState({})

  const location = useLocation()


  const handleSubmit =async()=>{
    try {
      if( await validatePassword(password.current.value))
      {

          if((password.current.value===confirmpassword.current.value)&&(password.current.value!==""&&confirmpassword.current.value!==""))
          {
          const sendData={
            password:confirmpassword.current.value,
            admin_mem_id:location.state.admin_mem_id
          }
          const {data} = await axios.post(`${window.env_var}api/admin/adminupdatepass`,sendData)
          window.location.href = '/adminlogin'
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
<div className="superadmincontainer">
        <div id="Superadminlogo">
              <img src="/images/loginlogo.svg" alt="" />
            <div className="Admin_SignIn">
              <label className="Admin_SignIn_Label">Forgot Password</label>
            </div>
            </div>
        <div id="superadminloginimg">
        <img src="./images/SuperAdminImg.svg" alt="" />
      </div>
      <div id="Superadminloginform">
        <Form>
          <div className="Superadmininputfield">
            <div className="email_input">
              <label className="adminemail">New Password</label>
              <input
                ref={password}
                type="text"
                className="form-control adminemailtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="loginemailid"
                placeholder="New Password"
              ></input>
            </div>
            <br></br>
            <div className="email_input">
              <label className="adminpassword">Confirm  Password</label>
              <input
                ref={confirmpassword}
                type="password"
                className="form-control adminpasswordbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="loginpassword"
                placeholder="Confirm Password"
              ></input>
              <br />
              <button
                type="button"
                className="adminconfirmpasswordbtn"
                onClick={() => {
                  handleSubmit();
                }}
              >
               Change Password
              </button>
            </div>

          </div>
        </Form>
      </div>
    </div>
  );
};

export default AdminEnterNewPass;
