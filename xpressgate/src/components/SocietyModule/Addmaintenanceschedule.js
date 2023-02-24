import React, { useEffect, useRef, useState } from "react";
import "./Addmaintenanceschedule.css";
import LogOut from './Utils/LogOut'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from "axios";
import { checkSociety } from '../auth/Auth'
import SocietyHeader from './Utils/Societyheader'
import { mobileValidation } from "../auth/validation";
import { useLocation } from "react-router-dom";
import { Loader } from "../Loader";
import ErrorScreen from "../../common/ErrorScreen";

const Addmaintenanceschedule = () => {
  const [loading, setLoading] = useState(false)
  const [fordropdown, setFordropdown] = useState([])

  useEffect(() => {
    getForDropdown();
  }, [])

  const getForDropdown = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/admin/otherstaff/getAll`)
      setFordropdown(data.data.OtherStaffType);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const sendData = {
        community_id: localStorage.getItem('community_id'),
        item: document.getElementById('itemtype').value,
        for: document.getElementById('forid').value,
        frequency: document.getElementById('interval').value,
        time: document.getElementById('maintenancedate').value,
        other_details: document.getElementById('otherdetails').value,
        numberofdays : document.getElementById('reminderdays').value,
      }
      console.log(sendData)
      const { data } = await axios.post(`${window.env_var}api/checklist/add`, sendData)
     
      // setToast({ show: true, type: "success", message: "Vendor added successfully" })
      setTimeout(() => {
        //window.location.href = '/localservices'
      }, 1500);
      // window.location.href = '/localservices'
    } catch (error) {
      // setToast({ show: true, type: "error", message: "Check Data." });
    }
  }

  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <SocietyHeader />
      </div>
      <div id="societynamesection">
        <div className="AEN_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <div class="maintenancelist">
          <a href="/maintenancelist" class="AMSLList">Maintenance Schedule List</a><br /><br />
          <a href="/addmaintenanceschedule" class="AAddmaintenancelink"><b>Add Maintenance Schedule</b></a>
        </div>
        <div className="AEN_sideimage">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addmaintenancebackgroundimg">

        <div className="AEN_display">
          <label>Add Maintenance Schedule</label>
        </div>
        <Loader loading={loading}>
          <Form className='FormClass'>
            <div class="form-group  form-group5 row">
              <label class="col-lg-3 col-form-label ADN_label">Item Type</label>
              <div class="col-lg-4">
                <input type="text" id="itemtype" name="Item type" className="form-control input-lg input-lg1 AEN_border" placeholder="Enter item type"></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label ADN_label">Last Maintenance Date</label>
              <div class="col-lg-4">
                <input type="date" class="form-control input-lg SideB" id='maintenancedate' name="First name" />
              </div>
            </div>
            <div class="form-group  form-group5 row">
              <label class="col-lg-3 col-form-label ADN_label">Interval</label>
              <div class="col-lg-4">
                <select class="form-control input-lg inputborder" defaultValue={'Select Interval'} id="interval" name="interval" placeholder="Interval" required >
                  <option value={null} disabled > Select Interval </option>
                  <option value="1"> Daily </option>
                  <option value="2"> Monthly </option>
                  <option value="3"> Quarterly </option>
                  <option value="4"> Half-yearly </option>
                  <option value="5">Yearly</option>
                </select>
              </div>
            </div>
            <div class="form-group  form-group5 row">
              <label class="col-lg-3 col-form-label ADN_label">For</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" id="forid" name="for" type="text">
                  <option value={null} selected disabled>Select For</option>
                  {fordropdown.map((item) => {
                    return (
                      <option value={item.id}>{item.designation}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div class="form-group form-group5 row">
              <label class="col-lg-3 col-form-label ADN_label ">Enter number of reminder days</label>
              <div class="col-lg-4">
                <input type="number" id="reminderdays" name="Phone Number" className="form-control input-lg input-lg1 AEN_border" placeholder="Enter number of reminder days"></input>
              </div>
            </div>
            <div class="form-group  form-group5 row">
              <label class="col-lg-3 col-form-label ADN_label">Other details</label>
              <div class="col-lg-4">
                <textarea type="textarea" class="form-control input-lg inputborder" id='otherdetails' name="otherdetails" placeholder="Other details" ></textarea>
              </div>
            </div>


            <button type="submit" onClick={(e) => handleSubmit(e)} className="AddMSButton"> Add Maintenance Schedule</button>
          </Form>

        </Loader>
      </div>
    </div>
  );
};

export default Addmaintenanceschedule;
