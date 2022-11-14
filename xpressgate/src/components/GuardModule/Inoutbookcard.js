import React, { useState, useEffect } from 'react';
import './Inoutbookcard.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderSection from './Utils/HeaderSection';
import LogOut from './Utils/LogOut';

const Inoutbookcard = () => {
  
  const [listData, setInOutData] = useState({})
  const [flats,setFlats] = useState([])
  const location = useLocation()
  useEffect(() => {
    getData()
  }, [])

  const getData =async()=>{  
    let id = {
      booking_id:location.state.id,
      type:"1"
    } 
    try {
      const {data} = await axios.post(`${window.env_var}api/inout/getone`,id);
      console.log(data);
      setInOutData(data.data)
      setFlats(data.data.flat_details)
    } catch (error) {
      console.log(error);  
    }
  }

 
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
      <div className='iobcbackgroundimg'>
        <div className='inoutbookcarddisplay'>
          <label>In-out Book</label>
        </div>
        {/* <div className="row row-cols-1 row-cols-md-1 g-4 fullcardscss"> */}
        <div className="col">
          <div className="inoutbookcard">
            <br></br>
            <label className="namelabel">{listData.FirstName}</label>
            <div className='profclass'>{listData.type}</div>
            <br></br>
            <div className='flatclass'>
              <label>Flat No</label>
              {flats.map((items)=>{
                    return <div className='flatnodisplay'>{items.flat_no}, {items.block_name}</div>
              })}
            </div>
            <br></br>
            <div><label className='allowedclass'>Allowed by {listData.allowed_by}</label></div>
            <br></br>
            <div className='detailsclass'>
              <div><label className='date'>Date:{listData.intime}</label></div>
              <div><label className='intine'>In-Time: {listData.intime}</label></div>
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