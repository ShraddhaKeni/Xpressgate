import React, { useEffect, useState } from 'react';
import './Dailyservicepasscode.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import LogOut from './Utils/LogOut';
import { checkGuard } from '../auth/Auth';
import GuardHeader from './Utils/GuardHeader';
const Dailyservicepasscode = ({ props }) => {


  const [flats, setFlats] = useState([])
  const [staff, setStaff] = useState({})
  const [service, setService] = useState()
  const [dailyhelp, setDailyhelp] = useState([])
  const [details, setDetails] = useState({})
  const location = useLocation();
  //console.log(location);

const navigate = useNavigate()

  useEffect(() => {
   
  if(checkGuard())
  {
    const config = {
      headers:{
        'x-access-token':localStorage.getItem('accesstoken')
      }
    }
   axios.get(`${window.env_var}api/guard/checkLogin`,config)
          .then(({data})=>{  
            
          })
          .catch(err=>{
            localStorage.clear();
            window.location.href='/guardLogin'
          })
          if (location.state) {
            console.log(location.state)
            getdailyhelp()
      
          }
          else {
            getData()
          }  
  }
  else
  {
    window.location.href='/'
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

  const getData = async()=>{
    try {
      const codeData = {
        code: props.code,
        community_id: "632970d054edb049bcd0f0b4"
      }
      let { data } = await axios.post(`${window.env_var}api/inoutentires/getdata`, codeData)
      if(data.message=='Guest')
      {
        navigate('/guestentry',{state:{id:data.data.bookingdetails.booked_id}})
      }
      else
      {
        const { data } = await axios.get(`${window.env_var}api/resident/helperstaff/getOne/${props.booked_id}`)
        setFlats(props.flatID)
        setStaff(data.data.staff[0])
        const serviceType = await axios.get(`${window.env_var}api/admin/dailyhelp/getStafftype/${data.data.staff[0].serviceType}`)
        setService(serviceType.data.data.dailyhelp.serviceType)
      }
    } catch (error) {
      
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
      console.log(props.booked_id)
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
        <GuardHeader/>
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
          <div className='buttons_dailyservice'>
            <div>
              <Button type="button" onClick={()=> handleclick()} id='approve_entry'  className="btnAddDSP">APPROVE</Button>
              <Button type="button" onClick={()=>window.location.href="/dailyhelp"} id='deny_entry' className="btnDenyDSP ">DENY</Button>
            </div>
          </div>
      </div>
    </div>
  )

}

export default Dailyservicepasscode
