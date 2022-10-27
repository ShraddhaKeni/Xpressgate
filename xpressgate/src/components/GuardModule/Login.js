import React, { useRef } from 'react';
import './Login.css';
import { Form, Button } from 'react-bootstrap';

const Login = () => {

  let username= useRef([])
  let password= useRef([])
  const loginGuard = async(username,password)=>{
    try{
     console.log(localStorage.getItem('username'))
     localStorage.clear()
    }
    catch(err)
    {

    }
  }
  return (
    <div className="container1">
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
              <label className='email'>Email</label>
              <input ref={username} type="email" className="form-control emailtextbox" id="loginemailid" placeholder='Email' ></input>
            </div>
            <br></br>
            <div className='email_input'>
              <label className='password'>Password</label>
              <input ref={password} type="password" className="form-control passwordtextbox" id="loginemailid" placeholder='Password'></input>
            </div>
            <Button type="submit" className="btnlogin" onClick={()=>{loginGuard(username.current.value,password.current.value)}}>Login</Button>
            <div className='forgotpassword'><a href='https://gitlab.com/users/password/new' style={{color:"#FD6B22"}}>Forgot Password?</a></div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login

