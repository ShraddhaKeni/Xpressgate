import React, { useEffect, useState } from "react";
import "../SocietyModule/Addmanagementteam.css";
import LogOut from './Utils/LogOut'
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { checkSociety } from "../auth/Auth";

const Addmanagementteam = () => {

  const [residents, setResidents] = useState([])
  const [type, setType] = useState('add')
  const location = useLocation()
  const [one,setOne] = useState({})
  const [title,setTitle] = useState()
  const [from,setFrom] = useState()

  useEffect(() => {
    if (checkSociety()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/society/checkLogin`, config)
        .then(({ data }) => {
          //console.log(location.state.id)
          if (location.state) {
             getResidents()
             getResidents()// 2 times getResidents is required
          setTitle(location.state.title)
          setType(location.state.type)
          getOneData()
          }else{
            getResidentsAdd()
          }
        })
        .catch(err => {
           localStorage.clear();
           window.location.href = '/societylogin'
          //console.log(err)
        })
    }
    else {
      window.location.href = '/'
    }
  }, [])

const getOneData = async () => {
  try {
    const { data } = await axios.get(`${window.env_var}api/management/getOne/${props.booked_id}`)
   
    setResidents(data.data.Resident)
  } catch (error) {
    console.log(error)
  }
}
  
  const getResidents = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/resident/getall`)
      let resident_1 = await  data.data.Resident.find(x=>x.id===location.state.id)
      document.getElementById('resident_id').value = resident_1.id
      //setOne(data.data.Resident.find(x=>x.id===location.state.id))
      setResidents(data.data.Resident)
    } catch (error) {
      console.log(error)
    }
  }

  const getResidentsAdd = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/resident/getall`)
     
      setResidents(data.data.Resident)
    } catch (error) {
      console.log(error)
    }
  }

 async function getValues()
  {
    document.getElementById('resident_id').value = location.state.id
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (type == 'add') {
        //if (document.getElementById('management_title').value !== "" && document.getElementById('from').value != "" && document.getElementById('to').value !== "") {
          const sendData = {
            // community_id: '632970d054edb049bcd0f0b4',
            community_id:localStorage.getItem('community_id'),
            managementTitle: document.getElementById('management_title').value,
            resident_id: document.getElementById('resident_id').value,
            from: document.getElementById('ForDate').value,
            to: document.getElementById('ToDate').value
          }
          const { data } = await axios.post(`${window.env_var}api/management/add`, sendData)
          window.location.href = '/management'
       // }
      }
      else {
        // let formdata = new FormData()
        // //formdata.append('id', document.getElementById('location.state.id').value)
        // id: location.state.id,
        // formdata.append('resident_id', document.getElementById('resident_id').value)
        // formdata.append('community_id',localStorage.getItem('community_id')) 
        // formdata.append('managementTitle', document.getElementById('management_title').value)
        // formdata.append('to', document.getElementById('ToDate').value)
        // formdata.append('from', document.getElementById('ForDate').value)
        const sendDataedit = {
          id: location.state.mainid,
          community_id:localStorage.getItem('community_id'),
          managementTitle: document.getElementById('management_title').value,
          resident_id: document.getElementById('resident_id').value,
          from: document.getElementById('ForDate').value,
          to: document.getElementById('ToDate').value
        }
        const { data } = await axios.post(`${window.env_var}api/management/update`, sendDataedit)
        window.location.href = '/management'
      }
    } catch (error) {
      console.log(error)
    }
  }

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
       
        <div className="addflatheadersection">
          <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="afsociety"><label>Society</label></div>
          <div id="afspace"></div>
          <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="afsetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aflogoutbutton"><LogOut /></div>
        </div>

      </div>
      <div id="societynamesection">
        <div className="AMM_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <div class="MM_notice">
        <a href="/management" class="AMt_Link">Management Team</a><br></br><br/>
          <a href="/addManagement" class="Amm_Link"><b>Add Management Member</b></a>
          </div>
        <div className="AMTSideIMG">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="AMM_display">
          <label>Add Management Team</label>
        </div>
        <Form className="formclass">
          {/* <div class="form-group form-group5 row">
            <label class="col-lg-2 col-form-label  labelsize">Resident</label>
            <div class="col-lg-4">
              <select className="form-control input-lg" id='resident_id'>
                <option value={null} selected disabled>Select resident</option>
                {residents.map(item => {
                  return <option value={item.id}>{item.firstname} {item.lastname}</option>
                })}
              </select>
            </div>
          </div> */}
          <div className="AMM_form">
            <div className="inboxes">
              <label for="Resident" className="AMMResident">Resident</label>
              <select id='resident_id' className="AMMinputR">
                <option value={null} selected disabled>Select resident</option>
                {residents.map(item => {
                  return <option value={item.id}>{item.firstname} {item.lastname}</option>
                })}
              </select>
            </div>
          </div>
          {/* <div class="form-group form-group5 row">
            <label class="col-lg-2 col-form-label labelsize labelsize2">
              {" "}
              Designation
            </label>
            <div class="col-lg-4">
              <input
                type="text"
                class="form-control input-lg "
                name="Designation"
                placeholder=""
                id='management_title'
              ></input>
            </div>
          </div> */}
          <div className="AMM_form">
            <div className="inboxes">
              <label for="Designation" className="AMMDesignation">Designation</label>
              {title? <input type="text" id="management_title" defaultValue={title}  className="AMMinput"></input>: <input type="text" id="management_title"  className="AMMinput"></input>}
        
            </div>
          </div>
          
          <div className="AMM_form">
            <div className="inboxes">
              <span>
                <label for="ToDate" class="Todate">To</label>
                <input type="date" id="ToDate" className="Todateinput" min={disablePastDate()}></input>
              </span>
              <span>
                <label for="ForDate" class="Fromdate">From</label>
                <input type="date" id="ForDate" className="Fromdateinput" min={disablePastDate()}></input>
              </span>

            </div>
          </div>

          <Button type="submit" onClick={(e) => handleSubmit(e)} className="AMM_Add_btn">
            Add Number
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Addmanagementteam;
