import React, { useEffect, useState } from 'react';
import './Dailyhelplist.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import LogOut from './Utils/LogOut';
import { Link, useNavigate } from 'react-router-dom'
import './otp.css';
import { checkGuard } from '../auth/Auth';
const Dailyhelplist = () => {
  const [dailyhelpdata, setDailyhelpdata] = useState([])
  //const [flatdata, setFlatdata] = useState([])
  useEffect(() => {
    if(checkGuard())
    {
      const config = {
        headers:{
          'x-access-token':localStorage.getItem('accesstoken')
        }
      }
     axios.get(`${window.env_var}api/guard/checkLogin`,config)
            .then(({data})=>{  
              
            })
            .catch(err=>{
              localStorage.clear();
              window.location.href='/guardLogin'
            })
            getData()   
    }
    else
    {
      window.location.href='/'
    }
   
  }, [])


  const getData = async () => {
    try {

      const data = await axios.get(`${window.env_var}api/helperlist/getAll`)
      setDailyhelpdata(data.data.data.list)
      //setFlatdata(data.data.data.list[0].booking_id)
      //console.log(data.data.data.list[0].booking_id);
    } catch {
      console.log('Please try again');
    }

  }

  const navigate = useNavigate();

  const routeChange = (id)=>{
    navigate('/dailyservice',{state:{id:id}})
  }
  return (
    <div className="dailyhelplistcontainer">
      <div id="dhlheadersection">
        <div className="dhlfirstheadersection">
          <div id="dhldashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dhldashboardguard"><label>Guard</label></div>
          <div id="dhldashboardspace"></div>
          <div id="dhldashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="dhldashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="dhldashboardlogoutbutton"><LogOut /></div>
        </div>
      </div>
      <div id="dhlguardnamesection">
        <div className='dhlguardname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>Guard Name</label>
        </div>
        <div className='sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='dhlbackgroundimg'>
        <div id="cardsection">
          <div className='Dailyhelplistdisplay'>
            <label>Daily Help List</label>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 dhfullcardscss">
            {dailyhelpdata.map((dailydata) => {

              return (
               
                  <div className="col" onClick={()=>routeChange(dailydata._id)}>
                    <div className="dailyhelpminicard"><br></br>
                      <img className="dhcard-img-top" src={`${window.env_var}` +dailydata.helper_image} alt="profile"></img><br></br>
                      <label className='dhcard-titlename'>{dailydata.helper_name}</label><br></br>
                      <label className='dhcard-profession'>{dailydata.service}</label><br></br><br></br>
                      <label className='dhcard-allowedhouses'>Allowed in {dailydata.booking_id.length} Houses</label><br></br>
                    </div>

                  </div>
              )
            })}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dailyhelplist

