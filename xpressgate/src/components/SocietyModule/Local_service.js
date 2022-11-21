import React from "react";
import "../SocietyModule/Local_service.css";
import LogOut4 from "../SocietyModule/LogOut4";

const Local_service = () => {
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
            <LogOut4 />
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
        <div className="sideimage2">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay2">
          <label>Local Services</label>
        </div>
        <button type="button" className="AddLS" onClick={() => {
                window.location.href = "abc";
              }}>&#10011; Add Local Services</button>
        <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss">
          <div className="col">
            <div className="dashboardcard">
              <a href="abc">
                <img
                  src="/images/plumber.svg"
                  className="dbcard-img-top"
                  alt="Plumber"
                ></img>
              </a>
            </div>
          </div>
          <div className="col">
            <div className="dashboardcard">
              <img
                src="/images/electrician.svg"
                className="dbcard-img-top"
                onClick={() => {
                  window.location.href = "abc";
                }}
                alt="Electrician"
              ></img>
            </div>
          </div>
          <div className="col">
            <div className="dashboardcard">
              <img
                src="/images/laundary.svg"
                className="dbcard-img-top"
                onClick={() => {
                  window.location.href = "abc";
                }}
                alt="Laundary"
              ></img>
            </div>
          </div>
          <div className="col">
            <div className="dashboardcard">
              <img
                src="/images/carpenter.svg"
                className="dbcard-img-top"
                onClick={() => {
                  window.location.href = "abc";
                }}
                alt="Carpenter"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Local_service;
