import React, { useEffect, useState } from 'react';
import './Amenities.css';
import LogOut from '../../components/SocietyModule/Utils/LogOut';
import { getAmenities } from './common/common';
import { Navigate, useNavigate } from 'react-router-dom';
import Societyheader from './Utils/Societyheader';

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
        <Societyheader/>
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
            <label>Amenities</label>
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

