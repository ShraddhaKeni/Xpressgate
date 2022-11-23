import React from 'react';
import './Ticketlist.css';
import LogOut from './Utils/LogOut';

const Ticketlist = () => {
  return (
    <div className="tlcontainer">
      <div id="tlheadersection">
        <div class="tlfirstheadersection">
          <div id="tllogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="tlsociety"><label>Society</label></div>
          <div id="tldashboardspace"></div>
          <div id="tldashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="tldashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="tllogoutbutton"> <LogOut /></div>
        </div>
      </div>
      <div id="tlsection">
        <div className='tlname'>
        <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='tlsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='tlbackgroundimg'>
        <div className='tldisplay'>
          <label>Ticket Management</label>
        </div>
        <div className='row'>
          <div className='tlsearchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
            <span><label className='tlsearchlabel'>Search</label><input className='search_input'></input></span>
          </div>
        </div>
        <table id="tltable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Ticket No.</th>
              <th class="th-sm">Created By</th>
              <th class="th-sm">Issue</th>
              <th class="th-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>abcd</td>
              <td >121</td>
              <td>09-9-2022</td>
              <td>2232</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Ticketlist

