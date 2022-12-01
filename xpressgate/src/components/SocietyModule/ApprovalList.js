import React from "react";
import "../SocietyModule/ApprovalList.css";
import { Button } from 'react-bootstrap';

import LogOut from "../SocietyModule/Utils/LogOut";


const ApprovalList = () => {
   


  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
        <div className="addflatheadersection">
          <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="afsociety"><label>Society</label></div>
          <div id="afspace"></div>
          <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="afsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aflogoutbutton"><LogOut/></div>
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
          <label>Flat Approval</label>
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

export default ApprovalList;
