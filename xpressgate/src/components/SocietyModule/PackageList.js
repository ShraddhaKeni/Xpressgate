import { getDefaultNormalizer } from '@testing-library/react'
import axios from 'axios'
import { Button, Form } from "react-bootstrap";
import React, { useEffect, useRef, useState } from 'react'
import "../SocietyModule/PackageList.css"
import SocietyHeader from './Utils/Societyheader'
import { useLocation } from 'react-router-dom';
import { ToastMessage } from '../ToastMessage';
import { Loader } from "../Loader";
import Societyheader from './Utils/Societyheader';

import ErrorScreen from '../../common/ErrorScreen';
const PackageList = () => {
  const [toast, setToast] = useState({ show: false })
  const [plan,setPlan] = useState([])
  const [members,setMembers] = useState([])
  const location = useLocation()
  const plan_id = useRef([])
  const booked_by = useRef([])
  const purchase_date = useRef([])
  const payment_due = useRef([])
  const [edit,setEdit] = useState(false)
  const [booked,setBooked] = useState({})
  const [loading, setLoading] = useState(true)
  const [isError,setError] = useState(false)
  
  useEffect(()=>{
    if(location.state)
    {
      setEdit(location.state.edit)
      getBookedPlan();
    }
    else
    {
      getData()
    }
  },[])

  const getBookedPlan= async()=>{
    try {
      await getData();
      const {data} = await axios.get(`${window.env_var}api/packagebook/get/${localStorage.getItem('community_id')}`);
      setBooked(data.data.booked[0]);
      document.getElementById('plan_id').value = data.data.booked[0].plan_id;
      document.getElementById('block_id').value = data.data.booked[0].member_id;
      document.getElementById('payment_date').value=new Date(data.data.booked[0].purchased_date).toISOString().split('T')[0];
      ChangeDate(data.data.booked[0].purchased_date);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
      setError(true)
    }
  }

  const getData=async()=>{
    try {
      const config = {
        headers:{
          'x-access-token':localStorage.getItem('accesstoken')
        }
      }
      const {data} = await axios.get(`${window.env_var}api/plan/getall`,config)
      setPlan(data.data.plan)
      const response = await axios.get(`${window.env_var}api/management/getAll/${localStorage.getItem('community_id')}`)
      setMembers(response.data.data.managementteam);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
      setError(true)
    }
  }

  const handleSubmit =async(e)=>{
    try {
      e.preventDefault()
      if(edit)
      {
        const sendData={
          plan_id:plan_id.current.value,
          booked_by:booked_by.current.value,
          community_id:localStorage.getItem('community_id'),
          purchased_date:purchase_date.current.value,
          id:booked._id
        }
        const {data} = await axios.post(`${window.env_var}api/packagebook/update`,sendData)
        setToast({ show: true, type: "success", message: "Package changed" })
        setTimeout(() => {
          window.location.href='/package'
        }, 1500);
      }
      else
      {
        const sendData={
          plan_id:plan_id.current.value,
          booked_by:booked_by.current.value,
          community_id:localStorage.getItem('community_id'),
          purchased_date:purchase_date.current.value,
        }
        const {data} = await axios.post(`${window.env_var}api/packagebook/post`,sendData)
        setToast({ show: true, type: "success", message: "Package added" })
        setTimeout(() => {
          window.location.href='/package'
        }, 1500);
      }
    } catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
    }
  }

  const ChangeDate=(d)=>{
    const date = new Date(d)
    payment_due.current.value=(`${date.getDate()-1}/${date.getUTCMonth()+1}/${date.getFullYear()+1}`)
  }


  if(isError)
    return <ErrorScreen/>
  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
          <SocietyHeader/>
      </div>
      <div id="societynamesection">
        <div className="PackLSname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        
        <div className="PackLSimg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <div className="PackL_display">
          <label>Change Package</label>
        </div>
        <Loader loading={loading}>
          <Form className="formclass">
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Package</label>
              <div class="col-lg-4">
                <select type="text" class="form-control input-lg SBorder" id='plan_id' name="plan_id" ref={plan_id}>
                  <option  disabled value={null} selected>Select Plan</option>
                    {plan.map(item=>{
                      return <option value={item.id}>{item.name}</option>
                    })}
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Added By</label>
              <div class="col-lg-4">
                <select type="text" class="form-control input-lg SBorder" id='block_id' name="booked_by" ref={booked_by}>
                  <option  disabled value={null} selected>Select Member</option>
                    {members.map(item=>{
                      return <option value={item._id}>{item.resident.firstname+' '+item.resident.lastname}</option>
                    })}
                </select>
              </div>
            </div> 
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Payment Date</label>
              <div class="col-lg-4">
                <input type="date" class="form-control input-lg SBorder" onChange={()=>ChangeDate(purchase_date.current.value)} ref={purchase_date} id='payment_date' name="Payment Date" />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Due Date</label>
              <div class="col-lg-4">
                <input type="text" disabled class="form-control input-lg SBorder" ref={payment_due}  id='due_date' name="First name" placeholder='Due Date'/>
              </div>
            </div>
            <button type="submit" onClick={(e)=>{handleSubmit(e)}} className="CPACKBtn">
              Change
            </button>
          </Form>
        </Loader>
      </div>
    </div>
  )
}
export default PackageList;