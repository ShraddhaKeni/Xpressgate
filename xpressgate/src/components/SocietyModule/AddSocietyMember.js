import React, { useEffect, useState } from "react";
import LogOut from './Utils/LogOut'
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";


const AddSocietyMember = () => {

  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">

        <div className="addflatheadersection">
          <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="afsociety"><label>Society</label></div>
          <div id="afspace"></div>
          <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="afsetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aflogoutbutton"><LogOut /></div>
        </div>

      </div>
      <div id="societynamesection">
        <div className="AMM_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
       
        <div className="ASocMSideIMG">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="AMM_display">
          <label>Add Society Member</label>
        </div>
        <Form className="formclass">
          <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Community id</label>
                <div class="col-lg-4">
                  <select type="text" class="form-control input-lg SideB" id='community_id' name="community id" >
                    <option  disabled value={null} selected></option>
                      
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">First Name</label>
                <div class="col-lg-4">
                  <input type="text" class="form-control input-lg SideB" id='First_name'  name="First name" placeholder="First Name"> 
                  </input>
                  
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Last Name</label>
                <div class="col-lg-4">
                  <input type="text" class="form-control input-lg SideB" id='last_name'  name="Last name" placeholder="Last Name"> 
                  </input>
                  
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Gender</label>
                <div class="col-lg-4">
                  <select type="text" class="form-control input-lg SideB" id='gender' name="Gender" >
                    <option  disabled value={null} selected>Male</option>
                      
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">User Name</label>
                <div class="col-lg-4">
                  <input type="text" class="form-control input-lg SideB" id='user_name' name="User Name" />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Mobile No</label>
                <div class="col-lg-4">
                  <input type="number" class="form-control input-lg SideB" id='mobile_no' name="Mobile No" />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Email</label>
                <div class="col-lg-4">
                  <input type="email" class="form-control input-lg SideB" id='email' name="Email" />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Profile picture</label>
                <div class="col-lg-4">
                  <input type="file" class="form-control input-lg SideB" id='picture' name="Profile pic"> 
                  </input>
                </div>
              </div>
              <button type="submit" className="VPay_Add">
                  Add Member
              </button>
        </Form>
      </div>
    </div>
  );
};

export default AddSocietyMember;
