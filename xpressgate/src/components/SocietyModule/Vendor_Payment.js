import React from "react";
import "../SocietyModule/Vendor_Payment.css";
import Vendor_Payment_LogOut from "./Vendor_Payment_LogOut";


const Vendor_Payment = () => {
   


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
            <Vendor_Payment_LogOut/>
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
          <label>Vendor</label>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="vendor" className="vendordetials">Vendor</label>
                <select  id="vendor" value="" className="vendorinput">
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    </select> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="Block " className="Blockdetials">Block </label>
                <select  id="Block " value="" className="vendorinput">
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    </select> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="Flat_No" className="flatnodetials">Flat No</label>
                <select  id="Flat_No" value="" className="vendorinput">
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    </select> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="Residentname" className="Residentnames">Resident Name</label>
                <input type="text"  id="Residentname" value="" className="vendorinput"></input> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="Amount" className="Amountdetails">Amount</label>
                <input type="number"  id="Amount" value="" className="vendorinput"></input> 
            </div>
        </div>
        <div className="ButtonsContainer1">
            <div className="button1">
                <button type="button" className="AddButn">Add</button>
            </div>
        </div>
      </div>
    </div>
       
       
    
  );
};

export default Vendor_Payment;
