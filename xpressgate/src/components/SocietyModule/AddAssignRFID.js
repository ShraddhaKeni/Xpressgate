import React, { useEffect, useRef, useState } from "react";
import "./Addmaintenancebill.css";
import LogOut from './Utils/LogOut'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from "axios";
import { checkSociety } from '../auth/Auth'
import SocietyHeader from './Utils/Societyheader'
import { mobileValidation } from "../auth/validation";
import { useLocation } from "react-router-dom";
import { Loader } from "../Loader";
import ErrorScreen from "../../common/ErrorScreen";
import { ToastMessage } from '../ToastMessage';

const AddAssignRFID = () => {
  const [loading, setLoading] = useState(false)
  const [blocks, setBlocks] = useState([])
  const [flats, setFlats] = useState([])
  const [resident, setResident] = useState({})
  const [toast, setToast] = useState({ show: false })
  const [type, setType] = useState('add')
  const [isError, setError] = useState(false)
  const location = useLocation();
  const [getdata, setGetData] = useState([]);

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
      .then (async({ data })=>{   
      
        if(location.state)
        {

           await getFlatsUpdate(location.state.id.block_id);
           await getResidentUpdate(location.state.id._id);
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
    // document.getElementById('blockid').value = location.state.id.block_id;
  },[])

  const getBlocks = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/block/blockList`)
      setBlocks(data.data.block)
      // if (location.state)
      // document.getElementById('blockid').value = location.state.id.block_id;
      
    } catch (error) {
      console.log(error)
    }
  }

  const getFlats = async (e) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/flats/getList/${e.target.value}`)
      setFlats(data.data.list)
    } catch (error) {
      console.log(error)
    }
  }

  const getFlatsUpdate = async (e) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/flats/getList/${e}`);
      setFlats(data.data.list);
    
      console.log(e)
      console.log(data.data.list)
     
      setError(false)
    } catch (error) {
      setError(true)
    }
  }


  const getResidentname = async (e) => {
    try {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      const { data } = await axios.get(`${window.env_var}api/resident/getResidentByFlatId/${e.target.value}`, config)
      setResident(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getResidentUpdate = async (e) => {
    try {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      const { data } = await axios.get(`${window.env_var}api/resident/getResidentByFlatId/${e}`, config)
      setResident(data.data)
      document.getElementById('blockid').value = location.state.id.block_id;
      document.getElementById('flatid').value = location.state.id.flat_id;
      document.getElementById('residentid').value = e
      document.getElementById('RFID').value = location.state.id.rfid
    } catch (error) {
      console.log(error)
    }
  }


  const handleclick = async (e) => {
    e.preventDefault();
    try {
      if (type == 'add') {
        let submitData = {
      
          resident_id: document.getElementById('residentid').value,
          rfid: document.getElementById('RFID').value,
        }
        const saveData = await axios.post(`${window.env_var}api/resident/addrfid`, submitData)
        //console.log(saveData)
        setToast({ show: true, type: "success", message: "Data added Successfully" })
        setTimeout(() => {
          window.location.href = '/assignrfid'
        }, 1500);
     

      } else {
        const sendData = {
          id: location.state.id,
          resident_id: document.getElementById('residentid').value,
          rfid: document.getElementById('RFID').value,

        }
        const { data } = await axios.post(`${window.env_var}api/resident/addrfid`, sendData);
        setToast({ show: true, type: "success", message: "Updated successfully" })
        setTimeout(() => {
          window.location.href = '/assignrfid'
        }, 1500);
      }
    }
    catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
    }
  }

  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <SocietyHeader />
      </div>
      <div id="societynamesection">
        <div className="AEN_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <div class="AssignSideLink">
          <a href="/assignrfid" class="AMSLList">Assign RFID List</a><br /><br />
          <a href="/addrfid" class="AddUpdateLink"><b>{type == 'edit' ? 'Update RFID' : 'Add RFID'}</b></a>
        </div>
        <div className="AEN_sideimage">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addmaintenancebackgroundimg">
        <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <div className="AEN_display">
          <label>{type == 'edit' ? 'Update RFID' : 'Add RFID'}</label>
        </div>
        <Loader loading={loading}>
          <Form className='formclass'>
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label">Block</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" id="blockid" name="Type" type="text" onChange={(e) => { getFlats(e) }} >
                  <option value={null} selected disabled>Select Block</option>
                   {blocks.map((item) => {
                    return (
                      <option value={item._id} >{item.block}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label">Flat</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" id="flatid" name="Type" type="text" onChange={(e) => { getResidentname(e) }} >
                  <option value={null} selected disabled>Select Flat</option>
                  {flats.map((item) => {
                    return (
                      <option value={item._id} >{item.flat_number}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label">Resident</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" id="residentid" type="text">
                  <option value={null} selected disabled>Select Resident</option>
                  {flats.map(item => {
                    return <option value={item.resident_id}>{item.firstname}{item.lastname}</option>
                  })}
                </select>
              </div>
            </div>
            <div class="form-group form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label ">RFID</label>
              <div class="col-lg-4">
                <input type="text" id="RFID" name="RFID" defaultValue={getdata.rfid ? getdata.rfid : ''} className="form-control input-lg input-lg1 AEN_border" placeholder="Enter RFID"></input>
              </div>
            </div>
          
          
            <button type="submit" className="AMM_Add_btn" onClick={(e) => handleclick(e)}>{type == 'edit' ? 'Update RFID' : 'Add RFID'}</button>
          </Form>
        </Loader>

      </div>
    </div>
  );
};

export default AddAssignRFID;
