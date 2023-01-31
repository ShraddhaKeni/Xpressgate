import React, { useEffect, useRef, useState } from "react";
import "../SocietyModule/Enter_new_pswd.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { validatePassword } from "../auth/validation";
import { Loader } from "../Loader";

const Enter_new_pswd = () => {
  let password = useRef([]);
  let confirmpassword = useRef([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [])

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
    <div className="NP_Login_Container">
      <div id="NP_Logo_ID">
        <img src="/images/loginlogo.svg" alt="" />
        <div className="NP_SignIn">
          <label className="NP_SignIn_Label">Forgot Password</label>
        </div>
      </div>
      <div id="NP_Login_Img">
        <img src="/images/societylogin.svg" alt="" />
      </div>
      <div id="NP_Login_Form_Id">
        <Loader loading={loading}>
          <Form>
            <div className="NP_Input_Fields">
              <div className="email_input">
                <label className="NP_New_Pass">New Password</label>
                <input
                  ref={password}
                  type="text"
                  className="form-control NP_Email_Text_Box"
                  onKeyPress={(e) => {
                    document.getElementById(e.target.id).style.border = "none";
                  }}
                  id="loginemailid"
                  placeholder="New Password"
                ></input>
              </div>
              <div className="email_input">
                <label className="NP_Confirm_Password">Confirm Password</label>
                <input
                  ref={confirmpassword}
                  type="password"
                  className="form-control NP_CnfmPass_TextBox"
                  onKeyPress={(e) => {
                    document.getElementById(e.target.id).style.border = "none";
                  }}
                  id="loginpassword"
                  placeholder="Confirm Password"
                ></input>
                <br />
                <button
                  type="button"
                  className="NP_ConFirm_Btn"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </Form>
        </Loader>
      </div>
    </div>
  );
};
export default Enter_new_pswd;