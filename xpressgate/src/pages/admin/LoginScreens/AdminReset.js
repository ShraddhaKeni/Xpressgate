import React, { useRef } from "react";
import "../../../styles/AdminReset.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminReset = () => {
  let username = useRef([]);

  const navigate = useNavigate()

  const sendOTP = async () => {
    try {
      const { data } = await axios.post(`${window.env_var}api/admin/adminresetpassword`, { mobileno: username.current.value })
      navigate('/adotp', { state: { mobileno: data.data.mobileno } })
    } catch (error) {

    }
  }
  return (
    <div className="superadmincontainer">
        <div id="SOC_Reset_LogoId">
              <img src="/images/loginlogo.svg" alt="" />
          
            <div className="SOC_Fgt">
              <label className="SOC_fgt_Label">Forgot Password</label>
            </div>
            </div>
 <div id="Superadminlogo">
              <img src="/images/loginlogo.svg" alt="" />
            </div>
            <br /><br />
            <div className="signinlabel" disabled>
              RESET PASSWORD
            </div>
            <br />


      <div id="superadminloginimg">
        <img src="./images/SuperAdminImg.svg" alt="" />
      </div>
      <div id="Superadminloginform">
        <Form>
          <div className="Superadmininputfield">
         
            <div className="email_input">
              <label className="adminmobile mb-3">Enter Mobile</label>
              <input
                ref={username}
                type="text"
                className="form-control adminemailtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="loginemailid"
                placeholder="Enter Mobile"
              ></input>
            </div>
            <br></br>
            <div className="email_input">

              <Button
                type="button"
                className="adminsendcodebtn mt-5"
                onClick={() => sendOTP()}
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

export default AdminReset;
