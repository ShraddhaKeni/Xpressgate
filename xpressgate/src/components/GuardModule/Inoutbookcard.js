import React, { useState, useEffect } from 'react';
import './Inoutbookcard.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { checkGuard } from '../auth/Auth';
import GuardHeader from './Utils/GuardHeader';
import { Loader } from "../Loader";
import { ToastMessage } from '../ToastMessage';
import ErrorScreen from '../../common/ErrorScreen';
import GuardMobileSidebar from '../GuardMobileSidebar';
const Inoutbookcard = () => {
  const [toast, setToast] = useState({ show: false })
  const [loading, setLoading] = useState(true)
  const [listData, setInOutData] = useState({})
  const [flats, setFlats] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const [isError, setError] = useState(false)
  const [filterArr, setFilter] = useState([])
  const [menu, setMenuOpen] = useState(false)
  const [parkingHours, setParkingHours] = useState("");

  const [parkingSections, setParkingSections] = useState(false);

  const [currentSection, setCurrentSection] = useState();
  const [currentParkingTime, setCurrentParkingTime] = useState();


  const [timeSlots] = useState([
    { time: 30, dTime: "30 Min" },
    { time: 60, dTime: "1 Hour" },
    { time: 90, dTime: "1.5 Hours" },
    { time: 120, dTime: "2 Hours" },
    { time: 150, dTime: "2.5 Hours" },
    { time: 180, dTime: "3 Hours" },

  ])

  useEffect(() => {
    if (checkGuard()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/guard/checkLogin`, config)
        .then(({ data }) => {
          getData()
          getParkingSections();
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
      setInOutData(data.data)

      if (listData.outtime) {
        var duration = moment.duration(moment(listData.outtime).diff(moment(listData.intime)));
        console.log(duration);
        let hours = duration.asHours() ? duration.asHours().toFixed(0) + " Hrs" : ""
        var minutes = hours + duration.asMinutes() ? duration.asMinutes().toFixed(0) + " Mins" : ""
        setParkingHours(minutes);
      }

      setFlats(data.data.flat_details)
      setLoading(false)
      setError(false)
    } catch (error) {
      setError(true)
      console.log(error);
    }
  }

  const getParkingSections = async () => {

    try {
      const { data } = await axios.get(`${window.env_var}api/guestparkingsection/getAll/${localStorage.getItem("community_id")}`);
      setParkingSections(data.data)
      setLoading(false)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const outEntry = async () => {
    try {
      const sendData = {
        outtime: Date.now(),
        status: 3,
        booking_id: location.state.id
      }
      const { data } = await axios.post(`${window.env_var}api/inout/addout`, sendData)
    } catch (error) {
      console.log(error)
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

  const handleSubmit = async (e, id) => {
    e.preventDefault()
    try {

      let sendData = {
        outtime: Date.now(),
        status: 2,
        booking_id: id,

        parkgin_time: document.getElementById("parkingtime").value
      }

      if (document.getElementById("parkingsection")?.value) {
        sendData = { ...sendData, parking_section: document.getElementById("parkingsection").value, }
      }

      console.log(sendData);
      const { data } = await axios.post(`${window.env_var}api/inout/addout`, sendData)
      setError(false)
      setToast({ show: true, type: "success", message: "Exited successfully" })
      setTimeout(() => {
        navigate('/inoutbook')
      }, 1500);
      // 
    } catch (error) {
      console.log(error)
      //setError(true)
    }
  }
  const deny = async () => {
    window.location.href = "/inoutbook"


  }

  if (isError)
    return <ErrorScreen />


  return (
    <div className="inoutbookcardcontainer">
      <div id="headersection">
        <GuardHeader onMenuClick={() => {
          setMenuOpen(true)
        }} />
      </div>
      <div id="guardnamesection">
        <div className='IOBC_GName'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>{localStorage.getItem('name')}</label>
        </div>
        <div className='IOBC_SImg'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='Iobcbackgroundimg'>
        <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <div className="IOBC_display">
          <label>In-Out Book</label>
        </div>
        <Loader loading={loading}>
          {/* <div className="row row-cols-1 row-cols-md-1 g-4 fullcardscss"> */}
          <div className="col">
            <div className="inoutbookcard">
              <br></br>
              <label className="namelabel">{listData.FirstName}</label>
              <div className='profclass'>
                {listData.type == '1' ? 'Guest' : listData.type == '2' ? 'Vendor' : 'Daily Helper'}</div>
              <br></br>
              <div className='flatclass'>
                <label>Flat No</label>
                {flats.map((items) => {
                  return <div className='flatnodisplay'>{items.flat_no}, {items.block_name}</div>
                })}
              </div>
              <br></br>
              <div><label className='inbcallowedclass'>Allowed by {listData.allowed_by}</label></div>
              <br></br>
              <div className='detailsclass'>
                <div><label className='date'>Date:{dateConvert(listData.intime)}</label></div>
                <div><label className='intime'>In-Time: {timeConvert(listData.intime)}</label></div>
                <div><label className='outtime'>Out-Time: {listData.outtime ? timeConvert(listData.outtime) : 'N/A'}</label></div>
                {/* <div><label className='noofpeople'>No of People: 1</label></div> */}
                <div><label className='vehicleno'>Vehicle No: {listData.vehicle_no ? listData.vehicle_no : 'N/A'}</label></div>
                <div><label className='vehicleno'>Parking Section: {listData.parking_section_details ? listData.parking_section_details : 'N/A'}</label></div>

                {listData.outtime && <>
                  <div><label className='vehicleno'>Parking Time: {parkingHours ? parkingHours : 'N/A'}</label></div>
                </>
                }

                {!listData.outtime && <>

                  <label for="parkingtime" className='ParkingSec'>Parking Time: </label><br />
                  <select id="parkingtime" className='selectInput' name='parking_time' >

                    <option disabled>Select Parking Time</option>
                    {timeSlots.map(slot => {
                      return <option value={slot.time}>{slot.dTime}</option>
                    })
                    }
                  </select>
                </>

                }



              </div>

              <br></br>

              {listData.status == 1 ? <button type="submit" onClick={(e) => { handleSubmit(e, listData.booking_id) }} id='inout' className="btnOut">Out</button>
                : <button type="button" onClick={() => { deny() }} id='inout' className="btnOut">Back</button>
              }

              <br></br>
            </div>
          </div>
          {/* </div> */}
        </Loader>
      </div>
      <GuardMobileSidebar open={menu} onHide={() => setMenuOpen(false)} />

    </div>
  )
}

export default Inoutbookcard