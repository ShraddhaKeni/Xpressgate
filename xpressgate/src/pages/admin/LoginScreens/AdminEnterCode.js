import React, { useRef } from "react";
import "../../../styles/AdminEnterCode.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AdminEnterCode = () => {
  let username = useRef([]);
  const location = useLocation()
  const navigate = useNavigate()
  const sendOTP = async()=>{
    try {
      const {data} = await axios.post(`${window.env_var}api/admin/adminresetpass`,{mobileno:location.state.mobileno,otp:username.current.value})
      navigate('/newpass',{state:{admin_mem_id:data.data.mem_id,mobileno:data.data.mobileno}})
    } catch (error) {
      
    }
  }
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
            RESET PASSWORD
            </div>
            <br />
            <div className="email_input">
              <label className="adminentercode">Enter Code</label>
              <input
                ref={username}
                type="text"
                className="form-control adminemailtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="loginemailid"
                placeholder="Enter Code"
              ></input>
            </div>
            <br></br>
            <div className="email_input">
             
              <Button
                type="button"
                className="adminverifybtn"
                onClick={()=>{sendOTP()}}
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

export default AdminEnterCode;
