import React, { useEffect, useState } from 'react';
import './Approvallistamenity.css';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { getDefaultNormalizer } from '@testing-library/react';
import axios from 'axios';


const Approvallistamenity = () => {
  const [booking,setBooking] = useState({})
  const location = useLocation()
  useEffect(()=>{
    if(location.state)
    {
      getBookedEmenity(location.state.id)
    }
    else
    {
      window.location.href='/amenitylist'
    }
  },[])

  const getBookedEmenity=async(id)=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/resident/booking/getSingle/${id}`);
      setBooking(data.data.amenities[0])
      
    } catch (error) {
      console.log(error)
    }
  }

  const  dateTimeFormat=(date)=>
  {
    var d = new Date(date)
    return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()
    
  }

  const getTime=(date)=>{
    var d = new Date(date)
    return d.getHours()+':'+d.getMinutes()
    
  }

  const approveBooking= async(id,value)=>{
    try {
      if(value=='accept')
      {
        const {data} = await axios.get(`${window.env_var}api/resident/booking/approveBooking/${id}`)
        window.location.href='/amenitylist'
      }
      else if(value=='reject')
      {
        const {data} = await axios.get(`${window.env_var}api/resident/booking/removeBooking/${id}`)
        window.location.href='/amenitylist'
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="alacontainer">
      <div id="alaheadersection">
        <div class="alafirstheadersection">
          <div id="alalogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="alasociety"><label>Society</label></div>
          <div id="alaspace"></div>
          <div id="alanotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="alasetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="alalogoutbutton"> <Button type="submit" className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button></div>
        </div>
      </div>
      <div id="alasection">
        <div className='alaname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>Society Name</label>
        </div>
        <div className='alasideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='alabackgroundimg'>
        <div className='aladisplay'>
          <label>Amenitiy Booking Approval</label>
        </div>
        <div className="col">
          <div className="alacard">
            <br></br>   
            <label className="alalabel">{booking.firstname} {booking.lastname}</label>
            
            <div className="alaowner">Owner</div><br></br>
            <div className='alaclass'>
              <label>Flat No</label>
              <div className='alablockdisplay'>Block {booking.block}, {booking.flat_number}</div>
            </div>
            <br></br>
            <div><label className='alalabels'>{booking.aminety}</label></div>
            <div className='alaclass'>
              <div><label className='aladate'>Date:{dateTimeFormat(booking.date)}</label></div>
              <div><label className='alatime'>Time: {getTime(booking.time)}</label></div>
            </div>
            <br></br>
            <br></br>
            {booking.status==false?<> <Button type="button" onClick={()=>{approveBooking(booking._id,'accept')}} className="alabtnApprove">APPROVE</Button>
            <Button type="button" onClick={()=>{approveBooking(booking._id,'reject')}} className="alabtnDeny">DENY</Button></>: <Button type="button" onClick={()=>{approveBooking(booking._id,'reject')}} className="alabtnDeny">DENY</Button>}
           
            <br></br>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Approvallistamenity

