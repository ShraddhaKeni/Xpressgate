import './Newpassword.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { validatePassword } from '../auth/validation';
import { useEffect } from 'react';
import { checkGuard } from '../auth/Auth';
const Newpassword = () => {

  const location = useLocation()
  const navigate = useNavigate()
  //console.log(location.state.guardid)

  useEffect(()=>{
    if (checkGuard()) {
     
    } else {
      window.location.href = '/'
    }  
  },[])

  const confirmPasword = async () => {
    let cp = document.getElementById('confirmpassword').value

    try {
      if(await validatePassword(cp))
      {
        const cpassworddata = {
          password: cp,
          guard_id: location.state.guardid
        }
        const { data } = await axios.post(`${window.env_var}api/auth/guardupdatepass`, cpassworddata)
        if(data.status_code==200)
        {
          navigate('/guardLogin')
        }
        else
        {
          alert('Check password')
        }
        
      }
      else
      {
        alert('Password must contain atleast 8 alphabets, atleast 1 lowercase ,atleast 1 uppercase, atleast 1 number and 1 special character')
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="NPLoginContainer">
      <div id="NPLogoId">
        <img src="/images/loginlogo.svg" alt="" />
        <div className="NPSignIn">
          <label className="NPLabel">Forgot Password</label>
        </div>
      </div>
      <div id="NPLoginImgId">
        <img src="/images/loginsideimg.png" alt="" />
      </div>
      <div id="nploginformid">
        <Form>
          <div className='input_fields'>
            <div className='email_input'>
              <label className='NPNewPassword'>New password</label>
              <input type="text" className="form-control NEWPemailtextbox" id="newpassword" placeholder='New Password' ></input>
            </div>
            <br></br><br></br>
            <div className='email_input'>
              <label className='NPConfirmPassword'>Confirm Password</label>
              <input type="password" className="form-control NEWPpasswordtextbox" id="confirmpassword" placeholder='Confirm password'></input>
            </div>
            <br></br>
            <button type="button" className="NPBtnConfirm" onClick={() => { confirmPasword() }}>Login</button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Newpassword

