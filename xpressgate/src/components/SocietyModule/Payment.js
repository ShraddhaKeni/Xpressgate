import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../SocietyModule/Payment.css";
import LogOut from './Utils/LogOut'
import { Loader } from "../Loader";
import Societyheader from './Utils/Societyheader'

const Payment = () => {
   
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(false);
  }, [])

  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <Societyheader />    
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
        <Loader loading={loading}>
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
            <div className="ButtonsContainer">
              <div className="button1">
                <button type="button" onClick={()=>navigate('/maintenancebilllist')} className="societydues_btn">Maintenance Amount</button>
              </div>
            </div>
          </div>
        </Loader>
      </div>
    </div>
  );
};
export default Payment;