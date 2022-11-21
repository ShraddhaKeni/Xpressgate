import React from "react";
import "../SocietyModule/Payment.css";
import Payment_LogOut from '../SocietyModule/Payment_LogOut'


const Payment = () => {
   


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
            <Payment_LogOut/>
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
