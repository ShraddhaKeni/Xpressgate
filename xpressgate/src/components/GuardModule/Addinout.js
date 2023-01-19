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
        community_id: "632970d054edb049bcd0f0b4"
      }
      const { data } = await axios.post(`${window.env_var}api/block/get`, param)
      //console.log(data.data.block)
      setBlock(data.data.block)
    } catch (error) {
      console.log(error)
    }
  }

  const getFlats = async (e) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/flats/getList/${e.target.value}`)
      //console.log(data)
      setFlatNo(data.data.list)
    } catch (error) {
      console.log(error)
    }
  }

  const getResidents = async (e) => {
    try {
      const config = {
        headers:{'x-access-token':localStorage.getItem('accesstoken')},
      }
      const { data } = await axios.get(`${window.env_var}api/resident/getResidentByFlatId/${e.target.value}`,config)
      //setResidents(data.data.list)
    } catch (error) {
      console.log(error)
    }
  }

  const getDetails = async (e) => {
    try {
      if (visitortype.current.value == 2) {

        document.getElementById('fullvendor').classList.remove('select_visibility')
        document.getElementById('fulldailyhelp').classList.add('select_visibility')
        const { data } = await axios.get(`${window.env_var}api/vendor/getAll`)
        setVendor(data.data.vendors)
      } else if (visitortype.current.value == 3) {
        document.getElementById('fullvendor').classList.add('select_visibility')
        document.getElementById('fulldailyhelp').classList.remove('select_visibility')
        const { data } = await axios.get(`${window.env_var}api/admin/dailyhelp/getAll`)
        setDailyhelp(data.data.dailyhelp)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setToast({ show: true, type: "success", message: "Added Successfully" })
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
        allowed_by: localStorage.getItem('guard_id')
      }

      const { data } = await axios.post(`${window.env_var}api/inout/addbyguard`, sendData)
      console.log(data)
      setTimeout(() => {
        window.location.href='/inoutbook'
      }, 1500);
      // window.location.href = '/inoutbook'
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="aiocontainer">
      <div id="aiosection">
        <GuardHeader />
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

        <Form className='AIOformclass'>
        
          <div className="form-group row">
         
            <label className="col-lg-2 col-form-label ADN_label">Name</label>
            <div className="col-lg-4">
              <input type="text" className="form-control input-lg AIOBorder" id='name' name="addinoutname" placeholder="Name" value={details.name}></input>
            </div>
          </div>
          <div className="form-group row">
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-2 col-form-label ADN_label">Visitor Type</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select class="form-control input-lg AIOBorder" ref={visitortype} name="visitortype" placeholder="Visitor Type" id="visitortype" onChange={(e) => getDetails(e)}>
                <option value={1}>Guest</option>
                <option value={2}>Vendor</option>
                <option value={3}>Daily Helper</option>
              </select>
            </div>
          </div>
          <div className="form-group row" id='fullvendor'>
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-2 col-form-label ADN_label">Select Vendor</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select className="form-control input-lg AIOBorder" id="vendor" placeholder="Vendor">
                <option value="" selected disabled>Select Vendor</option>
                {vendor.map(item => {
                  return <option value={item._id}>{item.vendorName}</option>
                })}
              </select>
            </div>
          </div>
          <div className="form-group row" id='fulldailyhelp'>
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-2 col-form-label ADN_label">Select Daily Helper</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select className="form-control input-lg AIOBorder" id="dailyhelp" placeholder="Daily Helper">
                <option value="" selected disabled>Select Daily Helper</option>
                {dailyhelp.map(item => {
                  return <option value={item.id}>{item.serviceType}</option>
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-2 col-form-label ADN_label">Block</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select className="form-control input-lg AIOBorder" id='block' onChange={(e) => getFlats(e)}>
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
            <label className="col-lg-2 col-form-label ADN_label">Flat No.</label>
            <div className="col-lg-4">
              <select className="form-control input-lg AIOBorder" id="flatno" placeholder="Flat No." onChange={(e) => getResidents(e)}>
                <option value="" selected disabled>Select Flat</option>
                {flatno.map(item => {
                  return <option value={item._id}>{item.flat_number}</option>
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label ADN_label">Resident</label>
            <div className="col-lg-4">
              <select className="form-control input-lg AIOBorder" id="resident" placeholder="Resident">
                <option value="" selected disabled>Select Resident</option>
                {flatno.map(item => {
                  return <option value={item._id}>{item.firstname}{item.lastname}</option>
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label ADN_label">Contact No.</label>
            <div className="col-lg-4">
              <input type="text" className="form-control input-lg AIOBorder" id='contact_no' name="ContactNo" placeholder="Contact No." value={details.contact_no} maxLength="10"></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label ADN_label">Date</label>
            <div className="col-lg-4">
              <input type="date" className="form-control input-lg AIOBorder" id='date' name="date" placeholder="Date" value={details.date}></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label ADN_label">In Time</label>
            <div className="col-lg-4">
              <input type="time" className="form-control input-lg AIOBorder" id='intime' name="intime" placeholder=" In Time" value={details.intime} ></input>
            </div>
          </div>
          <div className="form-group row hidden">
            <label className="col-lg-2 col-form-label ADN_label">Status</label>
            <div className="col-lg-4">
              <select class="form-control input-lg AIOBorder" id='status' placeholder="Status" disabled>
                <option value={1} selected>In</option>
                <option value={2}>Out</option>
              </select>
            </div>
          </div>

          <button type="submit" onClick={(e) => { handleSubmit(e) }} className="btnInOut" on>Add In Out</button>
         
        </Form>
        {/* </Loader> */}
      </div>
    </div>
  )
}

export default Addinout

