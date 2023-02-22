import React, {useEffect, useState} from 'react';
import "../SocietyModule/AddParkingSec.css";
import { Form } from 'react-bootstrap';
import SocietyHeader from './Utils/Societyheader';
import {checkSociety} from '../auth/Auth'
import { ToastMessage } from '../ToastMessage';
import ErrorScreen from '../../common/ErrorScreen';
import { Loader } from "../Loader";
import axios from "axios";
import { useLocation } from 'react-router-dom';
// import ErrorScreen from '../../common/ErrorScreen';
const AddGuestParkingSec = () => {
  const [toast, setToast] = useState({ show: false })
  const [parkingSection,setParkingSections] = useState({});
  const [block,setBlock] = useState([]);
  const location = useLocation();
  const [type,setType] = useState('add');
  const [loading, setLoading] = useState(true)
  const [isError,setError] = useState(false)

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      if(type=='edit')
      {
        
        const sendData = {
          id: location.state.id,
          block_id: document.getElementById('block_id').value,
          section: document.getElementById('section').value,
          community_id: localStorage.getItem('community_id'),
        }
        const {data} = await axios.post(`${window.env_var}api/guestparkingsection/update`,sendData);
        setToast({ show: true, type: "success", message: "Updated successfully" })
        setTimeout(() => {
          window.location.href='/viewguestparkingsection'
        }, 1500);
      }
      else
      {
        
        const sendData = {
          block_id: document.getElementById('block_id').value,
          section: document.getElementById('section').value,
          community_id: localStorage.getItem('community_id'),
        }
        const {data} = await axios.post(`${window.env_var}api/guestparkingsection/add`,sendData);
        setToast({ show: true, type: "success", message: "Added successfully" })
        setTimeout(() => {
          window.location.href='/viewguestparkingsection'
        }, 1500);
        // window.location.href='/viewparking'
      }
    } catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
    }
  }

  useEffect(()=>{
    getBlocks();
    if(checkSociety())
    {
      const config = {
        headers:{
          'x-access-token':localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/society/checkLogin`,config)
      .then(({data})=>{   
        if(location.state)
        {
          getParkingSectionDetails();
          setType(location.state.type);
        }
        else
        {
          // window.history.back(-1)
        }
      })
      .catch(err=>{
        localStorage.clear();
        window.location.href='/societylogin'
      }) 
      setLoading(false);
    }
    else
    {
      window.location.href='/'
    }
  },[])

  const getParkingSectionDetails=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/guestparkingsection/getAll/${ localStorage.getItem('community_id')}`)
      setParkingSections(data.data[0]);
      document.getElementById('block_id').value=data.data[0].block_id;
      
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const getBlocks=async()=>{
    try {
      const param = {
        community_id:localStorage.getItem('community_id')
      }
      const {data} = await axios.post(`${window.env_var}api/block/get`,param);
      setBlock(data.data.block);
      setError(false)
    } catch (error) {
      setError(true)
    }
  }
  if(isError)
  return <ErrorScreen/>
  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <SocietyHeader/>
      </div>
      <div id="societynamesection">
        <div className="AP_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <div className='vgpsidelinks'>
        
          <a href='/viewguestparkingsection' className='Viewpsec'>View Guest Parking Section</a><br/><br/>
          <a href='/addguestparkingsection' className='Addpsec'><b>Add Guest Parking Section</b></a><br/><br/>
        
        </div>
        <div className="AddGparking_sideimg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
      <Loader loading={loading}>
        <div className='APdisplay'>
          <label>{type=='edit'? 'Update':'Add'} Guest Parking Section</label>
        </div>
        <Form className='formclass'> 
          <div className="form-group row">
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-2 col-form-label ADN_label">Block</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select className="form-control input-lg ADDParkBor" id='block_id' >
                <option value={null} disabled selected>Select Block</option>
                {block.map(item=>{
                  return (
                    <option value={item.id}>{item.name}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div class="form-group form-group6 row">
            <label class="col-lg-2 col-form-label ADN_label">Name</label>
            <div class="col-lg-4">
              <input type="text" id="section" class="form-control input-lg ADDParkBor" name="New Parking" placeholder='Name' />
            </div>
          </div>
          <button type="submit" className="AP_Button"  onClick={(e)=>{handleSubmit(e)}}>{type=='edit'? 'Update':'Add'} Parking</button>
        </Form>
        </Loader>
      </div>
    </div>
  );
}

export default AddGuestParkingSec;
