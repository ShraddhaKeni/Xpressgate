import React, { useState } from 'react';
import './Approvallistamenity.css';
import { Button } from 'react-bootstrap';


const Approvallistamenity = () => {

  return (
    <div className="alacontainer">
      <div id="alaheadersection">
        <div class="alafirstheadersection">
          <div id="alalogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="alasociety"><label>Society</label></div>
          <div id="alaspace"></div>
          <div id="alanotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="alasetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="alalogoutbutton"> <Button type="submit" className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button></div>
        </div>
      </div>
      <div id="alasection">
        <div className='alaname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>Society Name</label>
        </div>
        <div className='alasideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='alabackgroundimg'>
        <div className='aladisplay'>
          <label>Amenitiy Booking Approval</label>
        </div>
        <div className="col">
          <div className="alacard">
            <br></br>
            <label className="alalabel">Ramesh Desai</label>
            
            <div className="alaowner">Owner</div><br></br>
            <div className='alaclass'>
              <label>Flat No</label>
              <div className='alablockdisplay'>Block B, 1011</div>
            </div>
            <br></br>
            <div><label className='alalabels'>Other Details</label></div>
            <div className='alaclass'>
              <div><label className='aladate'>Date:20/09/2011</label></div>
              <div><label className='alatime'>Time: 5:30 PM</label></div>
            </div>
            <br></br>
            <br></br>
            <Button type="submit" className="alabtnApprove">APPROVE</Button>
            <Button type="submit" className="alabtnDeny">DENY</Button>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Approvallistamenity

