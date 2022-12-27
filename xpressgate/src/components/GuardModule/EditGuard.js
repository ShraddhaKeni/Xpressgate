import React from 'react'
import LogOut from "./Utils/LogOut";
import { Form } from "react-bootstrap";

const EditGuard = () => {



  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
        <div className="addflatheadersection">
          <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="afsociety"><label>Guard</label></div>
          <div id="afspace"></div>
          <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="afsetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aflogoutbutton"><LogOut/></div>
        </div>
    
    </div>
      <div id="societynamesection">
        <div className="VPay_societyname">
          <img src="/images/guardnameicon.svg" alt="Society image" />
          <label>Guard Name</label>
        </div>
        <br/>
        
        <div className="VPay_sideimg">
          <img src="/images/sideimage.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="VPaydisplay">
          <label>Edit Guard</label>
        </div>
        <Form className="formclass">
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">First Name</label>
                <div class="col-lg-4">
                <input type="text" class="form-control input-lg SideB" id='Guard_First_Name' name="First name" placeholder="First name" > 
                  </input>
                  
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Last Name</label>
                <div class="col-lg-4">
                  <input type="text" class="form-control input-lg SideB" id='Guard_Last_Name' name="Last name" placeholder="Last name"/>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">User Name</label>
                <div class="col-lg-4">
                  <input type="text" class="form-control input-lg SideB" id='Guard_User_Name' name="User name" placeholder="First name"/>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Mobile No</label>
                <div class="col-lg-4">
                  <input type="number" class="form-control input-lg SideB" id='Guard_Mobile_Name' name="Mobile No" placeholder="XXX-XXX-XXXX" readOnly/>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Email</label>
                <div class="col-lg-4">
                  <input type="email" class="form-control input-lg SideB" id='Guard_Email' name="Email" placeholder="XYZ@.com"/>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Profile Picture</label>
                <div class="col-lg-4">
                  <input type="file" class="form-control input-lg SideB" id='Guard_Mobile_Name' name="profle pic"/>
                </div>
              </div>
          
              <button type="submit" className="VPay_Add">
                  Edit
              </button>
        </Form>
      </div>
    </div>
       
  );
}

export default EditGuard;