import React from 'react';
import './Noticelist.css';
import { Button } from 'react-bootstrap';
import LogOut from './Utils/LogOut';

const Noticelist = () => {
  return (
    <div className="inoutbookcontainer">
      <div id="headersection">
        <div class="firstheadersection">
          <div id="dashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dashboardguard"><label>Society</label></div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="dashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="dashboardlogoutbutton"> <LogOut /></div>
        </div>
      </div>
      <div id="guardnamesection">
        <div className='guardname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='sideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='iobbackgroundimg'>
        <div className='inoutbookdisplay'>
          <label>Notice List</label>
        </div>
        <div className='form-group row'>
          <div> <Button type="submit" className="btnAddnotice">Add New Notice<img src="/images/logout.svg" alt="header logo" /></Button></div>
       
          <div className='searchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
            <span><label className='searchlabel'>Search</label><input className='search_input'></input></span>
          </div>
        </div>
        <table id="inoutbooktable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Sr. No.</th>
              <th class="th-sm">Notice Title</th>
              <th class="th-sm">Notice Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td >Meeting</td>
              <td>03/11/2022</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Noticelist

