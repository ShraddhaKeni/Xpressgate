import React, { useState } from 'react';
import './Frequentvisitor.css';
import { Button } from 'react-bootstrap';


const Frequentvisitor = ({freqvisitordata}) => {

  const current = new Date();
  const[date, setDate] = useState(`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`);
  
  // const date = ;

  return (
    <div className="frequentvisitorcontainer">
      <div id="headersection">
        <div class="firstheadersection">
          {console.log(freqvisitordata)}
          <div id="dashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dashboardguard"><label>Guard</label></div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="dashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="dashboardlogoutbutton"> <Button type="submit" className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button></div>
        </div>
      </div>
      <div id="guardnamesection"> 
        <div className='guardname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>Guard Name</label>
        </div>
        <div className='sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='fvbackgroundimg'>
        <div className='frequentvisitordisplay'>
          <label>{freqvisitordata.code}</label>
        </div>
        {/* <div className="row row-cols-1 row-cols-md-1 g-4 fullcardscss"> */}
        <div className="col">
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
            <div><label className='allowedclass'>Allowed by</label></div>

            <div className='detailsclass'>
              <div><label className='date text-right'>Date:{date}</label></div>
              <div><label className='intime'>In-Time: </label></div>
              <div><label className='outtime'>Out-Time: </label></div>
              <div><label className='noofpeople'>No of People: 1</label></div>
              <div><label className='vehicleno'>Vehicle No: <input type='text'></input></label></div>
            </div>
            <br></br>
            <Button type="submit" className="btnApprove">APPROVE</Button>
            <Button type="submit" className="btnDeny">DENY</Button>
            <br></br>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Frequentvisitor

