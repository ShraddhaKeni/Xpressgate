import React, { useEffect, useState } from 'react';
import './Dailyhelplist.css';
import { Button } from 'react-bootstrap';
import HeaderSection from './Utils/HeaderSection';
import GuardSideSection from './Utils/GuardSideSection';
import axios from 'axios';
import LogOut from './Utils/LogOut';
import { Link, useNavigate } from 'react-router-dom'

const Dailyhelplist = () => {
  const [dailyhelpdata, setDailyhelpdata] = useState([])
  //const [flatdata, setFlatdata] = useState([])
  useEffect(() => {
    getData()
  }, [])


  const getData = async () => {
    try {

      const data = await axios.get('/api/helperlist/getAll')
      setDailyhelpdata(data.data.data.list)
      //setFlatdata(data.data.data.list[0].booking_id)
      //console.log(data.data.data.list[0].booking_id);
    } catch {
      console.log('Please try again');
    }

  }
  const navigate = useNavigate();
  return (
    <div className="dailyhelplistcontainer">
      <div id="dhlheadersection">
        <div className="dhlfirstheadersection">
          <div id="dhldashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dhldashboardguard"><label>Guard</label></div>
          <div id="dhldashboardspace"></div>
          <div id="dhldashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="dhldashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="dhldashboardlogoutbutton"><LogOut /></div>
        </div>
      </div>
      <div id="dhlguardnamesection">
        <div className='dhlguardname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>Guard Name</label>
        </div>
        <div className='sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='dhlbackgroundimg'>
        <div id="cardsection">
          <div className='Dailyhelplistdisplay'>
            <label>Daily Help List</label>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss">

            {dailyhelpdata.map(dailydata => {

              const dailyservicedata = () => {
                navigate('/dailyservice', { state: { dailydata } });
              }
              return (
                <div className="col">
                  <div className="dailyhelpminicard" onClick={() => dailyservicedata()}>
                    <img className="card-img-top" src={"http://143.110.187.80:5050/uploads/staff/" + dailydata.helper_image} alt="profile"></img><br></br>
                    <label className='dhcard-titlename'>{dailydata.helper_name}</label><br></br>
                    <label className='dhcard-profession'>{dailydata.service}</label><br></br>
                    <label className='dhcard-allowedhouses'>Allowed in {dailydata.booking_id.length} Houses</label>
                  </div>
                </div>)
            })}





            {/* <div className="col">
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
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dailyhelplist

