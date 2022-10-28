import React from 'react';
import './Inoutbookcard.css';
import { Button } from 'react-bootstrap';

const Inoutbookcard = () => {
 
  return (
    <div className="inoutbookcardcontainer">
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
        <div className='inoutbookcarddisplay'>
          <label>In-out Book</label>
        </div>
        {/* <div className="row row-cols-1 row-cols-md-1 g-4 fullcardscss"> */}
            <div className="col">
              <div className="inoutbookcard">
                <br></br>
                <label className="namelabel">Ramesh Keni</label>
                <div className='profclass'>Cab Driver</div>
                <br></br>
                <div className='flatclass'>
                  <label>Flat No</label>
                  <div className='flatnodisplay'>3010, Block B</div>
                </div>
                <br></br>
                <div><label className='allowedclass'>Allowed by guard Somnath</label></div>
                <br></br>
                <div className='detailsclass'>
                  <div><label className='date'>Date:12/02/2022</label></div>
                  <div><label className='intine'>In-Time: 15:22 pm</label></div>
                  <div><label className='outtime'>Out-Time: </label></div>
                  <div><label className='noofpeople'>No of People: 1</label></div>
                  <div><label className='vehicleno'>Vehicle No: MH-29-2901</label></div>
                </div>
                <br></br>
                <Button type="submit" className="btnOut">Out</Button>
                <br></br>
              </div>
            </div>
          {/* </div> */}
      </div>
    </div>
  )
}

export default Inoutbookcard

