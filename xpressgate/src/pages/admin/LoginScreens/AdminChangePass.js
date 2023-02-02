import React, { useRef, useState } from "react";
import "../../../styles/AdminChangePass.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { validatePassword } from "../../../components/auth/validation";
import { ToastMessage } from "../../../components/ToastMessage";
import { TOAST } from "../../../common/utils";

const AdminChangePass = () => {
  let currentpassword = useRef([]);
  let newpassword = useRef([]);
  let confirmpassword = useRef([]);

  const [member, setMember] = useState({})
  const [toast, setToast] = useState({ show: false })

  const location = useLocation()


  const handleSubmit = async () => {
    try {
      if (await validatePassword(newpassword.current.value)) {
        console.log(validatePassword(newpassword.current.value))
        if ((newpassword.current.value === confirmpassword.current.value) && (newpassword.current.value !== "" && confirmpassword.current.value !== "")) {
          const sendData = {
            password: currentpassword.current.value,
            newpassword: confirmpassword.current.value,
            confirmpassword: newpassword.current.value,
            id: localStorage.admin_id
          }
          const config = {
            headers: {
              'x-access-token': localStorage.getItem('accesstoken')
            }
          }
          const { data } = await axios.post(`${window.env_var}api/admin/changepassword`, sendData, config)
          if (data && data?.status_code == 200) {
            setToast(TOAST.SUCCESS(data?.message));
            setTimeout(() => {
              window.location.href = '/adminlogin'

            }, 1000)
          } else if (data?.status_code == 201) {
            setToast(TOAST.ERROR(data?.message));
          }
        }
        else {
          setToast(TOAST.ERROR("Password do not match"))

          document.getElementById('currentpassword').style.border = '2px solid red'
          document.getElementById('newpassword').style.border = '2px solid red'
          document.getElementById('confirmpassword').style.border = '2px solid red'
        }
      }
      else {
        setToast(TOAST.ERROR("Password must be atleast 8 characters long must contain a number,uppercase, lowercase and a special character"))
        document.getElementById('currentpassword').style.border = '2px solid red'
        document.getElementById('newpassword').style.border = '2px solid red'
        document.getElementById('confirmpassword').style.border = '2px solid red'
      }

    } catch (error) {
      setToast(TOAST.ERROR(error.message))

      document.getElementById('currentpassword').style.border = '2px solid red'
      document.getElementById('newpassword').style.border = '2px solid red'
      document.getElementById('confirmpassword').style.border = '2px solid red'
      console.log(error)
    }
  }
  return (
    <div className="superadmincontainer">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

      <div id="Superadminlogo">
        <img src="/images/loginlogo.svg" alt="" />
        <div className="Admin_SignIn">
          <label className="Admin_SignIn_Label">Reset Password</label>
        </div>
      </div>
      <div id="superadminloginimg">
        <img src="./images/SuperAdminImg.svg" alt="" />
      </div>
      <div id="Superadminloginform">
        <Form>
          <div className="Superadmininputfield">
            <div className="email_input">
              <label className="admincurrentpass">Current Password</label>
              <input
                ref={currentpassword}
                type="text"
                className="form-control adminemailtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="currentpassword"
                placeholder="Current Password"
              ></input>
            </div>
            <br />
            <div className="email_input">
              <label className="adminresetnewpass">New Password</label>
              <input
                ref={newpassword}
                type="text"
                className="form-control adminpasswordbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="newpassword"
                placeholder="New Password"
              ></input>
            </div>
            <br />
            <div className="email_input">
              <label className="adminresetconfirmpass">Confirm  Password</label>
              <input
                ref={confirmpassword}
                type="password"
                className="form-control adminpasswordbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="confirmpassword"
                placeholder="Confirm  Password"
              ></input>
              <br />
              <button
                type="button"
                className="adminresetpasswordbtn"
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

export default AdminChangePass;
