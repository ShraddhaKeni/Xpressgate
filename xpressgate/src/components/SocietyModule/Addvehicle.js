import React, { useEffect, useState } from 'react';
import './Addvehicle.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useLocation } from "react-router-dom";
import SocietyHeader from './Utils/Societyheader';
import { Loader } from "../Loader";
import { ToastMessage } from '../ToastMessage';
import ErrorScreen from '../../common/ErrorScreen';

const Addvehicle = () => {
  const [toast, setToast] = useState({ show: false })
  const [blocks, setBlocks] = useState([])
  const [flats, setFlats] = useState([])
  const [sections, setSections] = useState([])
  const [resident, setResident] = useState({})
  const [vehicles, setVehicles] = useState([])
  const [pdetails, setAssignedParkingDetails] = useState({});
  const [name, setName] = useState()
  const [section, setSection] = useState()
  const [type, setType] = useState()
  const location = useLocation()
  const [resid, setResid] = useState()
  const [loading, setLoading] = useState(true)
  const [isError,setError] = useState(false)
  //const [vehiclenumber, setvehiclenumber] = useState()

  useEffect(() => {
    getBlocks();
    if (location.state) {
      setType(location.state.type);
      getAssignedParkingDetails();
    }
    else{
      // setvehiclenumber(location.state.vehiclenumber)
    }
  }, [])

  const getBlocks = async () => {
    try {
      const { data } = await axios.post(`${window.env_var}api/block/get`,{'community_id':localStorage.getItem('community_id')})
      setBlocks(data.data.block)
      setLoading(false);
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const getFlats = async (e) => {
    try {
      document.getElementById('vehicle_id').selectedIndex = '0'
      document.getElementById('flat_id').selectedIndex = '0'
      document.getElementById('resident_name').value = null;
      const { data } = await axios.get(`${window.env_var}api/flats/getList/${e.target.value}`)
      setFlats(data.data.list)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const getFlatsUpdate = async (e) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/flats/getList/${e}`);
      setFlats(data.data.list);
      document.getElementById('flat_id').value=pdetails.flat_id;
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const getSectionsupdate = async (e) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/parkingsection/getAll/${e}`)
      setSections(data.data)
      document.getElementById('section').value=pdetails.section_id;
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const getSections = async (e) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/parkingsection/getAll/${e.target.value}`)
      setSections(data.data)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }
  const getResident = async (e) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/flats/single/${e.target.value}`)
      
      setResident(data.data.list[0])
      document.getElementById('resident_name').value = data.data.list[0].firstname + ' ' + data.data.list[0].lastname
      const vehicle = await axios.get(`${window.env_var}api/resident/vehicle/getResidentVehicle/${data.data.list[0].resident_id}`)
      setResid(data.data.list[0].resident_id)
      setVehicles(vehicle.data.data.vehical)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const getResidentUpdate = async (e) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/flats/single/${e}`)
      setResident(data.data.list[0])
      document.getElementById('resident_name').value = data.data.list[0].firstname + ' ' + data.data.list[0].lastname;
      const vehicle = await axios.get(`${window.env_var}api/resident/vehicle/getResidentVehicle/${data.data.list[0].resident_id}`)
      setVehicles(vehicle.data.data.vehical);
      document.getElementById('vehicle_id').value=pdetails.vehicle_id;
      setError(false)
    } catch (error) {
      setError(true)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(type=='edit')
      {
        const sendData = {
          id:location.state.id,
          section_id: document.getElementById('section').value,
          resident_id: resid,
          flat_id: document.getElementById('flat_id').value,
          vehicle_id: document.getElementById('vehicle_id').value
        }
        const data = await axios.post(`${window.env_var}api/assigns/update`, sendData)
        setToast({ show: true, type: "success", message: "Updated parking successfully" })
        setTimeout(() => {
          window.location.href = '/vehiclemanagement'
        }, 1500);
      }
      else{
        const sendData = {
          section_id: document.getElementById('section').value,
          resident_id: resid,
          flat_id: document.getElementById('flat_id').value,
          vehicle_id: document.getElementById('vehicle_id').value
        }
        const data = await axios.post(`${window.env_var}api/assigns/post`, sendData)
        setToast({ show: true, type: "success", message: "Alloted parking successfully" })
        setTimeout(() => {
          window.location.href = '/vehiclemanagement'
        }, 1500);
      }
    } catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
    }
  }

  const getAssignedParkingDetails=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/assigns/getOne/${location.state.id}`)
      setAssignedParkingDetails(data.data.ParkingDet[0]);
      await getFlatsUpdate(data.data.ParkingDet[0].block_id);
      await getResidentUpdate(data.data.ParkingDet[0].flat_id);
      await getSectionsupdate(data.data.ParkingDet[0].block_id);
      document.getElementById('block_id').value=data.data.ParkingDet[0].block_id;
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  if(isError)
    return <ErrorScreen/>
  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
      <SocietyHeader/>
    </div>
    <div id="societynamesection">
      <div className="AP_societyname">
        <img src="/images/societyicon.svg" alt="Society image" />
        <label>Society Name</label>
      </div>
      
      <div className='AddParksidelinks'>
      <a href='/vehiclemanagement' className='ALLOT_VL'>Vehicle List</a><br/><br/>
        <a href='/viewparking' className='ALLOT_VPS'>View Parking Section</a><br/><br/>
        <a href='/addparking' className='ALLOT_APS'>Add Parking Section</a><br/><br/>
        <a href='/addvehicle' className='ALLOT_ASPS'><b>{type=='edit'?'Update':'Assign'} Parking Section</b></a>
      </div>
      <div className="AP_sideimg">
        <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
      </div>
    </div>
    <div className="addguestbackgroundimg">
    <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
    <Loader loading={loading}>
      <div className='APdisplay'>
        <label>{type=='edit'?'Update':'Allot'} vehicle</label>
      </div>
        <Form className='formclass'>
          <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label ADN_label">Block</label>
            <div class="col-sm-4 col-md-4 col-lg-4">
              <select type="text" className="form-control input-lg ALLOT_INP_BORDER" name="block_id"  id='block_id' onChange={(e) => { getFlats(e); getSections(e) }}>
                <option disabled selected value={null}>Select Block</option>
                {blocks.map((item) => {
                  return (
                    <option value={item.id}>{item.name}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Flat</label>
            <div class="col-lg-4">
              <select  type="text" className="form-control input-lg ALLOT_INP_BORDER" id='flat_id' name="flat_id" onChange={(e) => getResident(e)}>
                <option disabled selected value={null}>Select Flat</option>
                {flats.map((item) => {
                  return (
                    <option value={item._id}>{item.flat_number}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Vehicle</label>
            <div class="col-lg-4">
              <select type="text" className="form-control input-lg ALLOT_INP_BORDER" id='vehicle_id' name="community">
                <option disabled selected value={null}>Select Vehicle</option>
                {vehicles.map((item) => {
                  return (
                    <option value={item._id}>{item.vehicalNumber}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Resident Name</label>
            <div class="col-lg-4">
              <input type="text" className="form-control input-lg ALLOT_INP_BORDER" name="flatNo" id='resident_name' placeholder="Resident Name" disabled></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Parking section</label>
            <div class="col-lg-4">
              <select className="form-control input-lg ALLOT_INP_BORDER" id="section" placeholder="Parking section">
                <option disabled selected value={null}>Select Section</option>
                {sections.map((item) => {
                  return (
                    <option value={item._id}>{item.section}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <button type="submit" onClick={(e) => handleSubmit(e)} className="BTNADDVeh">{type=='edit'?'Update':'Allot'} Parking</button>
        </Form>
       </Loader>
      </div>
    </div>
  )
}

export default Addvehicle

