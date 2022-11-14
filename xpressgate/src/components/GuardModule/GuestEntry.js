import React,{useState,useEffect, useRef} from 'react'
import './Frequentvisitor.css';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const GuestEntry = () => {
    const current = new Date();
    const[date, setDate] = useState(`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`);
    const location = useLocation()
    const [guestDetails,setDetails] = useState({})
    const vehical = useRef([])
    const navigate = useNavigate()
    useEffect(()=>{
        getGuestData(location.state.id)
    },[])

    const getGuestData=async(id)=>{
        try {
            console.log(id)
            const {data} = await axios.get(`${window.env_var}api/resident/guest/getSingleGuest/${id}`)
            setDetails(data.data.guests[0])
        } catch (error) {
            
        }
    }
    const handleSubmit=async()=>{
        try {
            var submitData = {
                firstname:guestDetails.guestFirstName,
                lastname:guestDetails.guestLastName,
                mobileno:guestDetails.guestPhone,
                intime:Date.now(),
                outtime:"",
                community_id:localStorage.getItem('community_id'),
                flat_id:guestDetails.flat_id,
                type:1,
                bookedID:guestDetails._id,
                status:2,
                allowed_by:localStorage.getItem('guard_id')
            }
            const {data} = await axios.post(`${window.env_var}api/inout/add`,submitData);
            const bookingUpdate = await axios.get(`${window.env_var}api/resident/guest/deleteGuest/${guestDetails._id}`)
            navigate('/guestlist')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="frequentvisitorcontainer">
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
    <div className='fvbackgroundimg'>
      <div className='frequentvisitordisplay'>
        <label></label>
      </div>
      {/* <div className="row row-cols-1 row-cols-md-1 g-4 fullcardscss"> */}
      <div className="col">
        <div className="frequentvisitorcard">
          <br></br>
          <label className="namelabel">{guestDetails.guestFirstName} {guestDetails.guestLastName}</label>
          <div className='profclass'></div>
          <br></br>
          <div className='flatclass'>
            <label>Flat No {guestDetails.flat}, {guestDetails.block}</label>
            <div className='flatnodisplay'></div>
          </div>
          <br></br>
          <div><label className='allowedclass'>Allowed by</label></div>

          <div className='detailsclass'>
            <div><label className='date text-right'>Date:{date}</label></div>
            <div><label className='intime'>In-Time: </label></div>
            <div><label className='outtime'>Out-Time: </label></div>
            <div><label className='noofpeople'>No of People: 1</label></div>
            <div><label className='vehicleno'>Vehicle No: <input ref={vehical} type='text'></input></label></div>
          </div>
          <br></br>
          <Button type="button" onClick={()=>{handleSubmit()}} className="btnApprove">APPROVE</Button>
          <Button type="submit" className="btnDeny">DENY</Button>
          <br></br>
        </div>
      </div>
      {/* </div> */}
    </div>
  </div>
  )
}

export default GuestEntry