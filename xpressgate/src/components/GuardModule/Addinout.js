import '../GuardModule/Addinout.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import GuardHeader from './Utils/GuardHeader';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CompressOutlined } from '@mui/icons-material';
import { getBlocks } from '../SocietyModule/common/common';
import { checkGuard } from '../auth/Auth';
import './Addinout.css';
import { useNavigate } from 'react-router-dom'

const Addinout = () => {
  const [details, setDetails] = useState({})
  const [block, setBlock] = useState([])
  const [visitor_type, setVisitorType] = useState([])
  const [flatno, setFlatNo] = useState([])

  // let blockid = document.getElementById('item').value


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
    } else {
      window.location.href = '/'
    }

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

  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
     
      let date = new Date(document.getElementById('date').value+'T'+document.getElementById('intime').value+':00').toISOString()
      const sendData = {
        firstname:document.getElementById('name').value,
        type:document.getElementById('visitortype').value,
        flat_id:document.getElementById('flatno').value,
        mobileno:document.getElementById('contact_no').value,
        intime: date,
        status:document.getElementById('status').value,
        bookedID : 1,
        community_id: "632970d054edb049bcd0f0b4"
      }

      const {data} = await axios.post(`${window.env_var}api/inout/add`,sendData)
      window.location.href='/inoutbook'
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
          <label>Guard Name</label>
        </div>
        <div className='aiosideimage'>
          <img src="/images/sideimage.svg" alt="guard sideimage" />
        </div>
      </div>
      <div className='aiobackgroundimg'>
        <div className='aiodisplay'>
          <label>Add In Out</label>
        </div>
        <Form className='formclass'>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">Name</label>
            <div className="col-lg-4">
              <input type="text" className="form-control input-lg AIOBorder" id='name' name="addinoutname" placeholder="Name" value={details.name}></input>
            </div>
          </div>
          <div className="form-group row">
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-2 col-form-label aiolabelsize">Visitor Type</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select class="form-control input-lg AIOBorder" name="visitortype" placeholder="Visitor Type" id="visitortype">
                <option value={1}>Guest</option>
                <option value={2}>Vendor</option>
                <option value={3}>Daily Helper</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-2 col-form-label aiolabelsize">Block</label>
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
            <label className="col-lg-2 col-form-label aiolabelsize">Flat No.</label>
            <div className="col-lg-4">
              <select className="form-control input-lg AIOBorder" id="flatno" placeholder="Flat No.">
                <option value="" selected disabled>Select Flat</option>
                {flatno.map(item => {
                  return <option value={item._id}>{item.flat_number}</option>
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">Contact No.</label>
            <div className="col-lg-4">
              <input type="text" className="form-control input-lg AIOBorder" id='contact_no' name="ContactNo" placeholder="Contact No." value={details.contact_no} maxLength="10"></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">Date</label>
            <div className="col-lg-4">
              <input type="date" className="form-control input-lg AIOBorder" id='date' name="date" placeholder="Date" value={details.date}></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">In Time</label>
            <div className="col-lg-4">
              <input type="time" className="form-control input-lg AIOBorder" id='intime' name="intime" placeholder=" In Time" value={details.intime} ></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">Status</label>
            <div className="col-lg-4">
              <select class="form-control input-lg AIOBorder" id='status' placeholder="Status">
                <option value={1}>In</option>
                <option value={2}>Out</option>
              </select>
            </div>
          </div>

          <button type="submit" onClick={(e) => { handleSubmit(e) }} className="btnInOut" on>Add In Out</button>
        </Form>

      </div>
    </div>
  )
}

export default Addinout

