import React, { useRef, useState } from "react";
import "../../../styles/AdminReset.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastMessage } from "../../../components/ToastMessage";
import { TOAST } from "../../../common/utils";

const AdminReset = () => {
  let username = useRef([]);

  const navigate = useNavigate()
  const [toast, setToast] = useState({ show: false })

  const sendOTP = async () => {
    try {
      const { data } = await axios.post(`${window.env_var}api/admin/adminresetpassword`, { mobileno: username.current.value })
      navigate('/adotp', { state: { mobileno: data.data.mobileno } })
    } catch (error) {
      setToast(TOAST.ERROR(""))
    }
  }
  return (
    <div className="superadmincontainer">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

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
              <label className="adminemail">Enter Mobile</label>
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

              <button
                type="button"
                className="adminsendcodebtn "
                onClick={() => sendOTP()}
              >
                Send Code
              </button>
            </div>

          </div>
        </Form>
      </div>
    </div>
  );
};

export default AdminReset;
