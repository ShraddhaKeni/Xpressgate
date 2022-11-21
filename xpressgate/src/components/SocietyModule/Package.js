import React from "react";
import "../SocietyModule/Package.css";
import { Button } from "react-bootstrap";

import Package_LogOut from "../SocietyModule/Package_LogOut";

const Package = () => {
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
            <Package_LogOut />
          </div>
        </div>
      </div>
      <div id="societynamesection">
        <div className="societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br />

        <div className="addguard_sideimg">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay4">
          <label>Package Name</label>
        </div>
        <div className="packagedetailscard">
        
          <div className="cardimage">
            <div className="packagelabel">
              <label className="packagename">Package Name</label>
            </div>
          </div>
          <br/>
          <div className="aboutpackage">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
              </p>
          </div>
          <br/><br/>
          <div className="buttonContainer">
              <button type="button" class="validbtn"><i class="fa fa-circle circle" ></i> Valid Upto 2022</button>
             
            </div> 

        </div>
      </div>
    </div>
  );
};

export default Package;
