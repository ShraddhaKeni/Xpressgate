import React from 'react';
import '../SocietyModule/Password.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut2 from '../SocietyModule/LogOut2'

const Password = () => {
  return (
    <div className="addguestcontainer1">
      <div id="headersection1">
        <div className="firstheadersection1">
          <div id="dashboardlogo1"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dashboardguard1"><label>Society</label></div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification1"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="dashboardsetting1"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="dashboardlogoutbutton"><LogOut2/></div>
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
                
                type="text"
                className="form-control emailtextbox1"
                
                id="loginemailid"
                placeholder="Current Password"
              ></input>
            </div>
            <br></br>
            <div className="email_input">
              <label className="newpass">New Password</label>
              <input
                
                type="password"
                className="form-control passwordtextbox1"
                
                id="loginpassword"
                placeholder="New Password"
              ></input>
              </div>
              <div className="email_input">
              <label className="confirmpass">Confirm Password</label>
              <input
                
                type="password"
                className="form-control passwordtextbox1"
                
                id="loginpassword"
                placeholder="Confirm Password"
              ></input>
              </div>
          </div>
            <Button type="submit" className="btnAdd1">Update</Button>
        </Form>

      </div>  
    </div>
  )
}

export default Password ;

