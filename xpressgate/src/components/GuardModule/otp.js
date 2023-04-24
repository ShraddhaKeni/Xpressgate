import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { otpValidation } from '../auth/validation';
const Otp = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const verifyotp = async () => {
    let otp = document.getElementById('otp').value
    let num = location.state.mobile
    try {
      if(otpValidation(otp))
      {
        const dataverify = {
          mobileno: num,
          otp: otp
        }
       
        const { data } = await axios.post(`${window.env_var}api/auth/guardresetpass`, dataverify)
        if(data.status_code==200)
           navigate('/newpassword', { state: { guardid: data.data.guard_id } })
        else
        {
          alert('Enter valid OTP')
          document.getElementById('otp').style.border='1px solid red'
        }
          
     
      }
      else
      {
        document.getElementById('otp').style.border='1px solid red'
      }

     
    } 
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="otpcontainer">

      <div id="OTPlogoid">
        <img src="/images/loginlogo.svg" alt="" />
        <div className="OTP">
          <label className="OTPLabel">Forgot Password</label>
        </div>
      </div>
      <div id="OTPimgid">
        <img src="/images/loginsideimg.png" alt="Guard Side Image" />
      </div>
      <div id="otpformid">
        <Form>
          <div className='input_fields'>
            <div className='email_input'>
              <label className='OTPemail'>Enter OTP</label>
              <input type="text" className="form-control OTPemailtextbox" id="otp" maxLength="4" placeholder='Enter OTP' ></input>
            </div>
            <button type="button" className="BTNSendOtp" id='sendotp' onClick={() => { verifyotp() }}>Verify OTP</button>

          </div>
        </Form>
      </div>
    </div>
  )
}

export default Otp




