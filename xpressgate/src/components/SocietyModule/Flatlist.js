import React from 'react';
import './Flatlist.css';
import { Button } from 'react-bootstrap';

const Flatlist = () => {
  return (
    <div className="flcontainer">
      <div id="flheadersection">
        <div class="flfirstheadersection">
          <div id="fldashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="flsociety"><label>Society</label></div>
          <div id="sldashboardspace"></div>
          <div id="flnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="flsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="fllogoutbutton"> <Button type="submit" className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button></div>
        </div>
      </div>
      <div id="flsection">
        <div className='flname'>
        <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='flsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='flbackgroundimg'>
        <div className='fldisplay'>
          <label>Block A</label>
        </div>
        <div className='row'>
          <div className='flsearchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
            <span><label className='flsearchlabel'>Search</label><input className='search_input'></input></span>
          </div>
        </div>
        <table id="fltable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Flat No</th>
              <th class="th-sm">Owner Name</th>
              <th class="th-sm">Family Members</th>
              <th class="th-sm">No. of Vehicles</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12345</td>
              <td >Neha Sharma</td>
              <td>3</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Flatlist

