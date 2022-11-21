import React from 'react';
import './Profile.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOutt from '../SocietyModule/LogOutt';

const Profile = () => {
  return (
    <div className="addguestcontainer5">
    <div id="headersection5">
      <div className="firstheadersection5">
        <div id="dashboardlogo1"><img src="/images/loginlogo.svg" alt="header logo" /></div>
        <div id="dashboardguard5"><label>Society</label></div>
        <div id="dashboardspace5"></div>
        <div id="dashboardnotification5"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
        <div id="dashboardsetting5"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
        <div id="dashboardlogoutbutton5"><LogOutt/></div>
      </div>
    </div>
      <div id="guardnamesection5">
        <div className='guardname5'>
          <img src="/images/profileicon.svg" alt="guard name" />
          <label>Society Name</label>
        </div>
        {/* <div className='sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div> */}
      </div>
      <div className='addguestbackgroundimg'>
        <div className='Addguestdisplay5'>
          <label>Profile</label>
        </div>
        <Form className='formclass'>
          
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">First Name</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" name="First name" placeholder="Community Name"></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Last Name</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" name="Last Name" placeholder=""></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Email</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" name="Email" placeholder=""></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Mobile Number</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg" name="Mobile Number" placeholder="" value></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">User Name</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" name="User Name" placeholder=""></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Password</label>
              <div class="col-lg-4">
                <input type="password" class="form-control input-lg" name="Password" placeholder=""></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Profile Picture</label>
              <div class="col-lg-4">
                <input type="file" class="form-control input-lg" name="Profile Picture" placeholder=""></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Gender</label>
              <div class="col-lg-4">
                <select  class="form-control input-lg" name="Gender" placeholder="Gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other" selected>Other</option>
                </select>
              </div>
            </div>
            <Button type="submit" className="btnAdd">Save</Button>
        </Form>

      </div>  
    </div>
  )
}

export default Profile;

