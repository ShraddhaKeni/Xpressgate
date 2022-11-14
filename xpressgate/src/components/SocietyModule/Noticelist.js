import React from 'react';
import './Noticelist.css';
import { Button } from 'react-bootstrap';
import LogOut from './Utils/LogOut';
import { Link } from 'react-router-dom';

const Noticelist = () => {
  return (
    <div className="nlcontainer">
      <div id="nlheadersection">
        <div class="nlfirstsection">
          <div id="nllogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="nlsociety"><label>Society</label></div>
          <div id="nlspace"></div>
          <div id="nlnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="nlsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="nllogoutbutton"> <LogOut /></div>
        </div>
      </div>
      <div id="nlsection">
        <div className='nlsocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='nlsidelinks'>
          <Link>Notice List</Link><br></br><br></br>
          <Link>Add Notice</Link>
        </div>
        <div className='nlsideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='nlbackgroundimg'>
        <div className='nldisplay'>
          <label>Notice List</label>
        </div>
        <div> <Button type="submit" className="btnAddnotice"><img src="/images/plus.svg" alt="header logo" />&nbsp;Add New Notice</Button></div>
        <div className='nlsearchbox'>
          <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
          {/* <span><label className='searchlabel'>Search</label><input className='search_input'></input></span> */}
          <span><label className='nlsearchlabel'>Search</label></span>
        </div>

        <table id="nltable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
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

