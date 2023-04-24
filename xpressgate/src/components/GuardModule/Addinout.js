import '../GuardModule/Addinout.css';
import { Form } from 'react-bootstrap';
import GuardHeader from './Utils/GuardHeader';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { checkGuard } from '../auth/Auth';
import './Addinout.css';
import { useNavigate } from 'react-router-dom'
import { Loader } from "../Loader";
import { ToastMessage } from '../ToastMessage';
import ErrorScreen from '../../common/ErrorScreen';
import GuardMobileSidebar from '../GuardMobileSidebar';
const Addinout = () => {
  const [toast, setToast] = useState({ show: false })
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState({})
  const [block, setBlock] = useState([])
  const [visitor_type, setVisitorType] = useState([])
  const [flatno, setFlatNo] = useState([])
  const [vendor, setVendor] = useState([])
  const [dailyhelp, setDailyhelp] = useState([])
  const [residents, setResidents] = useState([])
  const [isError, setError] = useState(false)
  const [menu, setMenuOpen] = useState(false)

  const [parkingSections, setParkingSections] = useState([]);

  const [timeSlots] = useState([
    { time: 30, dTime: "30 Min" },
    { time: 60, dTime: "1 Hour" },
    { time: 90, dTime: "1.5 Hours" },
    { time: 120, dTime: "2 Hours" },
    { time: 150, dTime: "2.5 Hours" },
    { time: 180, dTime: "3 Hours" },

  ])

  // let blockid = document.getElementById('item').value
  const visitortype = useRef([])

  useEffect(() => {
    getBlocks();
    if (checkGuard()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/guard/checkLogin`, config)
        .then(({ data }) => {
          getBlocks()
          getParkingSections();
        })
        .catch(err => {
          localStorage.clear();
          window.location.href = '/guardLogin'
        })
      setLoading(false);
    } else {
      window.location.href = '/'
    }
    document.getElementById('fullvendor').classList.add('select_visibility')
    document.getElementById('fulldailyhelp').classList.add('select_visibility')
  }, [])
  const getBlocks = async (e) => {
    try {
      const param = {
        community_id: localStorage.getItem('community_id')
      }
      const { data } = await axios.post(`${window.env_var}api/block/get`, param)
   
      setBlock(data.data.block)
      setError(false)
    } catch (error) {
      setError(true)
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

  const getFlats = async (e) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/flats/getList/${e.target.value}`)
   
      setFlatNo(data.data.list)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const getResidents = async (e) => {
    try {
      const config = {
        headers: { 'x-access-token': localStorage.getItem('accesstoken') },
      }
      const { data } = await axios.get(`${window.env_var}api/resident/getResidentByFlatId/${e.target.value}`, config)
  
      setResidents(data.data)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const getDetails = async (e) => {
    try {
      if (visitortype.current.value == 2) {

        document.getElementById('fullvendor').classList.remove('select_visibility')
        document.getElementById('fulldailyhelp').classList.add('select_visibility')
        const { data } = await axios.get(`${window.env_var}api/vendor/getAll`)
        setVendor(data.data.vendors)
        setError(false)
      } else if (visitortype.current.value == 3) {
        document.getElementById('fullvendor').classList.add('select_visibility')
        document.getElementById('fulldailyhelp').classList.remove('select_visibility')
        const { data } = await axios.get(`${window.env_var}api/admin/dailyhelp/getAll`)
        setDailyhelp(data.data.dailyhelp)
        setError(false)
      }

    } catch (error) {
      setError(true)
    }
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      let date = new Date(document.getElementById('date').value + 'T' + document.getElementById('intime').value + ':00').toISOString()
      const sendData = {
        firstname: document.getElementById('name').value,
        type: document.getElementById('visitortype').value,
        flat_id: document.getElementById('flatno').value,
        mobileno: document.getElementById('contact_no').value,
        intime: date,
        status: document.getElementById('status').value,
        bookedID: 1,
        community_id: localStorage.getItem('community_id'),
        vendor_id: document.getElementById('vendor').value,
        serviceType: document.getElementById('dailyhelp').value,
        residentID: document.getElementById('resident').value,
        allowed_by: localStorage.getItem('guard_id'),
        vehicle_no: document.getElementById('veh_id').value,
        parking_section: document.getElementById('parkingsection').value,
        parking_time: document.getElementById('parkingtime').value
      }

      const { data } = await axios.post(`${window.env_var}api/inout/addbyguard`, sendData)
      setToast({ show: true, type: "success", message: "Added Successfully" })
      setTimeout(() => {
        window.location.href = '/inoutbook'
      }, 1500);
    } catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
    }
  }

  if (isError)
    return <ErrorScreen />

  return (
    <div className="aiocontainer">
      <div id="aiosection">
        <GuardHeader onMenuClick={() => {
          setMenuOpen(true)
        }} />
      </div>
      <div id="aiosocietysection">
        <div className='aiosocietyname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>{localStorage.getItem('name')}</label>
        </div>
        <div className='aiosideimage'>
          <img src="/images/sideimage.svg" alt="guard sideimage" />
        </div>
      </div>
      <div className='aiobackgroundimg'>
        <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <div className='aiodisplay'>
          <label>Add In Out</label>
        </div>
        {/* <Loader loading={loading}> */}

        <Form className='AIOformclass' onSubmit={(e) => { handleSubmit(e) }} >

          <div className="form-group row">

            <label className="col-lg-3 col-form-label ADN_label">Name</label>
            <div className="col-lg-4">
              <input required type="text" className="form-control input-lg AIOBorder" id='name' name="addinoutname" placeholder="Name" value={details.name}></input>
            </div>
          </div>
          <div className="form-group row">
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-3 col-form-label ADN_label">Visitor Type</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select required class="form-control input-lg AIOBorder" ref={visitortype} name="visitortype" placeholder="Visitor Type" id="visitortype" onChange={(e) => getDetails(e)}>
                <option value={1}>Guest</option>
                <option value={2}>Vendor</option>
                <option value={3}>Daily Helper</option>
              </select>
            </div>
          </div>
          <div className="form-group row" id='fullvendor'>
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-3 col-form-label ADN_label">Select Vendor</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select required className="form-control input-lg AIOBorder" id="vendor" placeholder="Vendor">
                <option value="" selected disabled>Select Vendor</option>
                {vendor.map(item => {
                  return <option value={item._id}>{item.vendorName}</option>
                })}
              </select>
            </div>
          </div>
          <div className="form-group row" id='fulldailyhelp'>
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-3 col-form-label ADN_label">Select Daily Helper</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select required className="form-control input-lg AIOBorder" id="dailyhelp" placeholder="Daily Helper">
                <option value="" selected disabled>Select Daily Helper</option>
                {dailyhelp.map(item => {
                  return <option value={item.id}>{item.serviceType}</option>
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-3 col-form-label ADN_label">Block</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select required className="form-control input-lg AIOBorder" id='block' onChange={(e) => getFlats(e)}>
                <option value={null} disabled selected>Block</option>
                {block.map(item => {
                  return (
                    <option value={item.id}>{item.name}</option>
                  )
                })}

              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label ADN_label">Flat No.</label>
            <div className="col-lg-4">
              <select required className="form-control input-lg AIOBorder" id="flatno" placeholder="Flat No." onChange={(e) => getResidents(e)}>
                <option value="" selected disabled>Select Flat</option>
                {flatno.map(item => {
                  return <option value={item._id}>{item.flat_number}</option>
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label ADN_label">Resident</label>
            <div className="col-lg-4">
              <select required className="form-control input-lg AIOBorder" id="resident" placeholder="Resident">
                <option value="" selected disabled>Select Resident</option>
                {residents.map(item => {
                  return <option value={item.resident_id}>{item.firstname}{item.lastname}</option>
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label ADN_label">Contact No.</label>
            <div className="col-lg-4">
              <input required type="text" className="form-control input-lg AIOBorder" id='contact_no' name="ContactNo" placeholder="Contact No." value={details.contact_no} maxLength="10"></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label ADN_label">Date</label>
            <div className="col-lg-4">
              <input required type="date" className="form-control input-lg AIOBorder" id='date' name="date" placeholder="Date" value={details.date}></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label ADN_label">In Time</label>
            <div className="col-lg-4">
              <input required type="time" className="form-control input-lg AIOBorder" id='intime' name="intime" placeholder=" In Time" value={details.intime} ></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label ADN_label">Vehicle No:</label>
            <div className="col-lg-4">
              <input required type="text" className="form-control input-lg AIOBorder" id='veh_id' name="veh_id" placeholder="Enter Vehicle No" value={details.intime} ></input>
            </div>
          </div>


          {!details.outtime && <>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label ADN_label">Parking Section</label>
              <div className="col-lg-4">
                <select required className="form-control input-lg AIOBorder" id="parkingsection" placeholder="Parking Sections">
                  <option disabled value={""} selected={true}>Select Parking Section</option>
                  {parkingSections.map(slot => {
                    return <option value={slot._id}>{slot.section}</option>
                  })
                  }
                </select>
              </div>
            </div>

          </>

          }

          {!details.outtime && <>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label ADN_label">Parking Time</label>
              <div className="col-lg-4">
                <select required className="form-control input-lg AIOBorder" id="parkingtime" placeholder="Parking Time">
                  <option disabled selected={true}>Select Parking Time</option>
                  {timeSlots.map(slot => {
                    return <option value={slot.time}>{slot.dTime}</option>
                  })
                  }
                </select>
              </div>
            </div>
          </>
          }
          <div className="form-group row hidden">
            <label className="col-lg-3 col-form-label ADN_label">Status</label>
            <div className="col-lg-4">
              <select required class="form-control input-lg AIOBorder" id='status' placeholder="Status" disabled>
                <option value={1} selected>In</option>
                <option value={2}>Out</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btnInOut" onClick={(e) => handleSubmit(e)} on>Add In Out</button>
          <br />
        </Form>
        {/* </Loader> */}
        <br />
      </div>
      <GuardMobileSidebar open={menu} onHide={() => setMenuOpen(false)} />

    </div>
  )
}

export default Addinout

