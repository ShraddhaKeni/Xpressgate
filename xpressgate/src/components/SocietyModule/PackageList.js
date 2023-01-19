import { getDefaultNormalizer } from '@testing-library/react'
import axios from 'axios'
import { Button, Form } from "react-bootstrap";
import React, { useEffect, useRef, useState } from 'react'
import "../SocietyModule/PackageList.css"
import SocietyHeader from './Utils/Societyheader'
import { useLocation } from 'react-router-dom';

const PackageList = () => {

  const [plan,setPlan] = useState([])
  const [members,setMembers] = useState([])
  const location = useLocation()
  const plan_id = useRef([])
  const booked_by = useRef([])
  const purchase_date = useRef([])
  const payment_due = useRef([])
  const [edit,setEdit] = useState(false)
  const [booked,setBooked] = useState({})

  useEffect(()=>{
    if(location.state)
    {
      setEdit(location.state.edit)
      getBookedPlan()
    }
    else
    {
      getData()
    }
  },[])

  const getBookedPlan= async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/packagebook/get/${localStorage.getItem('community_id')}`)
      setBooked(data.data.booked[0])
      await getData()

      //setting html data
      const select_plan = document.getElementById("plan_id")
      const plan_options = Array.from(select_plan.options)
      const selected = plan_options.find(x=>x.text===data.data.booked[0].plan_name)
      selected.selected=true

      //Member

      document.getElementById('block_id').value=data.data.booked[0].member_id
      document.getElementById('payment_date').value=new Date(data.data.booked[0].purchased_date).toISOString().split('T')[0]
      ChangeDate(data.data.booked[0].purchased_date)
      

    } catch (error) {
      console.log(error)
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
      const response = await axios.get(`${window.env_var}api/management/getAll`)
      setMembers(response.data.data.managementteam)
    } catch (error) {
      console.log(error)
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
        console.log(sendData)
        const {data} = await axios.post(`${window.env_var}api/packagebook/update`,sendData)
        window.location.href='/package'
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
        window.location.href='/package'
      }
     
    } catch (error) {
      console.log(error)
    }
  }

  const ChangeDate=(d)=>{
   
    const date = new Date(d)
    payment_due.current.value=(`${date.getDate()-1}/${date.getUTCMonth()+1}/${date.getFullYear()+1}`)
  }


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
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="PackL_display">
          <label>Change Package</label>
        </div>
        <Form className="formclass">
          <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Package</label>
                <div class="col-lg-4">
                  <select type="text" class="form-control input-lg SBorder" ref={plan_id} id='plan_id' name="First name" >
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
                  <select type="text" class="form-control input-lg SBorder" ref={booked_by} id='block_id' name="First name" >
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
      </div>
    </div>
       
       
  )
}

export default PackageList