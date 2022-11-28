import React from "react";
import "../SocietyModule/UtilityPayment.css";
import LogOut from "../SocietyModule/Utils/LogOut";


const UtilityPayment = () => {
   


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
          <label>Utility Payment</label>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="Utility_Type" className="UtilityTypesdetails">Utility Type</label>
                <select  id="Utility_Type" value="" className="vendorinput">
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    </select> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="Blockkk " className="Utility_Block ">Block </label>
                <select  id="Blockkk" value="" className="vendorinput">
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    </select> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="UtilityFlatNo" className="Utility_FlatNo">Flat No</label>
                <select  id="UtilityFlatNo" value="" className="vendorinput">
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    </select> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="UtilityResidentname" className="Utility_Residentname">Resident Name</label>
                <input type="text"  id="UtilityResidentname" value="" className="vendorinput"></input> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="UtilityAmount" className="Utility_Amount">Amount</label>
                <input type="text"  id="UtilityAmount" value="" className="vendorinput"></input> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <span>
                <label for="UtilityPaydate" class="Utilitypaymentdate">Payment Date</label>
                <input type="number" id="UtilityPaydate" value=" " className="Utility_Paymentdateinput"></input>
                </span>
                <span>
                <label for="UtilityDuedate" class="Utility_Duedate">Due Date</label>
                <input type="number" id="UtilityDuedate" value=" " className="Utility_Duedateinput"></input>
                </span>
            </div>
        </div>
        <div className="ButtonsContainer3">
            <div className="button1">
                <button type="button" className="AddUtilityButnn">Add</button>
            </div>
        </div>
      </div>
    </div>
       
       
    
  );
};

export default UtilityPayment;
