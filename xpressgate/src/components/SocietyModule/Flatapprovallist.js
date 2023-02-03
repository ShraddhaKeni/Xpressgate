import React, { useEffect, useState } from 'react';
import './Flatapprovallist.css';
import { Button } from 'react-bootstrap';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogOut from './Utils/LogOut'
import { Loader } from "../Loader";
import { ToastMessage } from '../ToastMessage';
import Societyheader from './Utils/Societyheader'

const Flatapprovallist = () => {
  const [flat,setFlat] = useState({})
  const [family,setFamily] = useState({})
  const [vehicle,setVehicle] = useState({})
const location = useLocation()
const navigate = useNavigate()
const [toast, setToast] = useState({ show: false })
const [loading, setLoading] = useState(true)

useEffect(()=>{
  if(location.state)
  {
    getFlatDetails()
    setFamily(location.state.family)
    setVehicle(location.state.vehicle)
  }
  else
  {
    navigate('/flatList')
  }
},[])

const getFlatDetails=async()=>{
  try {
    const {data} = await axios.get(`${window.env_var}api/flats/single/${location.state.id}`)
    setFlat(data.data.list[0])
    setLoading(false);
  } catch (error) {
    console.log(error)
    setLoading(false);
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
    setToast({ show: true, type: "success", message: "Apporved" })
    setTimeout(() => {
      window.location.href='/blockList'
    }, 1500);
 
  } catch (error) {
    setToast({ show: true, type: "error", message: "Check Data." });
  }
}
const deny=async()=>{
  setToast({ show: true, type: "success", message: "Denied" })
  setTimeout(() => {
    window.location.href='/blockList'
  }, 1500);
}

  return (
    <div className="falcontainer">
      <div id="falheadersection">
        <Societyheader/>
      </div>
      <div id="guardnamesection"> 
        <div className='FA_SOCNAme'>
          <img src="/images/societyicon.svg" alt="guard name" />
          <label>Society Name</label>
        </div>
        <div className='FA_SiDeImG'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='fvbackgroundimg'>
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
      <Loader loading={loading}>
        <div className='FLATApp_Display'>
          <label>Flat Approval</label>
        </div>
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
              <div><label className='date text-right'>No of Family Members: {location.state.family} </label></div>
              <div><label className='intime'>No of Vehicle: {location.state.vehicle}</label></div>
            </div>
            <br></br>
            <button type="button" onClick={()=>approveFlat(flat._id)} className="FABtnApprove">APPROVE</button>
            <button type="button" className="btnDenyFlat"  onClick={()=>{deny()}}>DENY</button>
            <br></br>
          </div>
        </div>
      </Loader>
      </div>
    </div>
  )
}
export default Flatapprovallist;