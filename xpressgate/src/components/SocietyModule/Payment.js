import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../SocietyModule/Payment.css";
import LogOut from './Utils/LogOut'


const Payment = () => {
   
  const navigate = useNavigate()

  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
        <div className="addflatheadersection">
          <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="afsociety"><label>Society</label></div>
          <div id="afspace"></div>
          <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="afsetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aflogoutbutton"><LogOut/></div>
        </div>
    
    </div>
      <div id="societynamesection">
        <div className="P_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        
        <div className="Paymentsideimg">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Pdisplay">
          <label>Payment</label>
        </div>
        <div className="all_payment_buttons">
       <div className="ButtonsContainer">
            <div className="button1">
                <button type="button" onClick={()=>navigate('/societyduesrecord')} className="societydues_btn">Society Dues </button>
            </div>
        </div>
        <div className="ButtonsContainer">
            <div className="button1">
                <button type="button" onClick={()=>navigate('/vendorpaymentrecord')} className="societydues_btn">Vendor Payment</button>
            </div>
        </div>
        <div className="ButtonsContainer">
            <div className="button1">
                <button type="button" onClick={()=>navigate('/utilitypaymentrecord')} className="societydues_btn" >Utility Payment</button>
            </div>
        </div>
        <div className="ButtonsContainer">
            <div className="button1">
                <button type="button" onClick={()=>navigate('/paymenthistory')} className="societydues_btn">Payment History</button>
            </div>
        </div>
        <div className="ButtonsContainer">
            <div className="button1">
                <button type="button" onClick={()=>navigate('/package')} className="societydues_btn">Package Details</button>
            </div>
        </div>
        </div>
      </div>
    </div>
       
       
    
  );
};

export default Payment;
