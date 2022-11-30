import React, { useEffect, useState } from 'react';
import './Addlocalservice.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Societyheader from './Utils/Societyheader';
import { Link } from 'react-router-dom';

const Addlocalservice = () => {
  const [addeddata, setAddedData] = useState([])
  const [service, setService] = useState([])

  // const navigate = useNavigate()
  useEffect(()=>{
    getAddedByData()
    getServiceData()
  },[])

  const getAddedByData=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/management/getAll`)
      setAddedData(data.data.managementteam)
      // setServices(data.data.localservices)
    } catch (error) {
      console.log(error)
    }
  }

  const getServiceData=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/admin/localservices/getAll`)
      setService(data.data.localservices)
      // setServices(data.data.localservices)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const sendData = {
        vendorName:document.getElementById('vendor_name').value,
        addedBy:document.getElementById('added_by').value,
        service:document.getElementById('service').value,
        contact:document.getElementById('contact_no').value,
      }
      const {data} = await axios.post(`${window.env_var}api/vendor/add`,sendData)
      window.location.href='/localservices'
    } catch (error) {
      console.log(error)
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
        <div className='alssidelinks'>
          <Link>Local Services</Link><br></br><br></br>
          <Link to='/addlocalservice'>Add Local Services</Link>
        </div>
        <div className='alssideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='alsbackgroundimg'>
        <div className='alsdisplay'>
          <label>Add Local Service</label>
        </div>
        <Form className='formclass'>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Vendor Name</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg" id='vendor_name' name="flatNo" placeholder="Vendor Name"></input>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label labelsize">Added By</label>
            <div class="col-sm-4 col-md-4 col-lg-4">
              <select class="form-control input-lg" id='added_by'>
                <option value={null} disabled selected>Added By</option>
                {addeddata.map(item=>{
                  return <option value={item.resident._id}>{item.resident.firstname+' '+item.resident.lastname}</option>
                })}
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Service</label>
            <div class="col-lg-4">
              <select class="form-control input-lg" id="service" placeholder="Service">
                <option value={null} disabled selected>Service</option>
               {service.map(item =>{
                  return <option value={item.id}>{item.serviceName}</option>
               })}
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Contact No.</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg" id='contact_no' name="flatNo" placeholder="Contact No."></input>
            </div>
          </div>

          <Button type="submit" onClick={(e)=>{handleSubmit(e)}} className="btnAddV" on>Add Vendor</Button>
        </Form>

      </div>
    </div>
  )
}

export default Addlocalservice

