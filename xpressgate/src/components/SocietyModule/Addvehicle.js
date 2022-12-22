import React, { useEffect, useState } from 'react';
import './Addvehicle.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut from './Utils/LogOut';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useLocation } from "react-router-dom";

const Addvehicle = () => {

  const [blocks, setBlocks] = useState([])
  const [flats, setFlats] = useState([])
  const [sections, setSections] = useState([])
  const [resident, setResident] = useState({})
  const [vehicles, setVehicles] = useState([])
  const [name, setName] = useState()
  const [section, setSection] = useState()
  const [type, setType] = useState()
  const location = useLocation()


  useEffect(() => {
    getBlocks()
    if (location.state) {
      setName(location.state.name)
      setSection(location.state.section)
    }
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
      document.getElementById('vehicle_id').selectedIndex = '0'
      document.getElementById('flat_id').selectedIndex = '0'
      document.getElementById('resident_name').value = null
      const { data } = await axios.get(`${window.env_var}api/flats/getList/${e.target.value}`)
      setFlats(data.data.list)
    } catch (error) {
      console.log(error)
    }
  }

  const getSections = async (e) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/parkingsection/getAll/${e.target.value}`)
      setSections(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getResident = async (e) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/flats/single/${e.target.value}`)
      console.log(data)
      setResident(data.data.list[0])
      document.getElementById('resident_name').value = data.data.list[0].firstname + ' ' + data.data.list[0].lastname

      const vehicle = await axios.get(`${window.env_var}api/resident/vehicle/getResidentVehicle/${data.data.list[0].resident_id}`)
      setVehicles(vehicle.data.data.vehical)
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const sendData = {
        section_id: document.getElementById('section').value,
        resident_id: resident.resident_id,
        flat_id: document.getElementById('flat_id').value,
        vehicle_id: document.getElementById('vehicle_id').value
      }
      const data = await axios.post(`${window.env_var}api/assigns/post`, sendData)
      console.log(sendData)
    } catch (error) {
      //console.log(resident)
      alert("Parking is already assigned")
    }
  }


  return (
    <div className="addvehiclecontainer">
      <div id="addvehiclesection">
        <div className="addvehheadersection">
          <div id="avlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="avsociety"><label>Society</label></div>
          <div id="avspace"></div>
          <div id="avnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="avsetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="avlogoutbutton"><LogOut /></div>
        </div>
      </div>
      <div id="avsocietysection">
        <div className='avsocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        {/* <div className='avsidelinks'>
          <Link>Vehicle List</Link><br></br><br></br>
          <Link>Add Vehicle</Link>
        </div> */}
        <div className='avsideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='avbackgroundimg'>
        <div className='Addvehicledisplay'>
          <label>Allot Vehicle</label>
        </div>
        <Form className='formclass'>
          <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label labelsize">Block</label>
            <div class="col-sm-4 col-md-4 col-lg-4">
              <select type="text" class="form-control input-lg" name="community" style={{ border: "1px solid #000000" }} id='block_id' onChange={(e) => { getFlats(e); getSections(e) }}>
                <option disabled selected value={null}>Select Block</option>
                {blocks.map((item) => {
                  return (
                    <option value={item._id}>{item.block}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Flat</label>
            <div class="col-lg-4">
              <select style={{ border: "1px solid #000000" }} type="text" class="form-control input-lg" id='flat_id' name="community" onChange={(e) => getResident(e)}>
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
            <label class="col-lg-2 col-form-label labelsize">Vehicle</label>
            <div class="col-lg-4">
              <select style={{ border: "1px solid #000000" }} type="text" class="form-control input-lg" id='vehicle_id' name="community" onChange={(e) => getResident(e)}>
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
            <label class="col-lg-2 col-form-label labelsize">Resident Name</label>
            <div class="col-lg-4">
              <input style={{ border: "1px solid #000000" }} type="text" class="form-control input-lg" name="flatNo" id='resident_name' placeholder="Resident Name" disabled></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Parking section</label>
            <div class="col-lg-4">
              <select style={{ border: "1px solid #000000" }} class="form-control input-lg" id="section" placeholder="Parking section">
                <option disabled selected value={null}>Select Section</option>
                {sections.map((item) => {
                  return (
                    <option value={item._id}>{item.section}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <Button type="submit" onClick={(e) => handleSubmit(e)} className="btnAddVeh">Allot Parking</Button>
        </Form>

      </div>
    </div>
  )
}

export default Addvehicle

