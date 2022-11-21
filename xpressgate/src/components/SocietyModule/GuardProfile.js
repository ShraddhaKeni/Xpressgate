import React from "react";
import "../SocietyModule/GuardProfile.css";
import { Button } from 'react-bootstrap';

import GuardProfile_LogOut from "./GuardProfile_LogOut";


const GuardProfile = () => {
   


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
            <GuardProfile_LogOut/>
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
          <label>Guard Name</label>
        </div>
        <div className="guarddetailscard">
            <div className="cardimage">
                <img src="/images/mteam.svg " alt="Guard Image"></img>
                <h4>Guard Name</h4>
            </div>
            <div className="guardcontainerbox">
               <label for="Mobileno" className="mobileno">Mobile No</label>
               <br/><br/>
               <label for="Guard_name" className="Guard_Name">Username</label>
            </div>
            <div className="buttonContainer">
              <button type="button" class="editbtn">Edit</button>
              <button type="button" class="removebtn">Remove</button>
            </div>

        </div>

      </div>
    </div>
       
       
    
  );
};

export default GuardProfile;
