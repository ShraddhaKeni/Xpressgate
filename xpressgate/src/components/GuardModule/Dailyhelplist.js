import React from 'react';
import './Dailyhelplist.css';
import { Button } from 'react-bootstrap';

const Dailyhelplist = (props) => {
  console.log(props)
  return (
    <div className="dailyhelplistcontainer">
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
          <div className='Dailyhelplistdisplay'>
            <label>Daily Help List</label>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss">
            <div className="col">
              <div className="dailyhelpminicard">
                {/* <a href='abc'><img src="/images/guestcard.svg" className="card-img-top" alt="guest card"></img></a> */}
                <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='dhcard-titlename'>Rita Kumari</label>
                <label className='dhcard-profession'>Maid</label>
                <label className='dhcard-allowedhouses'>Allowed in 5 Houses</label>
              </div>
            </div>
            {/* <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Cleaner</label>
                <label className='card-allowedhouses'>Allowed in 2 Houses</label>
              </div>
            </div>
            <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Laundary</label>
                <label className='card-allowedhouses'>Allowed in 2 Houses</label>
              </div>
            </div>
            <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Maid</label>
                <label className='card-allowedhouses'>Allowed in 5 Houses</label>
              </div>
            </div>
            <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Cleaner</label>
                <label className='card-allowedhouses'>Allowed in 2 Houses</label>
              </div>
            </div>
            <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Laundary</label>
                <label className='card-allowedhouses'>Allowed in 2 Houses</label>
              </div>
            </div>
            <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Maid</label>
                <label className='card-allowedhouses'>Allowed in 5 Houses</label>
              </div>
            </div>
            <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Cleaner</label>
                <label className='card-allowedhouses'>Allowed in 2 Houses</label>
              </div>
            </div>
            <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Laundary</label>
                <label className='card-allowedhouses'>Allowed in 2 Houses</label>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dailyhelplist

