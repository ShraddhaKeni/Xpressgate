import React, { useEffect, useState } from 'react';
import './Amenities.css';
import LogOut from '../../components/SocietyModule/Utils/LogOut';

const Amenities = () => {

  return (
    <div className="amenitiescontainer">
      <div id="amntsheadersection">
        <div className="amntsfirstheadersection">
          <div id="amntsdashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="amntsdashboardguard"><label>Society</label></div>
          <div id="amntsspace"></div>
          <div id="amntsnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="amntssetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="amntslogoutbutton"><LogOut /></div>
        </div>
      </div>
      <div id="amntsnamesection">
        <div className='amntsname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>Society Name</label>
        </div>
        <div className='amntssideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='amntsbackgroundimg'>
        <div id="amntscard">
          <div className='amntsdisplay'>
            <label>Amemities</label>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 amntscss">
            <div className="col">
              <div className="amntsminicard"><br></br>
                <img className="amnts_img_top" src="/images/amenitiesicon.svg" alt="profile"></img><br></br><br></br>
                <label className='amntstitle'>Swimming Pool</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Amenities

