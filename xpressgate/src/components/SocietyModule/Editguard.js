import React from "react";
import "../SocietyModule/Editguard.css";
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Editguard_LogOut from "./Editguard_LogOut";


const Editguard = () => {
   


  return (
    <div className="addguestcontainer3">
      <div id="headersection3">
        <div className="firstheadersection3">
          <div id="dashboardlogo3">
            <img src="/images/loginlogo.svg" alt="header logo" />
          </div>
          <div id="dashboardguard3">
            <label>Society</label>
          </div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification3">
            <a href="abc">
              <img src="/images/notification.svg" alt="notificationicon" />
            </a>
          </div>
          <div id="dashboardsetting3">
            <a href="abc">
              <img src="/images/setting.svg" alt="settingicon" />
            </a>
          </div>
          <div id="dashboardlogoutbutton">
            <Editguard_LogOut/>
          </div>
        </div>
      </div>
      <div id="societynamesection">
        <div className="societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        
        <div className="addguard_sideimg">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay4">
          <label>Guard Details</label>
        </div>
        <Form className='formclass'>
         
         <div class="form-group6 row">
           <label class="col-lg-2 col-form-label labelsize">First name</label>
           <div class="col-lg-4">
             <input type="text" class="form-control input-lg" name="First name" placeholder=""></input>
           </div>
         </div>
         <div class="form-group6 row">
           <label class="col-lg-2 col-form-label labelsize">Last name</label>
           <div class="col-lg-4">
             <input type="text" class="form-control input-lg" name="Last name" placeholder=""></input>
           </div>
         </div>
         <div class="form-group6 row">
           <label class="col-lg-2 col-form-label labelsize">Phone No</label>
           <div class="col-lg-4">
             <input type="number" class="form-control input-lg" name="Phone No" placeholder=""></input>
           </div>
         </div>
         <div class="form-group6 row">
           <label class="col-lg-2 col-form-label labelsize">Email </label>
           <div class="col-lg-4">
             <input type="email" class="form-control input-lg" name="Email " placeholder=""></input>
           </div>
         </div>
         <div class="form-group6 row">
           <label class="col-lg-2 col-form-label labelsize">Add Profile Picture</label>
           <div class="col-lg-4">
             <input type="file" class="form-control input-lg" name="Add Profile Picture" placeholder=""></input>
           </div>
         </div>
         
         
         
         <Button type="submit" className="btnAdd4">Edit Guard</Button>
         </Form>

      </div>
    </div>
       
       
    
  );
};

export default Editguard;
