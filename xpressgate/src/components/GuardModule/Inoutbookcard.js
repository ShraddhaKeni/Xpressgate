import React, { useState, useEffect } from 'react';
import './Inoutbookcard.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { checkGuard } from '../auth/Auth';
import GuardHeader from './Utils/GuardHeader';

const Inoutbookcard = () => {

  const [listData, setInOutData] = useState({})
  const [flats, setFlats] = useState([])
  const location = useLocation()
  const navigate = useNavigate()

  console.log(location.state)
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
      type:1
    }
    try {
      const { data } = await axios.post(`${window.env_var}api/inout/getone`, id);
      console.log(id);
      setInOutData(data.data)
      setFlats(data.data.flat_details)
    } catch (error) {
      console.log(error);
    }
  }

  const outEntry=async()=>{
    try {
      const sendData = {
        outtime:Date.now(),
        status:3,
        booking_id:location.state.id
      }
      const {data} = await axios.post(`${window.env_var}api/inout/addout`,sendData)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const dateConvert =(date)=>{
     const d = new Date(date)
     return (d.getDay()+18)+'/'+ (d.getMonth()+1)+'/'+d.getFullYear()
  } 
  const timeConvert =(date)=>{
    const d = new Date(date)
    return d.getHours()+':'+d.getMinutes()
  } 
 
  const handleSubmit = async(e,id)=>{
    e.preventDefault()
    try {
      const sendData = {
        outtime:Date.now(),
        status:2,
        booking_id:id
      }

      const {data} = await axios.post(`${window.env_var}api/inout/addout`,sendData)
      navigate('/inoutbook')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="inoutbookcardcontainer">
      <div id="headersection">
      <GuardHeader/>
      </div>
      <div id="guardnamesection">
        <div className='IOBC_GName'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>{localStorage.getItem('name')}</label>
        </div>
        <div className='IOBC_SImg'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='iobcbackgroundimg'>
        <div className= "IOBC_display">
          <label>In-out Book</label>
        </div>
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
              <div><label className='intine'>In-Time: {timeConvert(listData.intime)}</label></div>
              <div><label className='outtime'>Out-Time: {listData.outtime?dateConvert(listData.outtime):'N/A'}</label></div>
              <div><label className='noofpeople'>No of People: 1</label></div>
              <div><label className='vehicleno'>Vehicle No: MH-29-2901</label></div>
            </div>
            <br></br>
            {console.log(listData.status)}
            {listData.status==1? <button type="submit" onClick={(e)=>{handleSubmit(e,listData.booking_id)}} id='inout'  className="btnOut">Out</button>
              : <button type="button" onClick={()=>navigate('/inoutbook')} id='inout' className="btnOut">Back</button>
            }
           
            <br></br>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Inoutbookcard