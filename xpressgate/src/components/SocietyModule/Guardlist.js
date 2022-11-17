import React from "react";
import "../SocietyModule/Guardlist.css";
import LogOut from './Utils/LogOut'



const Guardlist = () => {
   


  return (
    <div className="addguestcontainer3">
      <div id="headersection3">
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
          <h4>Guard list</h4>
          <a href="abcd" class="Notice">Add Guard</a>
          </div>
        <div className="sideimage3">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay4">
          <label>Guard List</label>
        </div>
        <div >
        <button type="button" className="AddG" onClick={() => {
                window.location.href = "abc";
              }}>&#10011; Add New Guard</button>
        <input
          type=" search"
          className="search3"
          name="Search"
          placeholder="&#128269; Search"
        ></input>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss1">
        <div className="col">
            <div className="dashboardcard">
              <img
                src="/images/Lservices.svg"
                className="dbcard-img-top"
                alt="Local Services"
                onClick={() => {
                  window.location.href = "/vendorlist";
                }}
              ></img>
            </div>
          </div>
          <div className="col">
            <div className="dashboardcard">
              <img
                src="/images/Lservices.svg"
                className="dbcard-img-top"
                alt="Local Services"
                onClick={() => {
                  window.location.href = "/vendorlist";
                }}
              ></img>
            </div>
          </div>
          <div className="col">
            <div className="dashboardcard">
              <img
                src="/images/Lservices.svg"
                className="dbcard-img-top"
                alt="Local Services"
                onClick={() => {
                  window.location.href = "/vendorlist";
                }}
              ></img>
            </div>
          </div>
       </div>
      </div>
    </div>
       
       
    
  );
};

export default Guardlist;
