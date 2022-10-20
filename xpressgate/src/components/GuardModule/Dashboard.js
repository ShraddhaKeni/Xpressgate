import React from 'react';
import './Dashboard.css';
import { Button } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <div className="container1">
      <div id="headersection">
        <div class="firstheadersection">
          <div id="dashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dashboardguard"><label>Guard</label></div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="dashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="dashboardlogoutbutton"> <Button type="submit" className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button></div>
        </div>
      </div>
      <div id="guardnamesection">
        <div className='guardname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>Guard Name</label>
        </div>
        <div className='sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='backgroundimg'>
        <div id="cardsection">
            <div className='enterpasscodesearch'>
             <label>ENTER PASSCODE</label> 
             <img src="/images/searchicon.svg" alt="search" />
            </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss">
            <div className="col">
              <div className="card">
                <a href='abc'><img src="/images/guestcard.svg" className="card-img-top" alt="guest card"></img></a>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <img src="/images/vendorcard.svg" className="card-img-top" alt="vendor card"></img>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <img src="/images/dailyhelpcard.svg" className="card-img-top" alt="dailyhelp card"></img>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <img src="/images/inoutbookcard.svg" className="card-img-top" alt="inout book card"></img>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <img src="/images/videoclass.svg" className="card-img-top" alt="video class"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

