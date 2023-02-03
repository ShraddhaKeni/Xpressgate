import React, {useEffect, useState} from 'react';
import "../SocietyModule/AddParkingSec.css";
import LogOut from './Utils/LogOut';
import axios from "axios";
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import SocietyHeader from './Utils/Societyheader';
import {checkSociety} from '../auth/Auth'
import { Loader } from "../Loader";
import { ToastMessage } from '../ToastMessage';
import ErrorScreen from '../../common/ErrorScreen';
const AddParkingSec = () => {
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
          section: document.getElementById('section').value
        }
        const {data} = await axios.post(`${window.env_var}api/parkingsection/update`,sendData);
        setToast({ show: true, type: "success", message: "Updated successfully" })
        setTimeout(() => {
          window.location.href='/viewparking'
        }, 1500);
      }
      else
      {
        
        const sendData = {
          block_id: document.getElementById('block_id').value,
          section: document.getElementById('section').value
        }
        const {data} = await axios.post(`${window.env_var}api/parkingsection/post`,sendData);
        setToast({ show: true, type: "success", message: "Added successfully" })
        setTimeout(() => {
          window.location.href='/viewparking'
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
      const {data} = await axios.get(`${window.env_var}api/parkingsection/getOne/${location.state.id}`)
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
        
        <div className='AddParksidelinks'>
        <a href='/vehiclemanagement' className='VLSECLink'>Vehicle List</a><br/><br/>
          <a href='/viewparking' className='Viewpsec'>View Parking Section</a><br/><br/>
          <a href='/addparking' className='Addpsec'><b>{type=='edit'? 'Update':'Add'} Parking Section</b></a><br/><br/>
          <a href='/addvehicle' className='apssec'>Assign Parking Section</a>
        </div>
        <div className="AP_sideimg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
      <Loader loading={loading}>
        <div className='APdisplay'>
          <label>{type=='edit'?'Update':'Add'} Parking Section</label>
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
              <input type="text" id="section" class="form-control input-lg ADDParkBor" defaultValue={parkingSection.section?parkingSection.section:''} name="New Parking" placeholder='Name' />
            </div>
          </div>
          <button type="submit" onClick={(e)=>{handleSubmit(e)}} className="AP_Button">{type=='edit'?'Update':'Add'} Parking</button>
        </Form>
        </Loader>
      </div>
    </div>
  );
}

export default AddParkingSec;
