import React, { useEffect, useState } from 'react';
import './Dailyservicepasscode.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import LogOut from './Utils/LogOut';

const Dailyservicepasscode = ({ props }) => {


  const [flats, setFlats] = useState([])
  const [staff, setStaff] = useState({})
  const [service, setService] = useState()
  const [dailyhelp, setDailyhelp] = useState([])
  const [details, setDetails] = useState({})
  const location = useLocation();
  //console.log(location);

  useEffect(() => {
    if (location.state) {
      console.log(location.state)
      //setFlats(location.state.flats)

      //console.log(location.state.flats)
      getdailyhelp()

    }
    else {
      getAll()
    }

  }, [])

  const getdailyhelp = async () => {
    try {
      const dailyhelpdata = await axios.get(`${window.env_var}api/helperlist/getHelper/${location.state.id}`)
      setDailyhelp(dailyhelpdata.data.data.list)
      setDetails(dailyhelpdata.data.data.list[0])
      //console.log(dailyhelpdata.data.data.list)
      //console.log(dailyhelpdata.data.data.list[0])
    } catch (error) {
      console.log('Try again after sometime')
    }
  }

  const getAll = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/resident/helperstaff/getOne/${props.booked_id}`)
      setFlats(props.flatID)
      setStaff(data.data.staff[0])
      const serviceType = await axios.get(`${window.env_var}api/admin/dailyhelp/getStafftype/${data.data.staff[0].serviceType}`)
      setService(serviceType.data.data.dailyhelp.serviceType)
    } catch (error) {
      console.log('Try again after sometime')
    }
  }

  const handleclick =async()=>{
    try {
     dailyhelp.map(async(item)=>{
      let submitData = {
        firstname:item.helper_name,
        lastname:'',
        mobileno:item.contact,
        intime:Date.now(),
        outtime:"",
        community_id:localStorage.getItem('community_id'),
        flat_id:item.flat_id,
        type:3,
        bookedID:item._id,
        status:2,
        allowed_by:localStorage.getItem('guard_id')
    }
    const saveData = await axios.post(`${window.env_var}api/inout/add`,submitData)
    console.log(saveData.data.data)
    window.location.href="/dailyhelp"
     })
    } catch (error) {
      
    }
  }

  return (
    <div className="dailyservicepasscodecontainer">

      <div id="dspheadersection">
        <div class="dspfirstheadersection">
          <div id="dspdashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dspdashboardguard"><label>Guard</label></div>
          <div id="dspdashboardspace"></div>
          <div id="dspdashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="dspdashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="dspdashboardlogoutbutton"><LogOut /></div>
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
            {props ? <label className="dailyhelpnamelabel">{staff.staffName}</label> : <label className="dailyhelpnamelabel">{details.helper_name}</label>}
            <br />
            {props ? <label className="proflabel">{service}</label> : <label className="proflabel">{details.service}</label>}
            <br />
            {props ? <label className="allowedlabel">Allowed in {flats.length} houses</label> : <label className="allowedlabel">Allowed in {dailyhelp.length} houses</label>}
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
            {dailyhelp.map(ft => {
              return <label className="detailslabel">Flat {ft.flats}, Block {ft.block} </label>
            })}
          </div>}
          <Button type="button" onClick={()=> handleclick()} className="btnApprove approvebtn">APPROVE</Button>
            <Button type="button" onClick={()=>window.location.href="/dailyhelp"} className="btnDeny denybtn">DENY</Button>
      </div>
    </div>
  )

}

export default Dailyservicepasscode
