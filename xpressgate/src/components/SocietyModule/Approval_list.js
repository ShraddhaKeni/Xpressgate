import React from "react";
import "../SocietyModule/Approval_list.css";
import { Button } from 'react-bootstrap';

import Approval_list_LogOut from "./Approval_list_LogOut";


const Approval_list = () => {
   


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
            <Approval_list_LogOut/>
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
          <label>Amenitiy Booking Approval</label>
        </div>
        <div className="guarddetailscard">
            <div className="cardimage">
                {/* <img src="/images/mteam.svg " alt="Guard Image"></img> */}
                <h3 className="Ownername">Ramesh Desai</h3>
                <div className="ownerlabel">
                  <label className="labelname">Owner</label>
                </div>
                <br/>
                <div className="Flatnocontainerbox">
               <label for="flatno" className="ownerflatno">Flat No</label>
               <br></br>
               <label for="Blockno" className="ownerblockno">Block B, 1011</label>
            </div>
            </div>
            <br/>
            <div className="otherdetails">
              <label className="otherdet">Other Details</label>
            </div>
            <div className="guardcontainerbox">
               <label for="Familymember" className="familymemno">No of Family Members </label>
               <br/><br/>
               <label for="vehicles" className="noofvehicle">No of Vehichle</label>
            </div>
            <div className="buttonContainer">
              <button type="button" class="editbtn">APPROVE</button>
              <button type="button" class="removebtn">DENY</button>
            </div>

        </div>

      </div>
    </div>
       
       
    
  );
};

export default Approval_list;
