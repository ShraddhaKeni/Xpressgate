import React from 'react';
import './GuestManagement.css';
import LogOut from '../../components/SocietyModule/Utils/LogOut';

const GuestManagement = () => {
  return (
    <div className="gmcontainer">
      <div id="gmheadersection">
        <div class="gmfirstheadersection">
          <div id="gmdashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="gmsociety"><label>Society</label></div>
          <div id="gmdashboardspace"></div>
          <div id="gmdashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="gmdashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="gmlogoutbutton"> <LogOut /></div>
        </div>
      </div>
      <div id="gmsection">
        <div className='gmname'>
        <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='gmsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='gmbackgroundimg'>
        <div className='gmdisplay'>
          <label>Guest Management</label>
        </div>
        <div className='row'>
          <div className='gmsearchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
            <span><label className='gmsearchlabel'>Search</label><input className='search_input'></input></span>
          </div>
        </div>
        <table id="gmtable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Guest Name</th>
              <th class="th-sm">Flat No.</th>
              <th class="th-sm">Date</th>
              <th class="th-sm">Vehicle No.</th>
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

export default GuestManagement

