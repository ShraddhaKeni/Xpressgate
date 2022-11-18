import React, { useState } from 'react';
import './Ticket.css';
import { Button } from 'react-bootstrap';


const Ticket = () => {

  return (
    <div className="ticketcontainer">
      <div id="tktheadersection">
        <div class="tktfirstheadersection">

          <div id="tktlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="tktsociety"><label>Society</label></div>
          <div id="tktspace"></div>
          <div id="tktnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="tktsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="tktlogoutbutton"> <Button type="submit" className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button></div>
        </div>
      </div>
      <div id="tktsection">
        <div className='tktname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>Society Name</label>
        </div>
        <div className='tktsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='tktbackgroundimg'>
        <div className='tktdisplay'>
          <label>Ticket No.</label>
        </div>
        <div className="col">
          <div className="tktcard">
            <br></br>
            <label className="tktlabel">Ticket No.</label>
            
            <div className="name">Name</div>
            <div><label className='tktIssuelabels'>Issue</label></div>
            <div className='tktclass'>
              <label></label>
              <div className='flatnodisplay'></div>
            </div>
            <br></br>
            <div><label className='tktdesclabels'>Description</label></div>
            <div className='detailsclass'>
              <div><label className='date text-right'></label></div>
              <div><label className='intime'></label></div>
              <div><label className='outtime'></label></div>
              <div><label className='noofpeople'></label></div>
              <div><label className='vehicleno'></label></div>
            </div>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket

