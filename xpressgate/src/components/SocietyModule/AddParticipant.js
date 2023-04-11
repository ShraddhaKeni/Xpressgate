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

const AddParticipant = () => {
  const [loading, setLoading] = useState(false)
  const [blocks, setBlocks] = useState([])
  const [flats, setFlats] = useState([])
  const [resident, setResident] = useState({})
  const [toast, setToast] = useState({ show: false })
  const [type, setType] = useState('add')
  const [isError, setError] = useState(false)
  const location = useLocation();
  const [allprograms, setAllPrograms] = useState([]);

  useEffect(() => {
    if (checkSociety()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/society/checkLogin`, config)
        .then(async ({ data }) => {
          if (location.state) {
            getAllProgram();
            await getBlocks();
           
    
            setType(location.state.type);
          } else {
            getBlocks();
          }

        })
        .catch(err => {
          localStorage.clear();
          window.location.href = '/societylogin'
        })
      setLoading(false);
    }
    else {
      window.location.href = '/'
    }

  }, [])

  const getBlocks = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/block/blockList`)
      setBlocks(data.data.block)
    
      
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
  const getResidentDetails = async (e) => {
    try {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      const { data } = await axios.get(`${window.env_var}api/resident/getone/${e.target.value}`, config)
      console.log(data)
   document.getElementById('phoneno').value = data.data.mobileno
   document.getElementById('email').value = data.data.email
   document.getElementById('resident_name').value = data.data.firstname + ' ' + data.data.lastname
  
    } catch (error) {
      console.log(error)
    }
  }



  const getAllProgram = async () => {
    try {
    
      const { data } = await axios.get(`${window.env_var}api/partner/programs`)
      console.log()
      await setAllPrograms(data.data)
    
      document.getElementById('programname').value = location.state.id;
    
      
      setError(false)
    } catch (error) {
      setError(true)
    }
  }


  const handleclick = async (e) => {
    e.preventDefault();
    try {
      
        let submitData = {
    
          program: document.getElementById('programname').value,
      
        
          name: document.getElementById('resident_name').value,
          phone: document.getElementById('phoneno').value,
          email: document.getElementById('email').value,
          address: document.getElementById('address').value,
          occupation: document.getElementById('occupation').value,

        }
        const saveData = await axios.post(`${window.env_var}api/partner/students`, submitData)
        console.log(saveData)
        setToast({ show: true, type: "success", message: "Data added Successfully" })
        setTimeout(() => {
          window.location.href = '/programlist'
        }, 1500);
      

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
      
        <div className="ParticipantsideImg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addmaintenancebackgroundimg">
        <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <div className="AEN_display">
          <label>Add Participants</label>
        </div>
        <Loader loading={loading}>
          <Form className='formclass'>
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label">Program Name</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" id="programname" name="Type" type="text" >
                  <option value={null} selected disabled>Select Program</option>
                  {allprograms.map((item) => {
                    return (
                      <option value={item._id}>{item.name}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label">Block</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" id="blockid" name="Type" type="text"  onChange={(e) => { getFlats(e) }} >
                  <option value={null} selected disabled>Select Block</option>
                  {blocks.map((item) => {
                    return (
                      <option value={item._id}>{item.block}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label">Flat</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" id="flatid" name="Type" type="text" onChange={(e) => { getResidentname(e) }}>
                  <option value={null} selected disabled>Select Flat</option>
                  {flats.map((item) => {
                    return (
                      <option value={item._id}>{item.flat_number}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label">Resident Name</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" id="residentid" type="text" onChange={(e) => { getResidentDetails(e) }}>
                  <option value={null} selected disabled>Select Resident</option>
                  {flats.map(item => {
                    return <option value={item.resident_id}>{item.firstname}{item.lastname}</option>
                  })}
                </select>
                <input type="hidden" value=" " id="resident_name"></input>
              </div>
            </div>
            <div class="form-group form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label ">Phone No</label>
              <div class="col-lg-4">
                <input type="number" id="phoneno" name="phoneno" className="form-control input-lg input-lg1 AEN_border" placeholder="Enter Phone Number"></input>
              </div>
            </div>
            <div class="form-group form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label ">Email</label>
              <div class="col-lg-4">
                <input type="email" id="email" name="email" className="form-control input-lg input-lg1 AEN_border" placeholder="Enter Email"></input>
              </div>
            </div>
            <div class="form-group form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label ">Address</label>
              <div class="col-lg-4">
                <input type="text" id="address" name="address" className="form-control input-lg input-lg1 AEN_border" placeholder="Enter Address"></input>
              </div>
            </div>
            <div class="form-group form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label ">Occupation</label>
              <div class="col-lg-4">
                <input type="text" id="occupation" name="occupation" className="form-control input-lg input-lg1 AEN_border" placeholder="Enter occupation"></input>
              </div>
            </div>
           
            <button type="submit" className="BTNADDVeh" onClick={(e) => handleclick(e)}>Add</button>
          </Form>
        </Loader>

      </div>
    </div>
  );
};

export default AddParticipant;
