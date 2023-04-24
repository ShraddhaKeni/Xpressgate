import React, { useEffect, useRef, useState  } from "react";
import "../../../styles/AdminEnterNewPass.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { validatePassword } from "../../../components/auth/validation";
import { checkPartner } from '../../../components/auth/Auth';
const PartnerNewPassword = () => {
  
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
    if (checkPartner()) {
     
    } else {
      window.location.href = '/'
    }  
  },[])

  const confirmPasword = async () => {
    let cp = document.getElementById('confirmpassword').value

    try {
      if(await validatePassword(cp))
      { 
        const cpassworddata = {
          password: cp,
          partner_id: location.state.partner_id
        }
        const { data } = await axios.post(`${window.env_var}api/auth/partner-update-password`, cpassworddata)
        if(data.status_code==200)
        {
          navigate('/partnerlogin')
        }
        else
        {
          alert('Check password')
        }
        
      }
      else
      {
        alert('Password must contain atleast 8 alphabets, atleast 1 lowercase ,atleast 1 uppercase, atleast 1 number and 1 special character')
      }
    }
    catch (error) {
      console.log(error);
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
        <img src="./images/PartnerLogin.svg" alt="" />
      </div>
      <div id="Superadminloginform">
        <Form>
          <div className="Superadmininputfield">
            <div className="email_input">
              <label className="adminemail">New Password</label>
              <input
                // ref={password}
                type="text"
                className="form-control adminemailtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                // id="loginemailid"
                id="password"
                placeholder="New Password"
              ></input>
            </div>
            <br></br>
            <div className="email_input">
              <label className="adminpassword">Confirm  Password</label>
              <input
                // ref={confirmpassword}
                id="confirmpassword"
                type="password"
                className="form-control adminpasswordbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                // id="loginpassword"
                placeholder="Confirm Password"
              ></input>
              <br />
              <button
                type="button"
                className="adminconfirmpasswordbtn"
                onClick={() => { confirmPasword() }}
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

export default PartnerNewPassword;
