import React, { useEffect, useState } from 'react';
import './Dailyservicepasscode.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Dailyservicepasscode = ({dailyservicepasscodedata}) => {

  const [flats,setFlats] = useState([])
  const [staff,setStaff] = useState({})
  const [service,setService] = useState()
  useEffect(()=>{
    getAll()
  },[])
 
  const getAll=async()=>{
    try {
      const {data}= await axios.get(`api/resident/helperstaff/getOne/${dailyservicepasscodedata.booked_id}`)
      setFlats(dailyservicepasscodedata.flatID)
      setStaff(data.data.staff[0])
      const serviceType= await axios.get(`api/admin/dailyhelp/getStafftype/${data.data.staff[0].serviceType}`)
      setService(serviceType.data.data.dailyhelp.serviceType)
      
    } catch (error) {
      
    }
  }

  return (
    <div className="dailyservicepasscodecontainer">
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
        <div className='sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage"/></div>
      </div>
      <div className='backgroundimg'>
        <div className='dailyservicepasscodedisplay'>
          <label>{dailyservicepasscodedata.code}</label>
        </div>
        {/* <div className="row row-cols-1 row-cols-md-1 g-4 fullcardscss"> */}
            <div className="col-sm-6 col-md-6 col-lg-6">
              <div className="dailycard">
                <br></br>
                <div className='profileimage'><img src="/images/dailyservicepasscodeimage.svg" alt="profile"/></div>
                <br></br>
                <label className="dailyhelpnamelabel">{staff.staffName}</label>
                <br/>
                <label className="proflabel">{service}</label>
                <br/>
                <label className="allowedlabel">Allowed in {flats.length} houses</label>
                <br></br>
                <br></br>
                <br></br>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 flatnum">
            {/* <div className='flatclass'></div>  */}
              {flats.map(flat=>{
                return( <label className="detailslabel">Flat {flat.Flat_number}, Block {flat.Block_name}</label>)
              })}
               
          </div>
      </div>
    </div>
  )
}

export default Dailyservicepasscode

