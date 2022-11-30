import React, { useEffect, useState } from 'react';
import './Flatapprovallist.css';
import { Button } from 'react-bootstrap';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Flatapprovallist = () => {
  const [flat,setFlat] = useState({})
const location = useLocation()
const navigate = useNavigate()

console.log(location.state)
useEffect(()=>{
  if(location.state)
  {
    getFlatDetails()
  }
  else
  {
    window.location.href = '/flatList'
  }
},[])

const getFlatDetails=async()=>{
  try {
    const {data} = await axios.get(`${window.env_var}api/flats/single/${location.state.id}`)
    setFlat(data.data.list[0])
    
  } catch (error) {
    console.log(error)
  }
}

const approveFlat=async(id)=>{
  try {
    let sendData = {
      resident_id:flat.resident_id,
      flat_id:id,
      community_id:localStorage.getItem('community_id')
    }
    const {data} = await axios.post(`${window.env_var}api/approveresidents/approve`,sendData)
    window.location.href='/flatList'
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className="frequentvisitorcontainer">
      <div id="headersection">
        <div class="firstheadersection">
          <div id="dashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dashboardguard"><label>Society</label></div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="dashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="dashboardlogoutbutton"> <Button type="submit" className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button></div>
        </div>
      </div>
      <div id="guardnamesection"> 
        <div className='guardname'>
          <img src="/images/societyicon.svg" alt="guard name" />
          <label>Society Name</label>
        </div>
        <div className='sideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='fvbackgroundimg'>
        <div className='frequentvisitordisplay'>
          <label>Flat Approval</label>
        </div>
        {/* <div className="row row-cols-1 row-cols-md-1 g-4 fullcardscss"> */}
        <div className="col">
          <div className="frequentvisitorcard">
            <br></br>
            <label className="namelabel">{flat.firstname} {flat.lastname}</label>
            <div className='profclass'>Owner</div>
            <br></br>
            <div className='flatclass'>
              <label>Flat No</label>
              <div className='flatnodisplay'>Block {flat.block}, {flat.flat_number}</div>
            </div>
            <br></br>
            <div><label className='falallowedclass'>Other Details</label></div>

            <div className='detailsclass'>
              <div><label className='date text-right'>No of Family Members: {flat.family} </label></div>
              <div><label className='intime'>No of Vehicle: {flat.vehical}</label></div>
            </div>
            <br></br>
            <Button type="button" onClick={()=>approveFlat(flat._id)} className="btnApprove">APPROVE</Button>
            <Button type="button" className="btnDenyFlat">DENY</Button>
            <br></br>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Flatapprovallist

