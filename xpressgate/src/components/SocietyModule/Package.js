import React, { useEffect,useState } from "react";
import "../SocietyModule/Package.css";
import Societyheader from "./Utils/Societyheader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";
import ErrorScreen from "../../common/ErrorScreen";

const Package = () => {
  const [isError,setError] = useState(false)
  const [booked,setPackage] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
      setLoading(false);
      setError(false)
    } catch (error) {
      setLoading(false);
      setError(true)
    }
  }

  function navigateToEdit(){
    navigate('/packagelist',{state:{id:booked._id,edit:true}})
  }

  const ChangeDate=(d)=>{
    const date = new Date(d)
    
    return(`${date.getDate()-1}/${date.getUTCMonth()+1}/${date.getFullYear()+1}`)
  }
  if(isError)
    return <ErrorScreen/>
  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <Societyheader/>
      </div>
      <div id="societynamesection">
        <div className="PACK_Sname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br />
        <div className="PACK_sideimg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="PACK_display">
          <label>{booked.plan_name} </label>
        </div>
        <Loader loading={loading}>
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
              <button type="button" class="validbtn"><i class="fa fa-circle circle " ></i> { ChangeDate(booked.purchased_date)}</button>
              <button className="ChangePackageBtn"  onClick={()=>{navigateToEdit()}}>Change Package</button>
            </div> 
          </div>
        </Loader>
      </div>
    </div>
  );
};

export default Package;
