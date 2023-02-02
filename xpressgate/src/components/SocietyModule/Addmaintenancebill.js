import React, { useEffect, useRef, useState } from "react";
import "./Addmaintenancebill.css";
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

const Addmaintenancebill = () => {
  const [loading, setLoading] = useState(false)
  const [blocks, setBlocks] = useState([])
  const [flats, setFlats] = useState([])
  useEffect(() => {
    getBlocks();
  }, [])

  const getBlocks = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/block/blockList`)
      setBlocks(data.data.block)
    } catch (error) {
      console.log(error)
    }
  }

  const getFlats = async (e) => {
    try {
      // document.getElementById('vehicle_id').selectedIndex = '0'
      // document.getElementById('flat_id').selectedIndex = '0'
      // document.getElementById('resident_name').value = null;
      const { data } = await axios.get(`${window.env_var}api/flats/getList/${e.target.value}`)
      setFlats(data.data.list)
      //console.log(e.target.value)
    } catch (error) {
      console.log(error)
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
          <a href="/maintenancebilllist" class="MSLList">Maintenance Bill List</a><br /><br />
          <a href="/addmaintenancebill" class="Addmaintenancelink"><b>Add Maintenance Bill</b></a>
        </div>
        <div className="AEN_sideimage">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addmaintenancebackgroundimg">

        <div className="AEN_display">
          <label>Add Maintenance Bill</label>
        </div>
        <Loader loading={loading}>
          <Form className='formclass'>
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label">Block</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" name="Type" type="text" onChange={(e) => { getFlats(e) }}>
                  <option value={null} selected disabled>Select Block</option>
                  {blocks.map((item) => {
                    return (
                      <option value={item._id}>{item.block}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label">Flat</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" name="Type" type="text">
                  <option value={null} selected disabled>Select Flat</option>
                  {flats.map((item) => {
                    return (
                      <option value={item._id}>{item.flat_number}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label">Owner</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" name="Type" type="text">
                  <option value={null} selected disabled>Select Owner</option>
                 
                </select>
              </div>
            </div>
            <div class="form-group form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label ">Amount</label>
              <div class="col-lg-4">
                <input type="number" id="reminderdays" name="Phone Number" className="form-control input-lg input-lg1 AEN_border" placeholder="Enter Maintenance Amount"></input>
              </div>
            </div>
            <div class="form-group form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label ">Area</label>
              <div class="col-lg-4">
                <input type="number" id="area" name="Area" className="form-control input-lg input-lg1 AEN_border" placeholder="Enter Area"></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Bill Date</label>
              <div class="col-lg-4">
                <input type="date" class="form-control input-lg SideB" id='bill_date' name="Bill Date" />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Due Date</label>
              <div class="col-lg-4">
                <input type="date" class="form-control input-lg SideB" id='due_date' name="Due Date" />
              </div>
            </div>
            <button type="submit" className="AddButton"> Add Maintenance Bill</button>
          </Form>
        </Loader>

      </div>
    </div>
  );
};

export default Addmaintenancebill;
