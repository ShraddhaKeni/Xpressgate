import React, { useEffect, useState } from "react";
import "../SocietyModule/GuardProfile.css";
import { Button } from 'react-bootstrap';
import LogOut from "./Utils/LogOut";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../Loader";
import Societyheader from './Utils/Societyheader';

const GuardProfile = () => {

  const [guard,setGuard]=useState({})
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const naviagate = useNavigate()
  useEffect(()=>{
    if(location.state)
    {
      getGuardDetails()
    }
    else
    {
      window.location.href='/guardList'
    }
  },[])

  const getGuardDetails=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/guard/getone/${location.state.id}`)
      setGuard(data.data)
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const editGuard=(id)=>{
    naviagate('/addGuard',{state:{id:id,type:'edit'}})
  }
  const removeGuard=async(id)=>{
    try {
      
    } catch (error) {
      
    }
  }

  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <Societyheader />
      </div>
      <div id="societynamesection">
        <div className="societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        <div className="addguard_sideimg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay4">
          <label>{guard.firstname} {guard.lastname}</label>
        </div>
        <Loader loading={loading}>
          <div className="guarddetailscard">
            <div className="cardimage">
              <img src={window.env_var+guard.profile_pic} alt="Guard Image"></img>
              <h4>{guard.firstname} {guard.lastname}</h4>
            </div>
            <div className="guardcontainerbox">
              <label for="Mobileno" className="mobileno">Mobile No : {guard.mobileno}</label>
              <br/><br/>
              <label for="Guard_name" className="Guard_Name">Username : {guard.username}</label>
            </div>
            <div className="buttonContainer">
              <Button type="button" onClick={()=>editGuard(guard._id)} class="editbtn">Edit</Button>
              <Button type="button" onClick={()=>removeGuard(guard._id)} class="removebtn">Remove</Button>
            </div>
          </div>
        </Loader>
      </div>
    </div>
  );
};
export default GuardProfile;