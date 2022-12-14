import React, { useRef,useState } from "react";
import "./Reset.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { mobileValidation } from '../auth/validation';

const Reset = () => {
  let username = useRef([]);

  const [mobile, setMobile] = useState({})

  const navigate = useNavigate()

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
      console.log('Please check mobile number');
    }
  }


  return (
    <div className="logincontainer4">
      <div id="loginimgid4">
        <img src="/images/societylogin.svg" alt="" />
      </div>
      <div id="loginformid4">
        <Form>
          <div className="input_fields4">
            <div id="logoid4">
              <img src="/images/loginlogo.svg" alt="" />
            </div>
            <div className="spocfp">
              <label className="socfogtpwd">Forgot Password</label>
            </div>
            <br />
            <div className="email_input">
              <label className="socfpmobile">Enter Mobile Number</label>
              <input ref={username} type="text" maxLength="10" className="form-control socfptextbox" onKeyPress={(e) => { document.getElementById(e.target.id).style.border = "none"; }}
                id="mobileno" placeholder=""></input>
            </div>
           
            <div className="email_input"><br />
              <Button type="button" className="btnsocsendotp" onClick={() => sendOTP()}>Send OTP</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Reset;
