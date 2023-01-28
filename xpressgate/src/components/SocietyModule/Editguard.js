import React from "react";
import "../SocietyModule/Editguard.css";
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut from './Utils/LogOut'


const Editguard = () => {
  
  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
        <div className="addflatheadersection">
          <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="afsociety"><label>Society</label></div>
          <div id="afspace"></div>
          <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="afsetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aflogoutbutton"><LogOut/></div>
        </div>
    
    </div>
      <div id="societynamesection">
        <div className="EG_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        
        <div className="addguard_sideimg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay4">
          <label>Guard Details</label>
        </div>
        <Form className='formclass'>
         
         <div class="form-group form-group6 row">
           <label class="col-lg-2 col-form-label labelsize1">First Name</label>
           <div class="col-lg-4">
             <input type="text" class="form-control input-lg" name="First name" placeholder=""></input>
           </div>
         </div>
         <div class="form-group form-group6 row">
           <label class="col-lg-2 col-form-label labelsize1">Last Name</label>
           <div class="col-lg-4">
             <input type="text" class="form-control input-lg" name="Last name" placeholder=""></input>
           </div>
         </div>
         <div class="form-group form-group6 row">
           <label class="col-lg-2 col-form-label labelsize1">Phone No</label>
           <div class="col-lg-4">
             <input type="number" class="form-control input-lg" name="Phone No" placeholder=""></input>
           </div>
         </div>
         <div class="form-group form-group6 row">
           <label class="col-lg-2 col-form-label labelsize1">Email </label>
           <div class="col-lg-4">
             <input type="email" class="form-control input-lg" name="Email " placeholder=""></input>
           </div>
         </div>
         <div class="form-group form-group6 row">
           <label class="col-lg-2 col-form-label labelsize1">Add Profile Picture</label>
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
