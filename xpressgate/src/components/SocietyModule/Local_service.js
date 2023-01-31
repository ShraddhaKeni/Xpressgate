import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorScreen from "../../common/ErrorScreen";
import "../SocietyModule/Local_service.css";
import LogOut from './Utils/LogOut'
import { Loader } from "../Loader";
import Societyheader from './Utils/Societyheader';

const Local_service = () => {

  const [services,setServices] = useState([])
  const [loading, setLoading] = useState(true)

  const [isError,setError] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    getServices()
  },[])

  const getServices=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/admin/localservices/getAll`)
      setServices(data.data.localservices);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  const navigateToList=(id,serviceName)=>{
    navigate('/servicevendors',{state:{id:id,serviceName}})
  }
  if(isError)
    return <ErrorScreen/>
  return (
    <div className="addguestcontainer3">
      <div id="addflatsection">
        <Societyheader />
      </div>
      <div id="societynamesection">
        <div className="LS_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <div className='AddLSsidelinks'>
          <a className='lssidelinks' href="/localservices"><b>Local Service</b></a><br></br><br></br>
          <a className='alssidelinks' href="/addlocalservice">Add Local Services</a>
        </div>
        <div className="LS_sideimage">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="LS_display">
          <label>Local Services</label>
        </div>
        <Loader loading={loading}>
          <button type="button" onClick={()=>{window.location.href='/addlocalservice'}} className="AddLS">&#10011; Add Local Services</button>
          <div className="row row-cols-1 row-cols-md-3 g-4 lsfullcardscss allcards">
            {services.map(items=>{
              return(
                <div className="col card_hover_animation">
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
        </Loader>
      </div>
    </div>
  );
};
export default Local_service;