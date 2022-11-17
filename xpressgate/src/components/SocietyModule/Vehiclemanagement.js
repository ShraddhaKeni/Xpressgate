import React from 'react';
import './Vehiclemanagement.css';
import LogOut from './Utils/LogOut';
import { Link } from 'react-router-dom';

const Vehiclemanagement = () => {
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
        <div className='vmsearchbox'>
          <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
          {/* <span><label className='searchlabel'>Search</label><input className='search_input'></input></span> */}
          <span><label className='vmsearchlabel'>Search</label></span>
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
            <tr>
              <td>Neha Sharma</td>
              <td >GA 03 A 4090</td>
              <td>Suzuki</td>
              <td >WagonR</td>
              <td>Side A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Vehiclemanagement

