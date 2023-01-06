import React, { useEffect, useState } from 'react';
import './Frequentvisitor.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { getDefaultNormalizer } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import LogOut from './Utils/LogOut';

const Frequentvisitor = ({freqvisitordata}) => {

  const [freq,setFreq] = useState()
  const navigate = useNavigate()
  const current = new Date();
  const[date, setDate] = useState(`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`);
  useEffect(()=>{
    getData()
  },[])

  const getData= async()=>{
    try {
      const codeData = {
        code: freqvisitordata.code,
        community_id: "632970d054edb049bcd0f0b4"
      }
      let { data } = await axios.post(`${window.env_var}api/inoutentires/getdata`, codeData)
      if(data.message=='Vendor')
      {
        navigate('/vendorentry',{state:{id:data.data.bookingdetails.booked_id,code:freqvisitordata.code}})
      }
      else if(data.message=='Guest')
      {
        navigate('/guestentry',{state:{id:data.data.bookingdetails.booked_id,code:freqvisitordata.code}})
      }
    } catch (error) {
      console.log(error)
    }
  }


  // const date = ;

  return (
    <div className="frequentvisitorcontainer">
      <div id="headersection">
        <div class="firstheadersection">
          {console.log(freqvisitordata.service)}
          <div id="dashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dashboardguard"><label>Guard</label></div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="dashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="dashboardlogoutbutton"> <LogOut /></div>
        </div>
      </div>
      <div id="guardnamesection"> 
        <div className='guardname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>{localStorage.getItem('name')}</label>
        </div>
        <div className='sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='fvbackgroundimg'>
        <div className='frequentvisitordisplay'>
          <label>{freqvisitordata.code}</label>
        </div>
        {/* <div className="row row-cols-1 row-cols-md-1 g-4 fullcardscss"> */}
        <div className="col">
        <div className="backbutton" onClick={()=>window.location.href="/dashboard"}><i class="fa fa-arrow-left" aria-hidden="true"></i></div>
          <div className="frequentvisitorcard">
            <br></br>
            <label className="namelabel">{freqvisitordata.booked}</label>
            <div className='profclass'>{freqvisitordata.service}</div>
            <br></br>
            <div className='flatclass'>
              <label>Flat No</label>
              <div className='flatnodisplay'>{freqvisitordata.flatID[0].Flat_number} ,{freqvisitordata.flatID[0].Block_name}</div>
            </div>
            <br></br>
            <div><label className='fvallowedclass'>Allowed by</label></div>

            <div className='detailsclass'>
              <div><label className='date text-right'>Date:{date}</label></div>
              <div><label className='intime'>In-Time: </label></div>
              <div><label className='outtime'>Out-Time: </label></div>
              <div><label className='noofpeople'>No of People: 1</label></div>
              <div><label className='vehicleno'>Vehicle No: <input type='text'></input></label></div>
            </div>
            <br></br>
            {/* <Button type="submit" onClick={()=> handleclick()} className="btnApprove">APPROVE</Button>
            <Button type="submit" onClick={()=>window.location.href="/dashboard"} className="btnDeny">DENY</Button> */}
            <br></br>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Frequentvisitor

