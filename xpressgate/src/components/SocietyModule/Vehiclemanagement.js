import React, { useEffect, useState } from 'react';
import './Vehiclemanagement.css';
import LogOut from './Utils/LogOut';
// import { Link } from 'react-router-dom';
import axios from 'axios'
import PaginationCalculate from '../GuardModule/Utils/paginationCalculate';
import Societyheader from './Utils/Societyheader';

const Vehiclemanagement = () => {

  const [entry, setEntry] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts, setCurrentPosts] = useState([])
  useEffect(() => {
    getVehicleParkDetails()
  }, [])

  const getVehicleParkDetails = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/assign/getAll/632970d054edb049bcd0f0b4`) //will replace community with localstorage
      setEntry(data.data.vehicle)
      const indexoflast = currentPage * postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.vehicle.slice(indexoffirst, indexoflast))
    } catch (error) {
      console.log(error)
    }
  }

  async function paginate(event) {
    const { data } = await axios.get(`${window.env_var}api/assign/getAll/632970d054edb049bcd0f0b4`) //will replace community with localstorage
    setCurrentpage(event.selected + 1)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startof
    setCurrentPosts(data.data.vehicle.slice(indexoffirst, indexoflast))
  }

  function findText(e)
  {
    let search = e.target.value.toLowerCase()
    let arr = entry.filter(x=>{
      if(x.firstname.toLowerCase().includes(search))
      {
        return true
      }
      else if(x.lastname.toLowerCase().includes(search))
      {
        return true
      }
    })
    if(arr)
    {
      const indexoflast =currentPage*postPerPage  //endoffset
      const indexoffirst = (indexoflast - postPerPage)
      setCurrentPosts(arr.slice(indexoffirst,indexoflast))
    }
    else
    {
      paginate(0)
    }
  
}

  return (
    <div className="vmcontainer">
      <div id="vmheadersection">
        <Societyheader />
      </div>
      <div id="vmsection">
        <div className='VMsocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='vmsidelinks'>
        <a href='/vehiclemanagement' className='VLsecLink'><b>Vehicle List</b></a><br/><br/>
          <a href='/viewparking' className='VPsec'>View parking section</a><br/><br/>
          <a href='/addparking' className='APsec'>Add parking section</a>
        </div>
        <div className='VMsideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='vmbackgroundimg'>
        <div className='VMdisplay'>
          <label>Vehicle Management</label>
        </div>
        <div className='row'>
          <div className='parkingsection'>
            <select className="form-control input-lg psection parksection">
              <option value={null} disabled selected>Parking Section</option>
            </select>
          </div>
          <div className='vmsearchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
              <input placeholder='Search' onChange={(e) => { findText(e) }}></input></span>
          </div>
        </div>

        <table id="vmtable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Resident Name</th>
              <th class="th-sm">Vehicle No</th>
              <th class="th-sm">Vehicle Make</th>
              <th class="th-sm">Vehicle Model</th>
              <th class="th-sm">Parking Section</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map(item => {
              return (
                <tr>
                  <td>{item.firstname} {item.lastname}</td>
                  <td >{item.vehicle_number}</td>
                  <td>{item.vehicle_make}</td>
                  <td >{item.vehicle_model}</td>
                  <td>{item.section}</td>
                </tr>
              )
            })}

          </tbody>
        </table>
        <PaginationCalculate totalPages={entry.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
      </div>
    </div>
  )
}

export default Vehiclemanagement

