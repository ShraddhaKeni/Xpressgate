import React, { useEffect, useState } from 'react';
import './Vehiclemanagement.css';
import LogOut from './Utils/LogOut';
import { Link } from 'react-router-dom';
import axios from 'axios'
import PaginationCalculate from '../GuardModule/Utils/paginationCalculate';

const Vehiclemanagement = () => {

  const [entry,setEntry] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  useEffect(()=>{
    getVehicleParkDetails()
  },[])

    const getVehicleParkDetails=async()=>{
      try {
        const {data} = await axios.get(`${process.env.REACT_APP_SERVER_PATH}api/assign/getAll/632970d054edb049bcd0f0b4`) //will replace community with localstorage
        setEntry(data.data.vehicle)
        const indexoflast = currentPage*postPerPage  //endoffset
        const indexoffirst = indexoflast - postPerPage //startoffset
        setCurrentPosts(data.data.vehicle.slice(indexoffirst,indexoflast))
      } catch (error) {
        console.log(error)
      }
    }

  async function  paginate(event)
  {
    const {data} = await axios.get(`${process.env.REACT_APP_SERVER_PATH}api/assign/getAll/632970d054edb049bcd0f0b4`) //will replace community with localstorage
        setCurrentpage(event.selected+1)
        const indexoflast = (event.selected+1)*postPerPage  //endoffset
        const indexoffirst = (indexoflast - postPerPage) //startof
        setCurrentPosts(data.data.vehicle.slice(indexoffirst,indexoflast))
  }

  async function findText(e)
  {
    let text = entry.filter(x=>x.vehicle_number.toLowerCase().includes(e.target.value.toLowerCase()))
    
    if(text)
    {
      setCurrentPosts(text)
    }
    else
    {
      paginate(0)
    }
    
  }

  return (
    <div className="vmcontainer">
      <div id="vmheadersection">
        <div class="vmfirstsection">
          <div id="vmlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="vmsociety"><label>Society</label></div>
          <div id="vmspace"></div>
          <div id="vmnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="vmsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="vmlogoutbutton"> <LogOut /></div>
        </div>
      </div>
      <div id="vmsection">
        <div className='vmsocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='vmsidelinks'>
          <Link>Vehicle List</Link><br></br><br></br>
          <Link>Add Vehicle</Link>
        </div>
        <div className='vmsideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='vmbackgroundimg'>
        <div className='vmdisplay'>
          <label>Vehicle Management</label>
        </div>
        <div className='row'>
          <div className='searchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
            <span><label className='searchlabel'>Search</label><input className='search_input' onChange={(e)=>findText(e)} ></input></span>
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
            {entry.map(item=>{
              return(
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
        <PaginationCalculate totalPages={entry.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>
      </div>
    </div>
  )
}

export default Vehiclemanagement

