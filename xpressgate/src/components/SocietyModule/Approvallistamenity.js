import React, { useEffect, useState } from 'react';
import './Approvallistamenity.css';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { getDefaultNormalizer } from '@testing-library/react';
import axios from 'axios';
import { Loader } from "../Loader";
import ErrorScreen from '../../common/ErrorScreen';
import { ToastMessage } from '../ToastMessage';
const Approvallistamenity = () => {
  const [booking, setBooking] = useState({})
  const [time, setTime] = useState({})
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [isError,setError] = useState(false)
  const [toast, setToast] = useState({ show: false })
  useEffect(() => {
    if (location.state) {
      getBookedEmenity(location.state.id)
      setTime(location.state.time)
    }
    else {
      window.location.href = '/amenitylist'
    }
  }, [])

  const getBookedEmenity = async (id) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/resident/booking/getSingle/${id}`);
      setBooking(data.data.amenities[0])
      setLoading(false);
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const dateTimeFormat = (date) => {
    var d = new Date(date)
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()

  }

  const getTime = (time) => {
    let ntime = time.split('T');
    let titime = ntime[1].split('.');

    return titime[0]

  }

  const approveBooking = async (id, value) => {
    try {
      if (value == 'accept') {
        const { data } = await axios.get(`${window.env_var}api/resident/booking/approveBooking/${id}`)
        setToast({ show: true, type: "success", message: "Approved" })
        setTimeout(() => {
          window.location.href = '/amenitylist'
        }, 1500);
      
      }
      else if (value == 'reject') {
        const { data } = await axios.get(`${window.env_var}api/resident/booking/removeBooking/${id}`)
        setToast({ show: true, type: "success", message: "Denied" })
        setTimeout(() => {
          window.location.href = '/amenitylist'
        }, 1500);
      }
      setError(false)
    } catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
      setError(true)
    }
  }
  if(isError)
    return <ErrorScreen/>
  return (
    <div className="alacontainer">
      <div id="alaheadersection">
        <div class="alafirstheadersection">
          <div id="alalogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="alasociety"><label>Society</label></div>
          <div id="alaspace"></div>
          <div id="alanotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="alasetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="alalogoutbutton"> <button type="submit" className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></button></div>
        </div>
      </div>
      <div id="alasection">
        <div className='ALAname'>
          <img src="/images/societyicon.svg" alt="guard name" />
          <label>Society Name</label>
        </div>
        <div className='ALASimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='alabackgroundimg'>
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
      <Loader loading={loading}>
        <div className='ALAdisplay'>
          <label>Amenity Booking Approval</label>
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
              <div><label className='aladate'>Date: {dateTimeFormat(booking.date)}</label></div>
              <div><label className='alatime'>Time: {getTime(location.state.time)}</label></div>
            </div>
            <br></br>
            <br></br>
            {booking.status == false ? <>
              <button type="button" onClick={() => { approveBooking(booking._id, 'accept') }} className="ALAbtnApprove">APPROVE</button>
              <button type="button" onClick={() => { approveBooking(booking._id, 'reject') }} className="ALAbtnDeny">DENY</button></> : <Button type="button" onClick={() => { approveBooking(booking._id, 'reject') }} className="ALAbtnDeny">DENY</Button>}

            <br></br>
          </div>
        </div>
        </Loader>
      </div>
    </div>
  )
}

export default Approvallistamenity

