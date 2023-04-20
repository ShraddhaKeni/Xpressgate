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
import { ToastMessage } from "../ToastMessage";

const Addmaintenanceschedule = () => {
  const [loading, setLoading] = useState(false)
  const [fordropdown, setFordropdown] = useState([])
  const location = useLocation()
  const [type, setType] = useState('add')
  const [editdata, setEditdata] = useState({});
  const [isError, setError] = useState(false)
  const [dropDownRef, setDropDown] = useState()
  const [dropDownForRef, setDropDownForRef] = useState()
  const [toast, setToast] = useState({ show: false })

  useEffect(() => {
    if (checkSociety()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/society/checkLogin`, config)
        .then(({ data }) => {
          if (location.state) {
            getEditData();
            //console.log(location.state.type)
            setType(location.state.type);
          } else {
            getForDropdown();
          }

        })
        .catch(err => {
          localStorage.clear();
          window.location.href = '/societylogin'
        })
      setLoading(false);
    }
    else {
      window.location.href = '/'
    }

  }, [])

  const getEditData = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/checklist/getOne/${location.state.id}`)
      setEditdata(data.data)
      document.getElementById('maintenancedate').value = new Date(data.data.time).toISOString().split('T')[0];
      setDropDown(data.data.frequency)
      getForDropdown()
      document.getElementById('forid').value = data.data.for.value;
      setError(false)
    } catch (error) {
      setError(true)
    }
  }


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
      if (type == 'add') {
        const sendData = {
          community_id: localStorage.getItem('community_id'),
          item: document.getElementById('itemtype').value,
          for: document.getElementById('forid').value,
          frequency: document.getElementById('interval').value,
          time: document.getElementById('maintenancedate').value,
          other_details: document.getElementById('otherdetails').value,
          no_of_days: document.getElementById('reminderdays').value,
          'type': 3
        }

        const { data } = await axios.post(`${window.env_var}api/checklist/add`, sendData)
console.log(data)
         setToast({ show: true, type: "success", message: "Added successfully" })
        setTimeout(() => {
          window.location.href = '/maintenancelist'
        }, 1500);
        
      } else {
        const sendData = {
          id: location.state.id,
          community_id: localStorage.getItem('community_id'),
          item: document.getElementById('itemtype').value,
          for: document.getElementById('forid').value,
          frequency: document.getElementById('interval').value,
          time: document.getElementById('maintenancedate').value,
          other_details: document.getElementById('otherdetails').value,
          no_of_days: document.getElementById('reminderdays').value,
        }
        const { data } = await axios.post(`${window.env_var}api/checklist/update`, sendData);
        setToast({ show: true, type: "success", message: "Updated successfully" })
        setTimeout(() => {
          window.location.href = '/maintenancelist'
        }, 1500);
      }
    } catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
    }
  }

  const dateTimeFormat = (date) => {
    var d = new Date(date)
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()

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
          <a href="/addmaintenanceschedule" class="AAddmaintenancelink"><b>{type == 'edit' ? 'Update' : 'Add'} Maintenance Schedule</b></a>
        </div>
        <div className="AEN_sideimage">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addmaintenancebackgroundimg">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <div className="AEN_displaym">
          <label>{type == 'edit' ? 'Update' : 'Add'} Maintenance Schedule</label>
        </div>
        <Loader loading={loading}>
          <Form className='FormClass'>
            <div class="form-group  form-group5 row">
              <label class="col-lg-3 col-form-label ADN_label">Item Type</label>
              <div class="col-lg-4">
                <input type="text" id="itemtype" name="Item type" className="form-control input-lg input-lg1 AEN_border" placeholder="Enter item type" defaultValue={editdata.item ? editdata.item : ''}></input>
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
                <select class="form-control input-lg inputborder" defaultValue={'Select Interval'} value={dropDownRef} id="interval" name="interval" placeholder="Interval" required onChange={(e) => { setDropDown(e.target.value) }}>
                  <option value={null} disabled > Select Interval </option>
                  <option value="1"> Daily </option>
                  <option value="2"> Monthly </option>
                  <option value="3"> Quarterly </option>
                  <option value="4"> Half-yearly </option>
                  <option value="5"> Yearly </option>
                </select>
              </div>
            </div>
            <div class="form-group  form-group5 row">
              <label class="col-lg-3 col-form-label ADN_label">For</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" id="forid" defaultValue={'Select For'} name="for" type="text" value={dropDownForRef}>
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
                <input type="number" id="reminderdays" name="Phone Number" className="form-control input-lg input-lg1 AEN_border" placeholder="Enter number of reminder days" defaultValue={editdata.no_of_days ? editdata.no_of_days : ''}></input>
              </div>
            </div>
            <div class="form-group  form-group5 row">
              <label class="col-lg-3 col-form-label ADN_label">Other details</label>
              <div class="col-lg-4">
                <textarea type="textarea" class="form-control input-lg inputborder" id='otherdetails' name="otherdetails" placeholder="Other details" defaultValue={editdata.other_details ? editdata.other_details : ''} ></textarea>
              </div>
            </div>


            <button type="submit" onClick={(e) => handleSubmit(e)} className="AddMSButton"> {type == 'edit' ? 'Update' : 'Add'} Maintenance Schedule</button>
          </Form>

        </Loader>
      </div>
    </div>
  );
};

export default Addmaintenanceschedule;
