import React, { useState } from 'react';
import './Forgotpassword.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { mobileValidation } from '../auth/validation';

const Forgotpassword = () => {

  const [mobile, setMobile] = useState({})
  //const mobilenumber = {}
  const navigate = useNavigate()

  const checkMobileno = async () => {
    setMobile(document.getElementById('mobileno').value)

    try {
      if (await mobileValidation(document.getElementById('mobileno').value)) {
        const { data } = await axios.post(`${window.env_var}api/auth/guardforgotpass`, { mobileno: document.getElementById('mobileno').value })
        // window.open('/otp', '_blank').focus();
        navigate('/otp', { state: { mobile: document.getElementById('mobileno').value } })
      }
      else {
        alert('Enter valid mobile number')
      }
    } catch (error) {
      console.log('Please check mobile number');
    }
  }

  return (
    <div className="forgotpcontainer">
      <div id="fplogoid">
        <img src="/images/loginlogo.svg" alt="" />
        <div className="fp">
          <label className="forgotplabel">Forgot Password</label>
        </div>
      </div>
      <div id="fpimgid">
        <img src="/images/loginsideimg.png" alt="" />
      </div>
      <div id="fpformid">
        <Form>
          <div className='input_fields'>
            <div className='email_input'>
              <label className='fpemail'>Enter Mobile number</label>
              <input type="text" className="form-control emailtextbox" id="mobileno" placeholder='Enter mobile number' ></input>
            </div>
            <Button type="button" className="btnsendotp" onClick={() => { checkMobileno() }}>Send OTP</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Forgotpassword

