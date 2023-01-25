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
import { ToastMessage } from '../ToastMessage';
import { Loader } from "../Loader";
import ErrorScreen from '../../common/ErrorScreen';

const Addlocalservice = () => {
  const [toast, setToast] = useState({ show: false })

  const [addeddata, setAddedData] = useState([])
  const [service, setService] = useState([])
  const [vendorData, setvendorData] = useState({})
  const [type, setType] = useState('add')
  const location = useLocation()
  // const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [isError,setError] = useState(false)

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
        setLoading(false);
    }
    else {
      window.location.href = '/'
    }
  }, [])

  const getAddedByData = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/management/getAll`)
      setAddedData(data.data.managementteam)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const getServiceData = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/admin/localservices/getAll`)
      setService(data.data.localservices)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (await mobileValidation(document.getElementById('contact_no').value)) {
        if (type == 'edit') {
         
          const sendData = {
            id: location.state.id,
            vendorName: document.getElementById('vendor_name').value,
            addedBy: localStorage.getItem('resident_id'),
            service: document.getElementById('service').value,
            contact: document.getElementById('contact_no').value,
            address: document.getElementById('address').value,
          }
          console.log(sendData);
          const { data } = await axios.post(`${window.env_var}api/vendor/update`, sendData)
          setToast({ show: true, type: "success", message: "Vendor updated successfully" })
          setTimeout(() => {
            window.location.href = '/localservices'
          }, 1500);
        }
        else {
         

          const sendData = {
            vendorName: document.getElementById('vendor_name').value,
            addedBy: localStorage.getItem('resident_id'),
            service: document.getElementById('service').value,
            contact: document.getElementById('contact_no').value,
            address: document.getElementById('address').value,
          }
          const { data } = await axios.post(`${window.env_var}api/vendor/add`, sendData)
          setToast({ show: true, type: "success", message: "Vendor added successfully" })
          setTimeout(() => {
            window.location.href = '/localservices'
          }, 1500);
          // window.location.href = '/localservices'
        }
      }
      else {
        setToast({ show: true, type: "error", message: "Enter valid mobile number" });
      }
    } catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
    }
  }

  const getVendorDetails = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/vendor/find/${location.state.id}`);
      setvendorData(data.data.vendors[0]);
      setError(false)
      document.getElementById('service').value = data.data.vendors[0].service;
    } catch (error) {
      setError(true)
    }
  }

  if(isError)
    return <ErrorScreen/>



  return (
    <div className="alscontainer">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

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
          <a className='ALSsidelinks' href="/addlocalservice"><b>{type == 'edit' ? 'Update' : 'Add'} Local Services</b></a>
        </div>
        <div className='alssideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='alsbackgroundimg'>
      <Loader loading={loading}>
        <div className='alsdisplay'>
          <label>{type == 'edit' ? 'Update' : 'Add'} Local Service</label>
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
              <input type="text" class="form-control input-lg inputborder" id='vendor_name' name="vendor_name" placeholder="Vendor Name" defaultValue={vendorData.vendorName ? vendorData.vendorName : ''}></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Address</label>
            <div class="col-lg-4">
              <textarea type="textarea" class="form-control input-lg inputborder" id='address' name="address" placeholder="Address" defaultValue={vendorData.address ? vendorData.address : ''}></textarea>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Contact No.</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg inputborder" id='contact_no' name="contact_no" placeholder="Contact No." maxLength="10" defaultValue={vendorData.contact ? vendorData.contact : ''}></input>
            </div>
          </div>
          <button type="submit" onClick={(e) => { handleSubmit(e) }} className="btnAddV" on>{type == 'edit' ? 'Update' : 'Add'} Vendor</button>
        </Form>
        </Loader>
      </div>
    </div>
  )
}
export default Addlocalservice