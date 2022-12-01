import React from "react";
import "../SocietyModule/Community.css";
import LogOut from './Utils/LogOut'

const Community = () => {
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
        <br/>
        <div class="noticelist">
          <h4><b>Notice List</b></h4>
          <a href="abcd" class="Notice">Add Notice</a>
          </div>
        <div className="sideimage1">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>

      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay2">
          <label>Community Management</label>
        </div>
        
        <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss">
          <div className="col">
            <div className="dashboardcard">
              <a href="/management">
                <img
                  src="/images/Mteam.svg"
                  className="dbcard-img-top"
                  alt="Management Team"
                ></img>
              </a>
            </div>
          </div>
          <div className="col">
            <div className="dashboardcard">
              <img
                src="/images/Lservices.svg"
                className="dbcard-img-top"
                alt="Local Services"
                onClick={() => {
                  window.location.href = "/localservices";
                }}
              ></img>
            </div>
          </div>
          <div className="col">
            <div className="dashboardcard">
              <img
                src="/images/emergency.svg"
                className="dbcard-img-top"
                onClick={() => {
                  window.location.href = "/emergencyList";
                }}
                alt="Emergency"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
