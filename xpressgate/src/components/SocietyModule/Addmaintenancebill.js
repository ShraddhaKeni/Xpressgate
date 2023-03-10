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

const Addmaintenancebill = () => {
  const [loading, setLoading] = useState(false)
  const [blocks, setBlocks] = useState([])
  const [flats, setFlats] = useState([])
  const [resident, setResident] = useState({})
  const [toast, setToast] = useState({ show: false })
  const [type, setType] = useState('add')
  const [isError, setError] = useState(false)
  const location = useLocation();
  const [getdata, setGetData] = useState([]);

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
            getEditData();
            await getBlocks();
            //await getFlats(document.getElementById('blockid').value);
            await getResidentname();
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
      document.getElementById('blockid').value = getdata.block_id;
      
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
      document.getElementById('flatid').value = getdata.flat_id;
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
    } catch (error) {
      console.log(error)
    }
  }


  const getEditData = async () => {
    try {
      let sendData = {
        community_id: localStorage.getItem('community_id'),
        id: location.state.id,
      }
      const { data } = await axios.post(`${window.env_var}api/maintenance/getOne`, sendData)
      setGetData(data.data.maintenance[0])
      await getBlocks()
      await getFlatsUpdate(data.data.maintenance[0].block_id);
      await getResidentUpdate(data.data.maintenance[0].flat_id);
      document.getElementById('blockid').value = data.data.maintenance[0].block_id;
      document.getElementById('flatid').value = data.data.maintenance[0].flat_id;
      document.getElementById('residentid').value = data.data.maintenance[0].resident_id
      //document.getElementById('flatid').value = data.data.maintenance[0].flat_id;
      console.log(data.data.maintenance[0].block_id)
      //await getResidentname()
      //console.log(document.getElementById('blockid').value)
      
      setError(false)
    } catch (error) {
      setError(true)
    }
  }


  const handleclick = async (e) => {
    e.preventDefault();
    try {
      if (type == 'add') {
        let submitData = {
          community_id: localStorage.getItem('community_id'),
          block_id: document.getElementById('blockid').value,
          flat_id: document.getElementById('flatid').value,
          amount: document.getElementById('amount').value,
          resident_id: document.getElementById('residentid').value,
          area: document.getElementById('area').value,
        }
        const saveData = await axios.post(`${window.env_var}api/maintenance/add`, submitData)
        //console.log(saveData)
        setToast({ show: true, type: "success", message: "Data added Successfully" })
        setTimeout(() => {
          window.location.href = '/maintenancebilllist'
        }, 1500);
        window.location.href = "/maintenancebilllist"

      } else {
        const sendData = {
          id: location.state.id,
          community_id: localStorage.getItem('community_id'),
          block_id: document.getElementById('blockid').value,
          flat_id: document.getElementById('flatid').value,
          resident_id: document.getElementById('residentid').value,
          area: document.getElementById('area').value,
          amount: document.getElementById('amount').value,
        }
        const { data } = await axios.post(`${window.env_var}api/maintenance/update`, sendData);
        setToast({ show: true, type: "success", message: "Updated successfully" })
        setTimeout(() => {
          window.location.href = '/maintenancebilllist'
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
        <div class="maintenancelist">
          <a href="/maintenancebilllist" class="AMSLList">Maintenance Bill List</a><br /><br />
          <a href="/addmaintenancebill" class="AAddmaintenancelink"><b>Add Maintenance Bill</b></a>
        </div>
        <div className="AEN_sideimage">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addmaintenancebackgroundimg">
        <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <div className="AEN_display">
          <label>Add Maintenance Bill</label>
        </div>
        <Loader loading={loading}>
          <Form className='formclass'>
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label">Block</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" id="blockid" name="Type" type="text" onChange={(e) => { getFlats(e) }}>
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
              <label class="col-lg-2 col-form-label ADN_label">Owner</label>
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
              <label class="col-lg-2 col-form-label ADN_label ">Amount</label>
              <div class="col-lg-4">
                <input type="number" id="amount" name="amount" defaultValue={getdata.amount ? getdata.amount : ''} className="form-control input-lg input-lg1 AEN_border" placeholder="Enter Amount"></input>
              </div>
            </div>
            <div class="form-group form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label ">Area</label>
              <div class="col-lg-4">
                <input type="number" id="area" name="Area" defaultValue={getdata.area ? getdata.area : ''} className="form-control input-lg input-lg1 AEN_border" placeholder="Enter Area"></input>
              </div>
            </div>
            {/* <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Bill Date</label>
              <div class="col-lg-4">
                <input type="date" class="form-control input-lg SideB" id='bill_date' name="Bill Date" />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Due Date</label>
              <div class="col-lg-4">
                <input type="date" class="form-control input-lg SideB" id='due_date' name="Due Date" />
              </div>
            </div> */}
            <button type="submit" className="AddButton" onClick={(e) => handleclick(e)}> Add Maintenance Bill</button>
          </Form>
        </Loader>

      </div>
    </div>
  );
};

export default Addmaintenancebill;
