import React, { useRef,useState, useEffect } from "react";
import "./Reset.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { mobileValidation } from '../auth/validation';
import { Loader } from "../Loader";

const Reset = () => {
  let username = useRef([]);
  const [mobile, setMobile] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(false);
  }, [])

  const sendOTP = async () => {
    setMobile(document.getElementById('mobileno').value)
    try {
      if (await mobileValidation(document.getElementById('mobileno').value)) {
        const { data } = await axios.post(`${window.env_var}api/society/societyforgotpass`, { mobileno: username.current.value })
        navigate('/scotp', { state: { mobileno: data.data.mobileno } })
      } else {
        alert('Enter valid mobile number')
      }
    } catch (error) {
      alert('Please check mobile number');
    }
  }

  return (
    <div className="SOC_RESET_CONTAINER">
      <div id="SOC_Reset_LogoId">
        <img src="/images/loginlogo.svg" alt="" />
        <div className="SOC_Fgt">
          <label className="SOC_fgt_Label">Forgot Password</label>
        </div>
      </div>
      <div id="RESET_LOGIN_IMG">
        <img src="/images/societylogin.svg" alt="" />
      </div>
      <div id="Soc_LOgin_Form_ID">
        <Loader loading={loading}>
          <Form>
            <div className="SOC_Input_Fields">
              <div className="email_input">
                <label className="SOC_EnterMobileNo">Enter Mobile Number</label>
                <input ref={username} type="text" maxLength="10" className="form-control socfptextbox" onKeyPress={(e) => { document.getElementById(e.target.id).style.border = "none"; }}
                    id="mobileno" placeholder=""></input>
              </div>
              <div className="email_input"><br />
                <button type="button" className="btnsocsendotp" onClick={() => sendOTP()}>Send OTP</button>
              </div>
            </div>
          </Form>
        </Loader>
      </div>
    </div>
  );
};
export default Reset;