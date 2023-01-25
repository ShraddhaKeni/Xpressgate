import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../SocietyModule/Vendor_Payment.css";
import LogOut from "./Utils/LogOut";
import axios from 'axios'
import { getBlocks,getVendors } from "./common/common";
import { Loader } from "../Loader";
import { ToastMessage } from '../ToastMessage';
import ErrorScreen from "../../common/ErrorScreen";
const Vendor_Payment = () => {
  const [toast, setToast] = useState({ show: false })
  const [blocks,setBlock] = useState([])
  const [flats,setFlats] = useState([])
  const [resident,setResident] =useState({})
  const [vendors,setVendors] = useState([])
  const amount = useRef([])
  const flat_id = useRef([])
  const payment_due = useRef([])
  const payment_date = useRef([])
  const vendor_id = useRef([])
  const [loading, setLoading] = useState(true)
  const [isError,setError] = useState(false)
  useEffect(()=>{
    combineFunctions()
  },[])

  async function combineFunctions ()
  {
    try {
      const blocks = await getBlocks()
      setBlock(blocks)
      const vendor = await getVendors()
      setVendors(vendor)
      setLoading(false);
      setError(false)
    } catch (error) {
      setError(true)
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

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
   
      const sendData= {
        vendor_id:vendor_id.current.value,
        flat_id:flat_id.current.value,
        paymentDue:payment_due.current.value,
        dueDate:payment_due.current.value,
        paymentAmount:amount.current.value,
        resident_id:resident.resident_id,
      }
      const {data} = await axios.post(`${window.env_var}api/vendorpayment/addBill`,sendData)
      setToast({ show: true, type: "success", message: "Added successfully" })
      setTimeout(() => {
        window.location.href='/payment'
      }, 1500);
    } catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
    }
  }

  if(isError)
    return <ErrorScreen/>
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
        <div className="VPay_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        <div className="VPay_sideimg">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <div className="VPaydisplay">
          <label>Vendor</label>
        </div>
        <Loader loading={loading}>
          <Form className="formclass">
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Vendor</label>
              <div class="col-lg-4">
                <select type="text" class="form-control input-lg SideB" ref={vendor_id} id='vendor_id' name="First name" >
                  <option  disabled value={null} selected>Select Vendor</option>
                  {vendors.map(item=>{
                    return <option value={item._id}>{item.vendorName}</option>
                  })}
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Block</label>
              <div class="col-lg-4">
                <select type="text" class="form-control input-lg SideB" onChange={(e)=>getFlats(e)} id='block_id' name="First name" >
                  <option  disabled value={null} selected>Select Block</option>
                  {blocks.map(item=>{
                    return <option value={item.id}>{item.name}</option>
                  })}
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Flat</label>
              <div class="col-lg-4">
                <select type="text" class="form-control input-lg SideB" id='flat_id' ref={flat_id} onChange={(e)=>{getResident(e)}} name="First name" >
                  <option  disabled value={null} selected>Select Flat</option>
                  {flats.map(item=>{
                    return <option value={item._id}>{item.flat_number}</option>
                  })}
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Resident</label>
              <div class="col-lg-4">
                {resident.firstname?<input type="text" class="form-control input-lg SideB" id='resident_id' disabled name="First name" placeholder="Resident name" value={resident.firstname+' '+resident.lastname} > 
                  </input>:<input type="text" class="form-control input-lg SideB" id='resident_id' disabled name="First name" placeholder="Resident name" ></input>}
                    
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Payment Date</label>
              <div class="col-lg-4">
                <input type="date" class="form-control input-lg SideB" ref={payment_date} id='payment_date' name="First name" />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Due Date</label>
              <div class="col-lg-4">
                <input type="date" class="form-control input-lg SideB" ref={payment_due}  id='due_date' name="First name" />
              </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Amount</label>
                <div class="col-lg-4">
                  <input type="number" class="form-control input-lg SideB" id='resident_id' ref={amount} name="First name" placeholder="Amount"> 
                  </input>
                </div>
              </div>
           
            <button type="submit" onClick={(e)=>handleSubmit(e)} className="VPay_Add">
              Add 
            </button>
          </Form>
        </Loader>
      </div>
    </div>
  );
};

export default Vendor_Payment;