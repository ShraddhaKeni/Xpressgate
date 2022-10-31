import React from 'react';
import './Videoclass.css';
import { Button } from 'react-bootstrap';

const Videoclass = () => {
  return (
    <div className="videoclasscontainer">
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
      <div className='vcbackgroundimg'>
        <div id="cardsection">
          <div className='Dailyhelplistdisplay'>
            <label>Daily Help List</label>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss">
            <div className="col">
              <div className="videocard">
                {/* <a href='abc'><img src="/images/guestcard.svg" className="card-img-top" alt="guest card"></img></a> */}
                <video className='videoclass' src="video.mp4" controls></video>
                <label className='card-titlename'>Lorem ipsum dolor sit amet</label>
                <p className='card-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
              </div>
            </div>
            <div className="col">
              <div className="videocard">
              <video className='videoclass' src="video.mp4" controls></video>
                <label className='card-titlename'>Lorem ipsum dolor sit amet</label>
                <p className='card-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
              </div>
            </div>
            <div className="col">
              <div className="videocard">
              <video className='videoclass' src="video.mp4" controls></video>
                <label className='card-titlename'>Lorem ipsum dolor sit amet</label>
                <p className='card-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
              </div>
            </div>
            <div className="col">
              <div className="videocard">
              <video className='videoclass' src="video.mp4" controls></video>
                <label className='card-titlename'>Lorem ipsum dolor sit amet</label>
                <p className='card-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
              </div>
            </div>
            <div className="col">
              <div className="videocard">
              <video className='videoclass' src="video.mp4" controls></video>
                <label className='card-titlename'>Lorem ipsum dolor sit amet</label>
                <p className='card-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
              </div>
            </div>
            <div className="col">
              <div className="videocard">
              <video className='videoclass' src="video.mp4" controls></video>
                <label className='card-titlename'>Lorem ipsum dolor sit amet</label>
                <p className='card-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Videoclass

