import React from "react";
import "../SocietyModule/Society_dues.css";
import Society_dues_LogOut from "./Society_dues_LogOut";


const Society_dues = () => {
   


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
            <Society_dues_LogOut/>
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
          <label>Society Dues</label>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="Type" className="Typedetails">Type</label>
                <select  id="Type" value="" className="vendorinput">
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    </select> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="Blockk " className="Society_Block ">Block </label>
                <select  id="Blockk" value="" className="vendorinput">
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    </select> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="SocietyFlatNum" className="SocietyFlatNo">Flat No</label>
                <select  id="SocietyFlatNum" value="" className="vendorinput">
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    </select> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="SocietyResidentname" className="Society_Residentnames">Resident Name</label>
                <input type="text"  id="SocietyResidentname" value="" className="vendorinput"></input> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="SocietyAmount" className="Society_Amount">Amount</label>
                <input type="text"  id="SocietyAmount" value="" className="vendorinput"></input> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <span>
                <label for="Paydate" class="paymentdate">Payment Date</label>
                <input type="number" id="Paydate" value=" " className="Paymentdateinput"></input>
                </span>
                <span>
                <label for="Duedate" class="Duedate">Due Date</label>
                <input type="number" id="Duedate" value=" " className="Duedateinput"></input>
                </span>
            </div>
        </div>
        <div className="ButtonsContainer2">
            <div className="button1">
                <button type="button" className="AddButnn">Add</button>
            </div>
        </div>
      </div>
    </div>
       
       
    
  );
};

export default Society_dues;
