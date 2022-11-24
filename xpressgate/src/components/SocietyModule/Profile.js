import React from 'react';
import './Profile.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut from './Utils/LogOut';

const Profile = () => {

   const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const formData = new FormData()

      formData.append('community_id','632970d054edb049bcd0f0b4')
      formData.append('firstname',)
    } catch (error) {
      
    }
   } 


  return (
    <div className="addguestcontainer5">
      <div id="headersection5">
        <div id="addflatsection">
          <div className="addflatheadersection">
            <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
            <div id="afsociety"><label>Society</label></div>
            <div id="afspace"></div>
            <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
            <div id="afsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
            <div id="aflogoutbutton"><LogOut/></div>
          </div>
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
                <input type="text" class="form-control input-lg" id='firstname' name="First name" placeholder="Community Name"></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Last Name</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" id='lastname' name="Last Name" placeholder=""></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Email</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" id='email' name="Email" placeholder=""></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Mobile Number</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg" id='mobile' name="Mobile Number" placeholder=""></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">User Name</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" id='username' name="User Name" placeholder=""></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Password</label>
              <div class="col-lg-4">
                <input type="password" class="form-control input-lg" id='password' name="Password" placeholder=""></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Profile Picture</label>
              <div class="col-lg-4">
                <input type="file" class="form-control input-lg" id='profile' name="Profile Picture" placeholder=""></input>
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
            <Button type="submit" onClick={(e)=>handleSubmit(e)} className="btnAdd">Save</Button>
        </Form>

      </div>  
    </div>
  )
}

export default Profile;

