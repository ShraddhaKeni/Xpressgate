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
          <a href="/maintenancelist" class="MSLList">Maintenance Schedule List</a><br /><br />
          <a href="/addmaintenanceschedule" class="Addmaintenancelink"><b>Add Maintenance Schedule</b></a>
        </div>
        <div className="AEN_sideimage">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addmaintenancebackgroundimg">
       
          <div className="AEN_display">
            <label>Add Maintenance Schedule</label>
          </div>
          <Loader loading={loading}>
          <Form className='formclass'>
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label">Item Type</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" name="Type">
                  <option value={null} selected disabled>Select Type</option>
                  
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Last Maintenance Date</label>
              <div class="col-lg-4">
                <input type="date" class="form-control input-lg SideB" id='lmd' name="First name" />
              </div>
            </div>
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label">Interval</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" name="Type">
                  <option value={null} selected disabled>Select Interval</option>
                  
                </select>
              </div>
            </div>
            <div class="form-group form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label ">Enter number of reminder days</label>
              <div class="col-lg-4">
                <input type="number" id="reminderdays" name="Phone Number" className="form-control input-lg input-lg1 AEN_border" placeholder="Enter number of reminder days"></input>
              </div>
            </div>


            <button type="submit" className="AddButton"> Add Maintenance Schedule</button>
          </Form>

       </Loader>
      </div>
    </div>
  );
};

export default Addmaintenanceschedule;
