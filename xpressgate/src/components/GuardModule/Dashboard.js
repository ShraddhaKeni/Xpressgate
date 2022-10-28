import React, { useState } from 'react';
import './Dashboard.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Frequentvisitor from './Frequentvisitor';
import Dailyservicepasscode from './Dailyservicepasscode';

const Dashboard = () => {

  const [entryData, setEntryData] = useState({})
  const [message, setMessage] = useState({})

  const checkInputs = async () => {
    let a = document.getElementById('1').value
    let b = document.getElementById('2').value
    let c = document.getElementById('3').value
    let d = document.getElementById('4').value
    let e = document.getElementById('5').value
    let f = document.getElementById('6').value

    let code = parseInt(a + b + c + d + e + f)
    try {
      const codeData = {
        code: code,
        community_id: "632970d054edb049bcd0f0b4"
      }
      let { data } = await axios.post(`api/inoutentires/getdata`, codeData)
      setEntryData(data.data.bookingdetails)
      setMessage(data.message)
  
    } catch (error) {
      console.log('Please check again');
    }
  }
 
  // const checktype = async (message) => {
  //   //console.log(message);
  //   //if (message == 'Vendor') {
  //    return
  //   }
  //   else if (message == 'Daily') {
  //     return <Frequentvisitor freqvisitordata={entryData} />
  //   }else{
  //     return <Frequentvisitor freqvisitordata={entryData} />
  //   }
  // }
  return (
    <>
      {entryData.booked ?message=='Vendor'?<Frequentvisitor freqvisitordata={entryData}/>:<Dailyservicepasscode  dailyservicepasscodedata={entryData}/> : <div className="dashboardcontainer">
        <div id="headersection">
          <div class="firstheadersection">
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
        <div className='backgroundimg'>
          <div id="cardsection">
            <div className='enterpasscodesearch'>
              <label>ENTER PASSCODE</label>
              <div className='code'>
                <input type='text' className='dashboard_passcode' maxlength="1" id='1'></input>
                <input type='text' className='dashboard_passcode' maxlength="1" id='2'></input>
                <input type='text' className='dashboard_passcode' maxlength="1" id='3'></input>
                <input type='text' className='dashboard_passcode' maxlength="1" id='4'></input>
                <input type='text' className='dashboard_passcode' maxlength="1" id='5'></input>
                <input type='text' className='dashboard_passcode' maxlength="1" id='6'></input>
              </div>

              <img src="/images/searchicon.svg" onClick={() => { checkInputs() }} alt="search" />
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss">
              <div className="col">
                <div className="dashboardcard">
                  <a href='abc'><img src="/images/guestcard.svg" className="dbcard-img-top" alt="guest card"></img></a>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                  <img src="/images/vendorcard.svg" className="dbcard-img-top" alt="vendor card"></img>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                  <img src="/images/dailyhelpcard.svg" className="dbcard-img-top" alt="dailyhelp card"></img>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                  <img src="/images/inoutbookcard.svg" className="dbcard-img-top" alt="inout book card"></img>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                  <img src="/images/videoclass.svg" className="dbcard-img-top" alt="video class"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default Dashboard

