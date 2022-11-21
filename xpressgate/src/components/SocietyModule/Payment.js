import React from "react";
import "../SocietyModule/Payment.css";
import LogOut from '../Utils/LogOut'


const Payment = () => {
   


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
        
        <div className="addguard_sideimg">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay4">
          <label>Payment</label>
        </div>
       <div className="ButtonsContainer">
            <div className="button1">
                <button type="button" className="societydues_btn">Society Dues</button>
            </div>
        </div>
        <div className="ButtonsContainer">
            <div className="button1">
                <button type="button" className="societydues_btn">Vendor Payment</button>
            </div>
        </div>
        <div className="ButtonsContainer">
            <div className="button1">
                <button type="button" className="societydues_btn">Utility Payment</button>
            </div>
        </div>
        <div className="ButtonsContainer">
            <div className="button1">
                <button type="button" className="societydues_btn">Payment History</button>
            </div>
        </div>
        <div className="ButtonsContainer">
            <div className="button1">
                <button type="button" className="societydues_btn">Package Details</button>
            </div>
        </div>

      </div>
    </div>
       
       
    
  );
};

export default Payment;
