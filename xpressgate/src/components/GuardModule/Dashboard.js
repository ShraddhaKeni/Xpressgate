import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import LogOut from './Utils/LogOut';
import Frequentvisitor from './Frequentvisitor';
import Dailyservicepasscode from './Dailyservicepasscode';
import { checkGuard } from '../auth/Auth';
import { passcodeValidation } from '../auth/validation';
import GuardHeader from './Utils/GuardHeader';
import { Loader } from "../Loader";
import GuardMobileSidebar from '../GuardMobileSidebar';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [entryData, setEntryData] = useState({});
  const [message, setMessage] = useState({});
  const [menu, setMenuOpen] = useState(false);
  const [data, setData] = useState("Not Found");
  const [torchOn, setTorchOn] = useState(false);
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
 
  useEffect(() => {
    if (checkGuard()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/guard/checkLogin`, config)
      .then(({ data }) => {

      })
      .catch(err => {
        localStorage.clear();
        window.location.href = '/guardLogin'
      })
      setLoading(false);
    } else {
      window.location.href = '/'
    }
  }, [])

  const checkInputs = async () => {
    let a = document.getElementById('1').value;
    let b = document.getElementById('2').value;
    let c = document.getElementById('3').value;
    let d = document.getElementById('4').value;
    let e = document.getElementById('5').value;
    let f = document.getElementById('6').value;

    let code = parseInt(a + b + c + d + e + f);

    try {
      if (await passcodeValidation(code)) {
        const codeData = {
          code: code,
          community_id: localStorage.getItem('community_id')
        }
        let { data } = await axios.post(`${window.env_var}api/inoutentires/getdata`, codeData)
        if (data.data.bookingdetails.status === false /* || dateTimeFormat(data.data.bookingdetails.date)!=dateTimeFormat(Date.now()) */) {
          alert('Expired Entry Code.')
          return
        }
        else {
          setEntryData(data.data.bookingdetails)
          setMessage(data.message)
        }
      } else {
        alert('Enter valid passcode')
      }
    } catch (error) {
      console.log('Please check again');
    }
  }

  const scanresult = async (code) => {
    try {
      if (await passcodeValidation(code)) {
        const codeData = {
          code: code,
          community_id: localStorage.getItem('community_id')
        }
        let { data } = await axios.post(`${window.env_var}api/inoutentires/getdata`, codeData)
        if (data.data.bookingdetails.status === false /* || dateTimeFormat(data.data.bookingdetails.date)!=dateTimeFormat(Date.now()) */) {
          alert('Expired Entry Code.');
          return
        }
        else {
          setEntryData(data.data.bookingdetails)
          setMessage(data.message)
        }
      } else {
        alert('Enter valid passcode')
      }
    } catch (error) {
      console.log('Please check again');
    }
  }

  const shiftFocus = (e) => {
    let id = parseInt(e.target.id)
    if (e.target.value == '') {
      document.getElementById(id - 1).focus()
    }
    else {
      document.getElementById(id + 1).focus()
    }
  }

  const dateTimeFormat = (date) => {
    var d = new Date(date)
    return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()
  }

  return (
    <>
      {entryData.booked ? message == 'Vendor' ? <Frequentvisitor freqvisitordata={entryData} /> : <Dailyservicepasscode props={entryData} /> : <div className="dashboardcontainer">
        <div id="headersection">
          <GuardHeader onMenuClick={() => {
            setMenuOpen(true)
          }} />
        </div>
        <div id="guardnamesection">
          <div className='GuardName'>
            <img src="/images/guardnameicon.svg" alt="guard name" />
            <label>{localStorage.getItem('name')}</label>
          </div>
          <div className='GDsideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
        </div>
        <div className='dashboardbackgroundimg'>
          <Loader loading={loading}>
            <div id="cardsection">
              <div className='enterpasscodesearch'>
                <label>ENTER PASSCODE</label>
                <div className='code'>
                  <input type='text' className='dashboard_passcode' onKeyUp={e => { shiftFocus(e) }} maxLength="1" id='1'></input>
                  <input type='text' className='dashboard_passcode' onKeyUp={e => { shiftFocus(e) }} maxLength="1" id='2'></input>
                  <input type='text' className='dashboard_passcode' onKeyUp={e => { shiftFocus(e) }} maxLength="1" id='3'></input>
                  <input type='text' className='dashboard_passcode' onKeyUp={e => { shiftFocus(e) }} maxLength="1" id='4'></input>
                  <input type='text' className='dashboard_passcode' onKeyUp={e => { shiftFocus(e) }} maxLength="1" id='5'></input>
                  <input type='text' className='dashboard_passcode' onKeyUp={e => { shiftFocus(e) }} maxLength="1" id='6'></input>
                </div>
                <img src="/images/searchicon.svg" className='search_icon' onClick={() => { checkInputs() }} alt="search" />
              </div>

              <div className='ScannerContainer'>
              <button
              className='ScannerButn'
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
    
        {startScan ? "Stop Scan" : "Start Scan"}
        
      </button>
      {startScan && (
        <>
    
          <select onChange={(e) => setSelected(e.target.value)} className="SselectButn">
            <option value={"environment"}>Back Camera</option>
            <option value={"user"}>Front Camera</option>
          </select>
          <br/>
          <div hidden>{selected}</div>
          
          <br/>
          
          
                <BarcodeScannerComponent
                  width={300}
                  height={300}
                  torch={torchOn}
                  onUpdate={(err, result) => {
                    if (result) scanresult(result.text);
                    else setData("Not Found");
                  }}
                />
                </>
      )}
                {/* <p>{data}</p> */}
                <button onClick={() => setTorchOn(!torchOn)} className="TorchButn">
                  Switch Torch {torchOn ? "Off" : "On"}
                </button>
              </div>

              <div className="row row-cols-1 row-cols-md-3 g-4 FullCardsCss allcards">
                <div className="col">
                  <div className="DashBoardCard">
                    <img src="/images/guestcard.svg" onClick={() => { window.location.href = '/guestlist' }} className="dbcard-img-top card_hover_animation" alt="guest card"></img>
                  </div>
                </div>
                <div className="col">
                  <div className="DashBoardCard">
                    <img src="/images/vendorcard.svg" className="dbcard-img-top card_hover_animation" alt="vendor card" onClick={() => { window.location.href = '/vendorlist' }}></img>
                  </div>
                </div>
                <div className="col">
                  <div className="DashBoardCard">
                    <img src="/images/dailyhelpcard.svg" className="dbcard-img-top card_hover_animation" onClick={() => { window.location.href = '/dailyhelp' }} alt="dailyhelp card"></img>
                  </div>
                </div>
                <div className="col">
                  <div className="DashBoardCard">
                    <img src="/images/inoutbookcard.svg" className="dbcard-img-top card_hover_animation" onClick={() => { window.location.href = '/inoutbook' }} alt="inout book card"></img>
                  </div>
                </div>
                <div className="col">
                  <div className="DashBoardCard">
                    <img src="/images/videoclass.svg" className="dbcard-img-top card_hover_animation" onClick={() => { window.location.href = '/videoclass' }} alt="video class"></img>
                  </div>
                </div>
              </div>
            </div>
          </Loader>
        </div>
      </div>}
      <GuardMobileSidebar open={menu} onHide={() => setMenuOpen(false)} />

    </>
  )
}

export default Dashboard

