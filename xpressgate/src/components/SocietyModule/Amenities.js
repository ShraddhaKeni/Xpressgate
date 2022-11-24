import React, { useEffect, useState } from 'react';
import './Amenities.css';
import LogOut from '../../components/SocietyModule/Utils/LogOut';
import { getAmenities } from './common/common';
import { Navigate, useNavigate } from 'react-router-dom';

const Amenities = () => {

  const [amenities,setAmenities] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    getDetails()
  },[])

  const getDetails=async()=>{
    setAmenities(await getAmenities())
  }

  const navigateToList=(id,type)=>{
    navigate('/amenitylist',{state:{id:id,type:type}})
  }
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
            {amenities.map(items=>{
              return(
                <div className="col" id={items.id} onClick={()=>{navigateToList(items.id,items.amenityType)}}>
                  <div className="amntsminicard"><br></br>
                    <img className="amnts_img_top" src={window.env_var+items.image} alt="profile"></img><br></br><br></br>
                    <label className='amntstitle'>{items.amenityType}</label>
                  </div>
                </div>
              )
            })}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Amenities

