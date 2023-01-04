import React, { useEffect } from 'react';
import './Addguest.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut from './Utils/LogOut';
import { checkGuard } from '../auth/Auth';
import axios from 'axios';
const Addguest = () => {
  useEffect(()=>{
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
    }
    else
    {
      window.location.href='/'
    }
  },[])
  return (
    <div className="addguestcontainer">
      <div id="headersection">
        <div className="firstheadersection">
          <div id="dashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dashboardguard"><label>Guard</label></div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="dashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="dashboardlogoutbutton"><LogOut/></div>
        </div>
      </div>
      <div id="guardnamesection">
        <div className='ADDGName'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>{localStorage.getItem('name')}</label>
        </div>
        <div className='ADDGSImg'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='addguestbackgroundimg'>
        <div className='AGuest_display'>
          <label>Add Guest</label>
        </div>
        <Form className='formclass'>
          <div class="form-group row">
              <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label labelsize">Entry No</label>
              <div class="col-sm-4 col-md-4 col-lg-4">
                <select class="form-control input-lg ADGBorDer" id="inputentryno" placeholder="Entry No"></select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Guest Name</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg ADGBorDer" name="inputguestname" placeholder="Guest Name"></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Block No</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg ADGBorDer" name="inputblockno" placeholder="Block No" value></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Flat No</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg ADGBorDer" name="inputflatno" placeholder="Flat No"></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Vehicle No</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg ADGBorDer" name="inputvehicleno" placeholder="Vehicle No"></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">No of people</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg ADGBorDer" name="inputnoofpeople" placeholder="No of people"></input>
              </div>
            </div>
            <button type="submit" className="btnAddguest">Add</button>
        </Form>

      </div>  
    </div>
  )
}

export default Addguest

