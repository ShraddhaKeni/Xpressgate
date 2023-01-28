import axios from "axios";
import React, { useEffect, useState,useRef } from "react";
import "../SocietyModule/UtilityPayment.css";
import LogOut from "../SocietyModule/Utils/LogOut";
import { getBlocks } from "./common/common";
import Societyheader from './Utils/Societyheader'
import { ToastMessage } from '../ToastMessage';
import { Loader } from "../Loader";
import ErrorScreen from "../../common/ErrorScreen";

const UtilityPayment = () => {
  const [toast, setToast] = useState({ show: false })
  const [utility,setUtility] = useState([])
  const [block,setBlock] = useState([])
  const [flats,setFlats] = useState([])
  const [resident,setResident] =useState({})
  const [loading, setLoading] = useState(true)
  const [isError,setError] = useState(false)
  const amount = useRef([])
  const flat_id = useRef([])
  const payment_due = useRef([])
  const payment_date = useRef([])
  const utility_id = useRef([])

  useEffect(()=>{
    getUtilities()
  },[])

  const getUtilities=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/admin/utilities/getAll`);
      setUtility(data.data.utilitieslist);
      setBlock(await getBlocks());
      setLoading(false);
      setError(false)
    } catch (error) {
      setError(true)
      setLoading(false);
    }
  }

  const getFlats=async(e)=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/flats/getList/${e.target.value}`)
      setFlats(data.data.list)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const getResident=async(e)=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/flats/single/${e.target.value}`)
      setResident(data.data.list[0])
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const handleSubmit=async()=>{
    try {
     
      if(utility_id!==""&&flat_id!==""&&payment_date!==""&&payment_due!==""&amount!=="")
      {
        const sendData = {
          utilityID:utility_id.current.value,
          flat_id:flat_id.current.value,
          paymentDue:payment_date.current.value,
          dueDate:payment_due.current.value,
          paymentAmount:amount.current.value,
          residentID:resident.resident_id
        }
        const {data} = await axios.post(`${window.env_var}api/admin/utilitypayment/addBill`,sendData)
        setToast({ show: true, type: "success", message: "Added successfully" })
        setTimeout(() => {
          window.location.href='/payment'
        }, 1500);
        // window.location.href='/payment'
      }
      else
      {
        setToast({ show: true, type: "error", message: "Fields empty" });
        // alert('Fields Empty.')
      }
      
    } catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
     
    }
  }
  if(isError)
    return <ErrorScreen/>
    
  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <Societyheader/>
      </div>
      <div id="societynamesection">
        <div className="UP_Sname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        <div className="UP_Simg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <div className="UPdisplay">
          <label>Utility Payment</label>
        </div>
        <Loader loading={loading}>
          <div className="Payment_form">
            <div className="inboxes">
              <label for="Utility_Type" className="UtilityTypesdetails">Utility Type</label>
              <select  id="Utility_Type" ref={utility_id} className="VenDorInp">
                <option value="" selected disabled>Select Utitlity</option>
                {utility.map(item=>{
                  return <option value={item._id}>{item.utilityType}</option>
                })}
              </select> 
            </div>
          </div>
          <div className="Payment_form">
            <div className="inboxes">
              <label for="Blockkk " className="Utility_Block ">Block </label>
              <select  id="Blockkk"  onChange={(e)=>getFlats(e)}  className="VenDorInp">
                <option value="" selected disabled>Select Block</option>
                {block.map(item=>{
                  return <option value={item.id}>{item.name}</option>
                })}
              </select> 
            </div>
          </div>
          <div className="Payment_form">
            <div className="inboxes">
              <label for="UtilityFlatNo"  className="Utility_FlatNo">Flat No</label>
              <select  id="UtilityFlatNo" ref={flat_id} onChange={(e)=>{getResident(e)}} className="VenDorInp">
                <option value="" selected disabled>Select Flat</option>
                {flats.map(item=>{
                  return <option value={item._id}>{item.flat_number}</option>
                })}
              </select> 
            </div>
          </div>
          <div className="Payment_form">
            <div className="inboxes">
              <label for="UtilityResidentname"  className="Utility_Residentname">Resident Name</label>
              {resident.firstname?<input type="text"  id="UtilityResidentname" className="VenDorInp" disabled name="First name" placeholder="Resident name" value={resident.firstname+' '+resident.lastname}/>:
              <input type="text"  id="UtilityResidentname" className="VenDorInp" disabled name="First name" placeholder="Resident name" />}
            </div>
          </div>
          <div className="Payment_form">
            <div className="inboxes">
              <label for="UtilityAmount"  className="Utility_Amount">Amount</label>
              <input type="text"  id="UtilityAmount" ref={amount} className="VenDorInp" placeholder="Amount"></input> 
            </div>
          </div>
          <div className="Payment_form">
            <div className="inboxes">
              <span>
                <label for="UtilityPaydate" class="Utilitypaymentdate">Payment Date</label>
                <input type="date" id="UtilityPaydate" ref={payment_date} className="Utility_Paymentdateinput"></input>
              </span>
              <span>
                <label for="UtilityDuedate" class="Utility_Duedate">Due Date</label>
                <input type="date" id="UtilityDuedate" ref={payment_due} className="Utility_Duedateinput"></input>
              </span>
            </div>
          </div>
          <button type="button" onClick={()=>{handleSubmit()}} className="AUButnn">Add</button>
        </Loader>
      </div>
    </div>
  );
};
export default UtilityPayment;