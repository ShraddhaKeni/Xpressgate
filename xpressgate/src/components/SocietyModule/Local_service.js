import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../SocietyModule/Local_service.css";
import LogOut from './Utils/LogOut'


const Local_service = () => {

  const [services,setServices] = useState([])

  const navigate = useNavigate()
  useEffect(()=>{
    getServices()
  },[])

  const getServices=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/admin/localservices/getAll`)
      setServices(data.data.localservices)
    } catch (error) {
      console.log(error)
    }
  }

  const navigateToList=(id,serviceName)=>{
    navigate('/servicevendors',{state:{id:id,serviceName}})
  }

  return (
    <div className="addguestcontainer3">
    <div id="addflatsection">
        <div className="addflatheadersection">
          <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="afsociety"><label>Society</label></div>
          <div id="afspace"></div>
          <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="afsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aflogoutbutton"><LogOut/></div>
        </div>
    
    </div>
      <div id="societynamesection">
        <div className="societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        <div class="noticelist">
          <h4><b>Notice List</b></h4>
          <a href="abcd" class="Notice">Add Notice</a>
          </div>
        <div className="sideimage2">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay2">
          <label>Local Services</label>
        </div>
        <button type="button" onClick={()=>{window.location.href='/addlocalservice'}} className="AddLS"> Add Local Services</button>
        <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss">
          
            

            {services.map(items=>{
              return(
                <div className="col">
                  <div className="dashboardcard_services" onClick={()=>{navigateToList(items.id,items.serviceName)}}>
                    <div className="image_div">
                      <img src={window.env_var+items.icons} />
                    </div>
                    <h1>{items.serviceName}</h1>
                </div>
              </div>
              )
            })}
        </div>
      </div>
    </div>
  );
};

export default Local_service;
