import React, { useRef, useState  } from "react";
import "../../../styles/AdminChangePass.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { validatePassword } from "../../../components/auth/validation";

const AdminChangePass= () => {
  let currentpassword = useRef([]);
  let newpassword = useRef([]);
  let confirmpassword = useRef([]);

  const [member,setMember] = useState({})

  const location = useLocation()


  const handleSubmit =async()=>{
    try {
      if( await validatePassword(newpassword.current.value))
      {
        console.log(validatePassword(newpassword.current.value))
          if((newpassword.current.value===confirmpassword.current.value)&&(newpassword.current.value!==""&&confirmpassword.current.value!==""))
          {
          const sendData={
            newpassword:confirmpassword.current.value,
            admin_mem_id:location.state.admin_mem_id
          }
          const {data} = await axios.post(`${window.env_var}api/admin/adminchangedpass`,sendData)
          window.location.href = '/adminlogin'
        }
        else
        {
          document.getElementById('currentpassword').style.border='2px solid red'
          document.getElementById('newpassword').style.border='2px solid red'
          document.getElementById('confirmpassword').style.border='2px solid red'
        }
      }
      else
      {
        document.getElementById('currentpassword').style.border='2px solid red'
        document.getElementById('newpassword').style.border='2px solid red'
        document.getElementById('confirmpassword').style.border='2px solid red'
      }
      
    } catch (error) {
      document.getElementById('currentpassword').style.border='2px solid red'
      document.getElementById('newpassword').style.border='2px solid red'
      document.getElementById('confirmpassword').style.border='2px solid red'
      console.log(error)
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
            CHANGE PASSWORD
            </div>
            <br />
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
                placeholder="New Password"
              ></input>
            </div>
            <br/>
            <div className="email_input">
              <label className="adminresetnewpass">New Password</label>
              <input
                ref={newpassword}
                type="text"
                className="form-control adminemailtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="newpassword"
                placeholder="New Password"
              ></input>
            </div>
            <br/>
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
              <Button
                type="button"
                className="adminresetpasswordbtn"
                onClick={() => {
                  handleSubmit();
                }}
              >
               Change Password
              </Button>
            </div>

          </div>
        </Form>
      </div>
    </div>
  );
};

export default AdminChangePass;
