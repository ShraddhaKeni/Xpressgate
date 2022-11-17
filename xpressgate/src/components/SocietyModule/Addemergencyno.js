import React from "react";
import "../SocietyModule/Addemergencyno.css";
import LogOut from './Utils/LogOut'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
const Addemergencyno = () => {
  return (
    <div className="addguestcontainer1">
      <div id="headersection1">
      <div id="addflatsection">
        <div className="addflatheadersection">
          <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="afsociety"><label>Society</label></div>
          <div id="afspace"></div>
          <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="afsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aflogoutbutton"><LogOut /></div>
        </div>
      </div>
      </div>
      <div id="societynamesection">
        <div className="societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        
        <div className="sideimage4">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay3">
          <label>Add Emergency Number</label>
        </div>
        <Form className='formclass'>
         
            <div class="form-group5 row">
              <label class="col-lg-2 col-form-label labelsize">Name</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" name="Name" placeholder=""></input>
              </div>
            </div>
            <div class="form-group5 row">
              <label class="col-lg-2 col-form-label labelsize">Phone Number</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" name="Phone Number" placeholder=""></input>
              </div>
            </div>
            <div class="form-group5 row">
              <label class="col-lg-2 col-form-label labelsize">Type</label>
              <div class="col-lg-4">
                <select  class="form-control input-lg" name="Type" placeholder="">
                    <option value=" "></option>
                    <option value=" "></option>
                    <option value=" "></option>
                    <option value=" "></option>
                </select>
              </div>
            </div>
            
            <Button type="submit" className="btnAdd4">Add Number</Button>
            </Form>
       
       
      </div>
    </div>
  );
};

export default Addemergencyno;
