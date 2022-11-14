import React, { useState } from 'react';
import './Flatapprovallist.css';
import { Button } from 'react-bootstrap';


const Flatapprovallist = () => {


  return (
    <div className="frequentvisitorcontainer">
      <div id="headersection">
        <div class="firstheadersection">
          <div id="dashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dashboardguard"><label>Society</label></div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="dashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="dashboardlogoutbutton"> <Button type="submit" className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button></div>
        </div>
      </div>
      <div id="guardnamesection"> 
        <div className='guardname'>
          <img src="/images/societyicon.svg" alt="guard name" />
          <label>Society Name</label>
        </div>
        <div className='sideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='fvbackgroundimg'>
        <div className='frequentvisitordisplay'>
          <label>Flat Approval</label>
        </div>
        {/* <div className="row row-cols-1 row-cols-md-1 g-4 fullcardscss"> */}
        <div className="col">
          <div className="frequentvisitorcard">
            <br></br>
            <label className="namelabel">Ramesh Desai</label>
            <div className='profclass'>Owner</div>
            <br></br>
            <div className='flatclass'>
              <label>Flat No</label>
              <div className='flatnodisplay'>Block B, 1011</div>
            </div>
            <br></br>
            <div><label className='allowedclass'>Other Details</label></div>

            <div className='detailsclass'>
              <div><label className='date text-right'>No of Family Members:</label></div>
              <div><label className='intime'>No of Vehicle: </label></div>
            </div>
            <br></br>
            <Button type="submit" className="btnApprove">APPROVE</Button>
            <Button type="submit" className="btnDeny">DENY</Button>
            <br></br>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Flatapprovallist

