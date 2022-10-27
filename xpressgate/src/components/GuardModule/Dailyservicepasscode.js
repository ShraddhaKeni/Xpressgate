import React from 'react';
import './Dailyservicepasscode.css';
import { Button } from 'react-bootstrap';

const Dailyservicepasscode = () => {
 
  return (
    <div className="service_container1">
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
        <div className='sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage"/></div>
      </div>
      <div className='backgroundimg'>
        <div className='Addvendordisplay'>
          <label>902819</label>
        </div>
        {/* <div className="row row-cols-1 row-cols-md-1 g-4 fullcardscss"> */}
            <div className="col-sm-6 col-md-6 col-lg-6">
              <div className="card">
                <br></br>
                <div className='profileimage'><img src="/images/dailyservicepasscodeimage.svg" alt="profile"/></div>
                <label className="namelabel">Rita Kumari</label>
                <label className="proflabel">Maid</label>
                <label className="allowedlabel">Allowed in 5 houses</label>
                <br></br>
                <br></br>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6">
            <div className='flatclass'></div>
                <label className="detailslabel">Flat 101, Block A</label>
                <label className="detailslabel">Flat 401, Block D</label>
                <label className="detailslabel">Flat 503, Block E</label>
                <label className="detailslabel">Flat 508, Block E</label>
                <label className="detailslabel">Flat 202, Block B</label>
           </div> 
      </div>
    </div>
  )
}

export default Dailyservicepasscode

