import React, { useEffect,useState } from "react";
import "../SocietyModule/Package.css";
import { Button } from "react-bootstrap";

import LogOut from "../SocietyModule/Utils/LogOut";
import Societyheader from "./Utils/Societyheader";
import axios from "axios";

const Package = () => {

  const [booked,setPackage] = useState({})

  useEffect(()=>{
    getData()
  },[])

  const getData=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/packagebook/get/${localStorage.getItem('community_id')}`)
      
      if(data.data.booked<1)
      {
        window.location.href='/packagelist'
      }
      else
      {
        setPackage(data.data.booked[0])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ChangeDate=(d)=>{
    const date = new Date(d)
    return((date.getDate()-1)+'/'+date.getMonth()+'/'+(date.getFullYear()+1))
  }

  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
        <Societyheader/>
    
    </div>
      <div id="societynamesection">
        <div className="societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br />

        <div className="addguard_sideimg">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay4">
          <label>{booked.plan_name}</label>
        </div>
        <Button style={{marginLeft:'50%',backgroundColor:'#0A8996'}}>Edit package</Button>
        <div className="packagedetailscard">
       
          <div className="cardimage">
            <div className="packagelabel">
              <label className="packagename">{booked.plan_name}</label>
            </div>
          </div>
          <br/>
          <div className="aboutpackage">
            <p>
            {booked.plan_decp}
              </p>
          </div>
          <br/><br/>
          <div className="buttonContainer">
              <button type="button" class="validbtn"><i class="fa fa-circle circle" ></i>{ChangeDate(booked.purchased_date)}</button>
             
            </div> 

        </div>
      </div>
    </div>
  );
};

export default Package;
