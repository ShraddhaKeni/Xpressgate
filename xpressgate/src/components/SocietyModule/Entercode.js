import React, { useRef } from "react";
import "../SocietyModule/Entercode.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { otpValidation } from '../auth/validation';

const Entercode = () => {
  let username = useRef([]);
  const location = useLocation()
  const navigate = useNavigate()

  // const sendOTP = async () => {
  //   try {
  //     const { data } = await axios.post(`${window.env_var}api/society/societyresetpass`, { mobileno: location.state.mobileno, otp: username.current.value })
  //     navigate('/newpass', { state: { mem_id: data.data.mem_id, mobileno: data.data.mobileno } })
  //   } catch (error) {

  //   }
  // }

  const sendOTP = async () => {
    let otp = document.getElementById('loginemailid').value
    try {
      if (otpValidation(otp)) 
      {
        const { data } = await axios.post(`${window.env_var}api/society/societyresetpass`, { mobileno: location.state.mobileno, otp })
        if(data.status_code==200)
        navigate('/newpass', { state: { mem_id: data.data.mem_id, mobileno: data.data.mobileno } })
     else
     {
       alert('Enter valid OTP')
       document.getElementById('otp').style.border='1px solid red'
     }
        
      } else {
        document.getElementById('otp').style.border = '1px solid red'
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="logincontainer3">
      <div id="loginimgid3">
        <img src="/images/societylogin.svg" alt="" />
      </div>
      <div id="loginformid3">
        <Form>
          <div className="input_fields3">
            <div id="logoid3">
              <img src="/images/loginlogo.svg" alt="" />
            </div>
            <br />
            <div className="socentercode">
              <label className="soccodelabel">Forgot Password</label>
            </div>
            <br />
            <br></br>
            <div className="email_input">
              <label className="socenterotp">Enter OTP</label>
              <input ref={username} type="text" maxLength="4" className="form-control socotptextbox" onKeyPress={(e) => { document.getElementById(e.target.id).style.border = "none"; }}
                id="loginemailid" placeholder="Enter OTP"></input>
            </div>

            <div className="email_input">
              <br />
              <Button
                type="button"
                className="btnverifyOTP"
                onClick={() => { sendOTP() }}
              >
                Verify OTP
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Entercode;
