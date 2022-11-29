import React, { useEffect, useRef, useState } from 'react';
import '../SocietyModule/Password.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Logout from './Utils/LogOut'
import axios from 'axios';
import { validatePassword } from '../auth/validation';

const Password = () => {

  const [details,setDetails] = useState({})
  useEffect(()=>{
    getDetails();
  },[])

  const password = useRef([])
  const confirmPass = useRef([])
  const oldpass = useRef([])

  const getDetails=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/society/getOne/${localStorage.getItem('member_id')}`)
      setDetails(data.data.Member[0])
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      console.log(details)
      if(validatePassword(password.current.value))
      {
       
        if((password.current.value===confirmPass.current.value)&&(password.current.value!==""&&confirmPass.current.value!==""))
        {
          const config = {
            headers:{
              'x-access-token':localStorage.getItem('accesstoken')
            }
          }
          const sendData = {
            username:details.username,
           
            password:oldpass.current.value,
            newpassword:password.current.value,
            confirmpassword:confirmPass.current.value,
            id:localStorage.getItem('member_id')
          }
          const {data} = await axios.post(`${window.env_var}api/society/changepassword`,sendData,config)
           window.location.href='/scDashboard'

        }
        else
        {
          console.log('error')
        }
      }
      else
      {

      }
    
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="addguestcontainer1">
      <div id="headersection1">
        <div className="firstheadersection1">
          <div id="dashboardlogo1"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dashboardguard1"><label>Society</label></div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification1"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="dashboardsetting1"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="dashboardlogoutbutton"><Logout/></div>
        </div>
      </div>
      <div id="societynamesection">
        <div className='societyname'>
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        {/* <div className='sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div> */}
      </div>
      <div className='addguestbackgroundimg'>
        <div className='Addguestdisplay1'>
          <label>Change Password</label>
        </div>
        <Form className='formclass'>
        <div className="input_fields1">
            <div className="email_input">
              <label className="CurrentPass">Current Password</label>
              <input
              ref={oldpass}
                type="text"
                className="form-control emailtextbox1"
                id="oldpass"
                placeholder="Current Password"
              ></input>
            </div>
            <br></br>
            <div className="email_input">
              <label className="newpass">New Password</label>
              <input
                ref={password}
                type="password"
                className="form-control passwordtextbox1"
                
                id="loginpassword"
                placeholder="New Password"
              ></input>
              </div>
              <div className="email_input">
              <label className="confirmpass">Confirm Password</label>
              <input
                ref={confirmPass}
                type="password"
                className="form-control passwordtextbox1"
                
                id="loginpassword"
                placeholder="Confirm Password"
              ></input>
              </div>
          </div>
            <Button type="submit" onClick={(e)=>handleSubmit(e)} className="btnAdd1">Update</Button>
        </Form>

      </div>  
    </div>
  )
}

export default Password ;

