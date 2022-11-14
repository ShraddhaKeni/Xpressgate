import React, { useRef } from 'react';
import './Login.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'

const Login = () => {

  let username= useRef([])
  let password= useRef([])


  const loginGuard = async()=>{
    try{
        const loginCreds={
          username:username.current.value,
          password:password.current.value
        }
        console.log(process.env.REACT_APP_SERVER_PATH)
        const {data} = await axios.post(`api/auth/guardlogin`,loginCreds)
        localStorage.clear()
        localStorage.setItem('accesstoken',data.data.accessToken)
        localStorage.setItem('community_id',data.data.community_id)
        localStorage.setItem('guard_id',data.data.id)
        window.location.href='/dashboard'
    }
    catch(err)
    { 
      
      document.getElementById('loginemailid').style.border='2px solid red'
      document.getElementById('loginpassword').style.border='2px solid red'
    }
  }
  return (
    <div className="logincontainer">
      <div id="logoid">
        <img src="/images/loginlogo.svg" alt="" />
        <div className="signin">
          <label className="signinlabel">SIGN IN</label>
        </div>
      </div>
      <div id="loginimgid">
        <img src="/images/loginsideimg.png" alt="" />
      </div>
      <div id="loginformid">
        <Form>
          <div className='input_fields'>
            <div className='email_input'>
              <label className='email'>Username</label>
              <input ref={username} type="text" className="form-control emailtextbox" onKeyPress={(e)=>{document.getElementById(e.target.id).style.border='none'}} id="loginemailid" placeholder='Username' ></input>
            </div>
            <br></br><br></br>
            <div className='email_input'>
              <label className='password'>Password</label>
              <input ref={password} type="password" className="form-control passwordtextbox" onKeyPress={(e)=>{document.getElementById(e.target.id).style.border='none'}} id="loginpassword" placeholder='Password'></input>
            </div>
            <br></br>
            <Button type="button" className="btnlogin" onClick={()=>{loginGuard()}}>Login</Button>
            <div className='forgotpassword'><a href='/forgotpassword' style={{color:"#FD6B22"}}>Forgot Password?</a></div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login

