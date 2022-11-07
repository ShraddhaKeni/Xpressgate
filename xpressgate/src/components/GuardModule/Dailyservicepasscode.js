import React, { useEffect, useState } from 'react';
import './Dailyservicepasscode.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Dailyservicepasscode = ({ props }) => {


  const [flats, setFlats] = useState([])
  const [staff, setStaff] = useState({})
  const [service, setService] = useState()

  const location = useLocation();
  //console.log(location);

  useEffect(() => {
    if (location.state) {
      //console.log(location.state)
      setFlats(location.state.flats)
    }
    else {
      getAll()
    }

  }, [])

  const getAll = async () => {
    try {
      const { data } = await axios.get(`api/resident/helperstaff/getOne/${props.booked_id}`)
      setFlats(props.flatID)
      setStaff(data.data.staff[0])
      const serviceType = await axios.get(`api/admin/dailyhelp/getStafftype/${data.data.staff[0].serviceType}`)
      setService(serviceType.data.data.dailyhelp.serviceType)

    } catch (error) {
      console.log('Try again after sometime')
    }
    // }

    return (
      <div className="dailyservicepasscodecontainer">
        <div id="dspheadersection">
          <div class="dspfirstheadersection">
            <div id="dspdashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
            <div id="dspdashboardguard"><label>Guard</label></div>
            <div id="dspdashboardspace"></div>
            <div id="dspdashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
            <div id="dspdashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
            <div id="dspdashboardlogoutbutton"> <Button type="submit" className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button></div>
          </div>
        </div>
        <div id="dspguardnamesection">
          <div className='dspguardname'>
            <img src="/images/guardnameicon.svg" alt="guard name" />
            <label>Guard Name</label>
          </div>
          <div className='sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
        </div>
        <div className='dsepbackgroundimg'>
          {props ? <div className='dailyservicepasscodedisplay'><label>{props.code} </label> </div> : " "}
          <div className="col-sm-6 col-md-6 col-lg-6">
            <div className="dailycard">
              <br></br>
              <div className='profileimage'><img src="/images/dailyservicepasscodeimage.svg" alt="profile" /></div>
              <br></br>
              {props ? <label className="dailyhelpnamelabel">{staff.staffName}</label> : <label className="dailyhelpnamelabel">{location.state.helpername}</label>}
              <br />
              {props ? <label className="proflabel">{service}</label> : <label className="proflabel">{location.state.servicetype}</label>}
              <br />
              {props ? <label className="allowedlabel">Allowed in {flats.length} houses</label> : <label className="allowedlabel">Allowed in {location.state.bookinglength.length} houses</label>}
              <br></br>
              <br></br>
              <br></br>
            </div>
          </div>

          {props ? <div className="col-sm-6 col-md-6 col-lg-6 flatnum">
            {flats.map(flat => {
              return <label className="detailslabel">Flat {flat.Flat_number}, Block {flat.Block_name}</label>
            })}
          </div> :
            <div className="col-sm-6 col-md-6 col-lg-6 flatnum">
              {flats.map(flat => {
                return <label className="detailslabel">Flat {flat}, Block {location.state.blocks} </label>
              })}
            </div>}
        </div>
      </div>
    )
  }
}

export default Dailyservicepasscode
