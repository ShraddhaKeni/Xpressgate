import React, { useEffect, useRef, useState } from "react";
import "./Addarrears.css";
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

const Addarrears = () => {
  const [toast, setToast] = useState({ show: false })
  const [loading, setLoading] = useState(false)
  const [blocks, setBlocks] = useState([])
  const [flats, setFlats] = useState([])
  const [isError, setError] = useState(false)
  const [editarrearsdata, setEditarrearsdata] = useState({});
  const [resident, setResident] = useState({})
  const [invoice, setinvoice] = useState({})
  const [type, setType] = useState('add')
  const location = useLocation()

  useEffect(() => {
    //getResidentname();
    if (checkSociety()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/society/checkLogin`, config)
        .then(({ data }) => {
          if (location.state) {
            getEditData();
          
            setType(location.state.type);
            //setType(location.state.addedittype);
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

  const getEditData = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/arrears/getOne/${location.state.id}`)
      setEditarrearsdata(data.data.arrears[0])
      await getBlocks();//before setting dropdown first load the dropdown
      document.getElementById('blockid').value = data.data.arrears[0].block_name;
      await getFlatsUpdate(data.data.arrears[0].block_id);
      await getResidentUpdate(data.data.arrears[0].flat_id);
     
      await getInvoicenumberUpdate(data.data.arrears[0].resident.resident_id);
      document.getElementById('residentid').value = data.data.arrears[0].resident.resident_id
      document.getElementById('invoiceid').value = data.data.arrears[0].invoice_number
      setError(false)
    } catch (error) {
      setError(true)
    }
  }


  const getBlocks = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/block/blockList`)
     
      setBlocks(data.data.block)
    } catch (error) {
      console.log(error)
    }
  }

  const getFlatsUpdate = async (e) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/flats/getList/${e}`);
      setFlats(data.data.list);
      document.getElementById('flatid').value = editarrearsdata.flat_id;
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const getFlats = async (e) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/flats/getList/${e.target.value}`)
      setFlats(data.data.list)
   
      setError(false)
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

  const getInvoicenumberUpdate = async (e) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/maintenancepayment/getByResident/${e}`)
      setinvoice(data.data)
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

      //document.getElementById('residentid').value = editarrearsdata.resident[0].resident_id

    } catch (error) {
      console.log(error)
    }
  }


  const getInvoicenumber = async (e) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/maintenancepayment/getByResident/${e.target.value}`)
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleclick = async (e) => {
    e.preventDefault();
    try {
      if (type == 'edit') {
        const sendData = {
          id: location.state.id,
          community_id: localStorage.getItem('community_id'),
          block_id: document.getElementById('blockid').value,
          flat_id: document.getElementById('flatid').value,
          resident_id: document.getElementById('residentid').value,
          invoice_number: document.getElementById('invoiceid').value,
          arrears: document.getElementById('arrearsamt').value
        }
        const data = await axios.post(`${window.env_var}api/arrears/update`, sendData)
        setToast({ show: true, type: "success", message: "Arrears updated successfully" })
        setTimeout(() => {
          window.location.href = '/arrearslist'
        }, 1500);
      }
      else {
        let submitData = {
          community_id: localStorage.getItem('community_id'),
          block_id: document.getElementById('blockid').value,
          flat_id: document.getElementById('flatid').value,
          resident_id: document.getElementById('residentid').value,
          invoice_number: document.getElementById('invoiceid').value,
          arrears: document.getElementById('arrearsamt').value
        }
        const saveData = await axios.post(`${window.env_var}api/arrears/add`, submitData)
        //console.log(saveData)
        setToast({ show: true, type: "success", message: "Added Successfully" })
        setTimeout(() => {
          window.location.href = '/arrearslist'
        }, 1500);
        // window.location.href="/dailyhelp"
      }
    } catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
    }
  }
  if(isError)
    return <ErrorScreen/>
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
        <div class="arrearslist">
          <a href="/arrearslist" class="AMSLList">Arrears List</a><br /><br />
          <a href="/addarrears" class="AAddmaintenancelink"><b>{type == 'edit' ? 'Update Arrears' : 'Add Arrears'}</b></a>
        </div>
        <div className="AEN_sideimage">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addmaintenancebackgroundimg">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <div className="AEN_display">
          <label>{type == 'edit' ? 'Update Arrears' : 'Add Arrears'}</label>
        </div>

        <Loader loading={loading}>
          <Form className='FormClass'>
            <div class="form-group  form-group5 row">
              <label class="col-lg-3 col-form-label ADN_label">Block</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" id="blockid" onChange={(e) => { getFlats(e) }}>
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
              <label class="col-lg-3 col-form-label ADN_label">Flat</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" id="flatid" type="text" onChange={(e) => { getResidentname(e) }}>
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
              <label class="col-lg-3 col-form-label ADN_label">Resident Name</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" id="residentid" type="text" onChange={(e) => { getInvoicenumber(e) }}>
                  <option value={null} selected disabled>Select Resident</option>
                  {flats.map(item => {
                    return <option value={item.resident_id}>{item.firstname}{item.lastname}</option>
                  })}
                </select>
              </div>
            </div>

            <div class="form-group  form-group5 row">
              <label class="col-lg-3 col-form-label ADN_label">Invoice Number</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" id="invoiceid" type="text">
                  <option value={null} selected disabled>Select Invoice Number</option>
                  {flats.map(item => {
                    return <option value={item._id}>{item._id}</option>
                  })}
                </select>
              </div>
            </div>
            <div class="form-group form-group5 row">
              <label class="col-lg-3 col-form-label ADN_label ">Arrears Amount</label>
              <div class="col-lg-4">
                <input type="text" id="arrearsamt" name="arrearsamount" className="form-control input-lg input-lg1 AEN_border" placeholder="Enter Arrears" defaultValue={editarrearsdata.arrears ? editarrearsdata.arrears : ''}></input>
              </div>
            </div>


            <button type="submit" className="AddaddarrearsButton" onClick={(e) => handleclick(e)}>{type == 'edit' ? 'Update Arrears' : 'Add Arrears'}</button>
          </Form>
        </Loader>

      </div>
    </div>
  );
};

export default Addarrears;
