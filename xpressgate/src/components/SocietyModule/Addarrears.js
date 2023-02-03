import React, { useEffect, useRef, useState } from "react";
import "./Addarrears.css";
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

const Addarrears = () => {
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
          <a href="/arrearslist" class="AMSLList">Arrears List</a><br /><br />
          <a href="/addarrears" class="AAddmaintenancelink"><b>Add Arrears</b></a>
        </div>
        <div className="AEN_sideimage">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addmaintenancebackgroundimg">
       
          <div className="AEN_display">
            <label>Add Arrears</label>
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
              <label class="col-lg-2 col-form-label ADN_label">Resident Name</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" name="Type" type="text">
                  <option value={null} selected disabled>Select Resident</option>
                 
                </select>
              </div>
            </div>
         
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label">Invoice Number</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" name="Type" type="text">
                  <option value={null} selected disabled>Select Invoice Number</option>
                 
                </select>
              </div>
            </div>
            <div class="form-group form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label ">Arrears Amount</label>
              <div class="col-lg-4">
                <input type="number" id="reminderdays" name="Phone Number" className="form-control input-lg input-lg1 AEN_border" placeholder="Enter Arrears"></input>
              </div>
            </div>


            <button type="submit" className="AddaddarrearsButton"> Add Arrears</button>
          </Form>
      </Loader>
       
      </div>
    </div>
  );
};

export default Addarrears;
