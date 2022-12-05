import './Societydashboard.css';
import { Button } from 'react-bootstrap';
import LogOut from './Utils/LogOut';
import Societyheader from './Utils/Societyheader';
import { useEffect } from 'react';
import {checkSociety} from '../auth/Auth'

import axios from 'axios'
const Societydashboard = () => {
  
    useEffect(()=>{
     if(checkSociety())
     {
      const config = {
        headers:{
          'x-access-token':localStorage.getItem('accesstoken')
        }
      }
     axios.get(`${window.env_var}api/society/checkLogin`,config)
            .then(({data})=>{   
            })
            .catch(err=>{
              localStorage.clear();
              window.location.href='/societylogin'
            }) 
     }
     else
     {
      window.location.href='/'
     }
    },[])
  return (
    <>
      <div className="dashboardcontainer">
        
      <div id="headersection">
        <div id="addflatsection">
        <Societyheader/>
        </div>
      </div>
      <div id="guardnamesection">
        <div className='guardname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='sideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
        <div className='dashboardbackgroundimg'>
        <div className='societydisplay'>
          <label>Society Dashboard</label>
        </div>
          <div id="cardsection">
            <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss">
              <div className="col">
                <div className="sdcard">
                 <img src="/images/managenoticeboard.svg" className="dbcard-img-top" alt="notice list" onClick={() => { window.location.href = '/noticeList' }}></img>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                  <img src="/images/managecommunity.svg" className="dbcard-img-top" alt="community" onClick={() => { window.location.href = '/community' }}></img>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                  <img src="/images/manageflat.svg" className="dbcard-img-top" alt="flat list" onClick={() => { window.location.href = '/flatlist' }}></img>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                 <img src="/images/managevehicles.svg" className="dbcard-img-top" alt="manage vehicle" onClick={() => { window.location.href = '/manageVehicle' }}></img>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                  <img src="/images/paymentmanagement.svg" className="dbcard-img-top" alt="payment" onClick={() => { window.location.href = '/payment' }}></img>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                  <img src="/images/guardmanagement.svg" className="dbcard-img-top" alt="guard list" onClick={() => { window.location.href = '/guardList' }}></img>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                  <img src="/images/managecomplains.svg" className="dbcard-img-top" alt="ticket list" onClick={() => { window.location.href = '/ticketlist' }}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Societydashboard

