import React from "react";
import "../SocietyModule/Addlocalservice.css";
import LogOut5 from "../SocietyModule/LogOut5";
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
const Addlocalservice = () => {
  return (
    <div className="addguestcontainer1">
      <div id="headersection1">
        <div className="firstheadersection1">
          <div id="dashboardlogo1">
            <img src="/images/loginlogo.svg" alt="header logo" />
          </div>
          <div id="dashboardguard1">
            <label>Society</label>
          </div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification1">
            <a href="abc">
              <img src="/images/notification.svg" alt="notificationicon" />
            </a>
          </div>
          <div id="dashboardsetting1">
            <a href="abc">
              <img src="/images/setting.svg" alt="settingicon" />
            </a>
          </div>
          <div id="dashboardlogoutbutton">
            <LogOut5/>
          </div>
        </div>
      </div>
      <div id="societynamesection">
        <div className="societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        <div class="noticelist">
          <h4>Local Services</h4>
          <a href="abcd" class="Notice">Add Local Services</a>
          </div>
        <div className="sideimage2">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay3">
          <label>Local Service</label>
        </div>
        <Form className='formclass'>
         
            <div class="form-group5 row">
              <label class="col-lg-2 col-form-label labelsize">Vendor Name</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" name="Vendor name" placeholder=""></input>
              </div>
            </div>
            <div class="form-group5 row">
              <label class="col-lg-2 col-form-label labelsize">Vendor Type</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" name="Vendor Type" placeholder=""></input>
              </div>
            </div>
            <div class="form-group5 row">
              <label class="col-lg-2 col-form-label labelsize">Added by</label>
              <div class="col-lg-4">
                <select  class="form-control input-lg" name="Alllocalservice.css by" placeholder="">
                    <option value=" "></option>
                    <option value=" "></option>
                    <option value=" "></option>
                    <option value=" "></option>
                </select>
              </div>
            </div>
            <div class="form-group5 row">
              <label  class="col-lg-2 col-form-label labelsize">Status</label>
              <div class="col-lg-4">
              <select  class="form-control input-lg" name="Status" placeholder="">
                    <option value=" "></option>
                    <option value=" "></option>
                    <option value=" "></option>
                    <option value=" "></option>
                </select>
              </div>
            </div>
            <Button type="submit" className="btnAdd4">Add  Vendor</Button>
            </Form>
       
       
      </div>
    </div>
  );
};

export default Addlocalservice;
