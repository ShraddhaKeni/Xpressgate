import React, { useEffect, useState, useRef } from 'react';
import './Addlocalservice.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Societyheader from './Utils/Societyheader';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { checkSociety } from '../auth/Auth'
import { mobileValidation } from '../auth/validation';

const Addlocalservice = () => {
  const [addeddata, setAddedData] = useState([])
  const [service, setService] = useState([])
  const [vendorData, setvendorData] = useState({})
  const [type, setType] = useState('add')
  const location = useLocation()
  // const navigate = useNavigate()
  
  useEffect(() => {
    if (checkSociety()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/society/checkLogin`, config)
        .then(({ data }) => {
          getServiceData();
          if (location.state) {
            getVendorDetails()
            setType(location.state.type)
          }
          else {
            getAddedByData()
          }
        })
        .catch(err => {
          localStorage.clear();
          window.location.href = '/societylogin'
        })
    }
    else {
      window.location.href = '/'
    }
  }, [])

  const getAddedByData = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/management/getAll`)
      setAddedData(data.data.managementteam)
    } catch (error) {
      console.log(error)
    }
  }

  const getServiceData = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/admin/localservices/getAll`)
      setService(data.data.localservices)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (await mobileValidation(document.getElementById('contact_no').value)) {
        if(type=='edit')
        {
          const sendData = {
            id:location.state.id,
            vendorName: document.getElementById('vendor_name').value,
            addedBy: localStorage.getItem('resident_id'),
            service: document.getElementById('service').value,
            contact: document.getElementById('contact_no').value,
          }
          console.log(sendData);
          const { data } = await axios.post(`${window.env_var}api/vendor/update`, sendData)
          window.location.href = '/localservices'
        }
        else{
          const sendData = {
            vendorName: document.getElementById('vendor_name').value,
            addedBy: localStorage.getItem('resident_id'),
            service: document.getElementById('service').value,
            contact: document.getElementById('contact_no').value,
          }
          const { data } = await axios.post(`${window.env_var}api/vendor/add`, sendData)
          window.location.href = '/localservices'
        }
      }
      else {
        alert('Enter valid mobile number');
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getVendorDetails = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/vendor/find/${location.state.id}`);
      setvendorData(data.data.vendors[0]);
      document.getElementById('service').value=data.data.vendors[0].service;
    } catch (error) {

    }
  }

  return (
    <div className="alscontainer">
      <div id="alssection">
        <Societyheader />
      </div>
      <div id="alssocietysection">
        <div className='alssocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='AddLSsidelinks'>
          <a className='LSsidelinks' href="/localservices">Local Service</a><br></br><br></br>
          <a className='ALSsidelinks' href="/addlocalservice"><b>Add Local Services</b></a>
        </div>
        <div className='alssideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='alsbackgroundimg'>
        <div className='alsdisplay'>
          <label>Add Local Service</label>
        </div>
        <Form className='formclass'>
        <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Service</label>
            <div class="col-lg-4">
              <select class="form-control input-lg inputborder" id="service" placeholder="Service">
                <option value={null} disabled selected>Service</option>
                {service.map(item => {
                  return <option value={item.id}>{item.serviceName}</option>
                })}
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Vendor Name</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg inputborder" id='vendor_name' name="vendor_name" placeholder="Vendor Name" defaultValue={vendorData.vendorName?vendorData.vendorName:''}></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Contact No.</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg inputborder" id='contact_no' name="contact_no" placeholder="Contact No." maxLength="10" defaultValue={vendorData.contact?vendorData.contact:''}></input>
            </div>
          </div>
          <button type="submit" onClick={(e) => { handleSubmit(e) }} className="btnAddV" on>Add Vendor</button>
        </Form>
      </div>
    </div>
  )
}
export default Addlocalservice