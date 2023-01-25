import React,{useState,useEffect, useRef} from 'react'
import './Frequentvisitor.css';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { checkGuard } from '../auth/Auth';
import GuardHeader from './Utils/GuardHeader';
import { Loader } from "../Loader";
import { ToastMessage } from '../ToastMessage';
import ErrorScreen from '../../common/ErrorScreen';

const GuestEntry = () => {
  const [toast, setToast] = useState({ show: false })
  const [loading, setLoading] = useState(true)
    const current = new Date();
    const[date, setDate] = useState(`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`);
    const location = useLocation()
    const [guestDetails,setDetails] = useState({})
    const vehical = useRef([])
    const navigate = useNavigate()
    const [isError,setError] = useState(false)
    useEffect(()=>{
      if (checkGuard()) {
        const config = {
          headers: {
            'x-access-token': localStorage.getItem('accesstoken')
          }
        }
        axios.get(`${window.env_var}api/guard/checkLogin`, config)
          .then(({ data }) => {
            getGuestData(location.state.id)
          })
          .catch(err => {
            localStorage.clear();
            window.location.href = '/guardLogin'
          })
          setLoading(false);
      } else {
        window.location.href = '/'
      } 
    },[])

    const getGuestData=async(id)=>{
        try {
            const {data} = await axios.get(`${window.env_var}api/resident/guest/getSingleGuest/${id}`)
            setDetails(data.data.guests[0])
            setLoading(false)
            setError(false)
        } catch (error) {
            setError(true)
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
                status:1,
                allowed_by:localStorage.getItem('guard_id'),
                vehicle_no:document.getElementById('veh_id').value,
                
            }
            setError(false)
            const {data} = await axios.post(`${window.env_var}api/inout/add`,submitData);
            const bookingUpdate = await axios.get(`${window.env_var}api/resident/guest/deleteGuest/${guestDetails._id}`)
            setToast({ show: true, type: "success", message: "Guest entry has been approved" })
            setTimeout(() => {
              window.location.href='/guestlist'
            }, 1500);
            // navigate('/guestlist')
        } catch (error) {
          setError(true)
        }
      
    }
    const deny=async()=>{

      setToast({ show: true, type: "success", message: "Guest entry has been Denied " })
      setTimeout(() => {
        window.location.href="/dashboard"
      }, 1500);
     
    }

    if(isError)
      return <ErrorScreen/>


  return (
    <div className="frequentvisitorcontainer">
    <div id="headersection">
      <GuardHeader/>
    </div>
    <div id="guardnamesection"> 
      <div className='GuestLName'>
        <img src="/images/guardnameicon.svg" alt="guard name" />
        <label>{localStorage.getItem('name')}</label>
      </div>
      <div className='GuestLsideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
    </div>
    <div className='fvbackgroundimg'>
    <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
      <div className='GuestL_display'>
        <label>Guest Details</label>
      </div>
      <Loader loading={loading}>
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
            {/* <div><label className='intime'>In-Time: </label></div>
            <div><label className='outtime'>Out-Time: </label></div> */}
            <div><label className='noofpeople'>No of People: {guestDetails.numberOfGuest}</label></div>
            <div><label className='vehicleno'>Vehicle No: <input ref={vehical} id='veh_id' type='text'></input></label></div>
          </div>
          <br></br>
          <button type="button" onClick={()=>{handleSubmit()}} className="BTN_Approve">APPROVE</button>
          <button type="submit" className="BTN_Deny" onClick={()=>{deny()}}>DENY</button>
          <br></br>
        </div>
      </div>
      {/* </div> */}
      </Loader>
    </div>
  </div>
  )
}

export default GuestEntry