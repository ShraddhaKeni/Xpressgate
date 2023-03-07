
import './GuestManagementcard.css';
import axios from 'axios';
import Societyheader from './Utils/Societyheader'
import { Loader } from "../Loader";
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { checkSociety } from '../auth/Auth';

const GuestManagementcard = () => {
  const [guestData, setGuestdata] = useState({})
  const [flats, setFlats] = useState([])
  const [loading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const location = useLocation()
  console.log(location.state.id)
  useEffect(() => {
    if (checkSociety()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/guard/checkLogin`, config)
        .then(({ data }) => {
          getData()
        })
        .catch(err => {
          localStorage.clear();
          window.location.href = '/guardLogin'
        })

    } else {
      window.location.href = '/'
    }

  }, [])

  const getData = async () => {
    let id = {
      booking_id: location.state.id,
      type: 1
    }
    try {
      const { data } = await axios.post(`${window.env_var}api/inout/getone`, id);
      console.log(data)
      setGuestdata(data.data)
      setFlats(data.data.flat_details)
      setLoading(false)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const dateConvert = (date) => {
    const d = new Date(date)
    //console.log(d)
    return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
  }
  const timeConvert = (date) => {
    const d = new Date(date)
    return d.getHours() + ':' + d.getMinutes()
  }

  return (
    <div className="guestcardcontainer">
      <div id="headersection">
        <Societyheader />
      </div>
      <div id="guestnamesection">
        <div className='guest_GName'>
          <img src="/images/societyicon.svg" alt="guard name" />
          <label>Society Name</label>
        </div>
        <div className='guest_SImg'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='iobcbackgroundimg'>
        <div className="guest_display">
          <label>In-Out Book</label>
        </div>

        {/* <div className="row row-cols-1 row-cols-md-1 g-4 fullcardscss"> */}
        <div className="col">
          <div className="guestcard">
            <br></br>
            <label className="nameguestlabel"></label>
            <div className='profguestclass'>
            </div>
            <br></br>
            <div className='flatguestclass'>
              <label>Flat No</label>
              {flats.map((items) => {
                return <div className='flatnodisplay'>{items.flat_no}, {items.block_name}</div>
              })}
            </div>
            <br></br>
            <div><label className='guestallowedclass'>Allowed by </label></div>
            <br></br>
            <div className='guestdetailsclass'>
              <div><label className='guestdate'>Date:{dateConvert(guestData.intime)}</label></div>
              <div><label className='guestintime'>In-Time:{timeConvert(guestData.intime)} </label></div>
              <div><label className='guestouttime'>Out-Time:{guestData.outtime ? timeConvert(guestData.outtime) : 'N/A'} </label></div>
              {/* <div><label className='noofpeople'>No of People: 1</label></div> */}
              <div><label className='guestvehicleno'>Vehicle No:{guestData.vehicle_no ? guestData.vehicle_no : 'N/A'}</label></div>
              <div><label className='parking'>Parking Section:{guestData.parking_section_details}</label></div>
              <div><label className='allotedparking'>Alloted Parking Time:{guestData.parking_time}</label></div>
            </div>
            <br></br>

            {/* <button type="submit" id='guestbtnid' className="btnGuestOut">Out</button> */}
            <br></br>
          </div>
        </div>
        {/* </div> */}

      </div>
    </div>
  )
}

export default GuestManagementcard