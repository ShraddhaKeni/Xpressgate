import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'

const Otp = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const verifyotp = async () => {
    let otp = document.getElementById('otp').value
    let num = location.state.mobile
    try {
      const dataverify = {
        mobileno: num,
        otp: otp
      }
     
      let { data } = await axios.post(`api/auth/guardresetpass`, dataverify)
      navigate('/newpassword', { state: { guardid: data.data.guard_id } })
      console.log(data)
    } 
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="otpcontainer">

      <div id="otplogoid">
        <img src="/images/loginlogo.svg" alt="" />
        <div className="otp">
          <label className="otplabel">Forgot Password</label>
        </div>
      </div>
      <div id="otpimgid">
        <img src="/images/loginsideimg.png" alt="" />
      </div>
      <div id="otpformid">
        <Form>
          <div className='input_fields'>
            <div className='email_input'>
              <label className='otpemail'>Enter OTP</label>
              <input type="text" className="form-control emailtextbox" id="otp" placeholder='Enter OTP' ></input>
            </div>
            <Button type="button" className="btnsendotp" onClick={() => { verifyotp() }}>Verify OTP</Button>

          </div>
        </Form>
      </div>
    </div>
  )
}

export default Otp




