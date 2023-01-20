import React, { useEffect, useRef, useState } from 'react';
import './Login.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'
import {checkGuard} from '../auth/Auth'
import { ToastMessage } from '../ToastMessage';
const Login = () => {
  const [toast, setToast] = useState({ show: false })

  useEffect(()=>{
    if (checkGuard()) {
     
    } else {
      window.location.href = '/'
    }  
  },[])

  let username= useRef([])
  let password= useRef([])

  const loginGuard = async()=>{
    try{
      setToast({ show: true, type: "success", message: "Logged in successfully" })
        const loginCreds={
          username:username.current.value,
          password:password.current.value
        }
        const {data} = await axios.post(`${window.env_var}api/auth/guardlogin`,loginCreds)
        console.log(data)
        localStorage.clear()
        localStorage.setItem('accesstoken',data.data.accessToken)
        localStorage.setItem('community_id',data.data.community_id)
        localStorage.setItem('name',data.data.firstname+' '+data.data.lastname)
        localStorage.setItem('guard_id',data.data.id)
        localStorage.setItem('mode','guard')  
        setTimeout(() => {
          window.location.href='/dashboard'
        }, 1500);
       
    }
    catch(err)
    { 
      setToast({ show: true, type: "error", message: "Invalid details" })
      document.getElementById('loginemailid').style.border='2px solid red'
      document.getElementById('loginpassword').style.border='2px solid red'
    }
  }
  return (
    <div className="logincontainer">
       <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
      <div id="Glogoid">
        <img src="/images/loginlogo.svg" alt="" />
        <div className="Guardsignin">
          <label className="Guardsigninlabel">SIGN IN</label>
        </div>
      </div>
      <div id="Gloginimgid">
        <img src="/images/loginsideimg.png" alt="" />
      </div>
      <div id="Gloginformid">
        <Form>
          <div className='input_fields'>
            <div className='email_input'>
              <label className='usernameemail'>Username</label>
              <input ref={username} type="text" className="form-control emailtextboxguard" onKeyPress={(e)=>{document.getElementById(e.target.id).style.border='none'}} id="loginemailid" placeholder='Username' ></input>
            </div>
            <br></br><br></br>
            <div className='email_input'>
              <label className='guardpassword'>Password</label>
              <input ref={password} type="password" className="form-control passwordtextboxguard" onKeyPress={(e)=>{document.getElementById(e.target.id).style.border='none'}} id="loginpassword" placeholder='Password'></input>
            </div>
            <br></br>
            <Button type="button" className="GuardLoginbtn" id='login' onClick={()=>{loginGuard()}}>Login</Button>
            <div className='Guardforgotpassword'><a href='/forgotpassword' >Forgot Password?</a></div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login

