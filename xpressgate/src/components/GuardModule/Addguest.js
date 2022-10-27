import React from 'react';
import './Addguest.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const Addguest = () => {
  return (
    <div className="container1">
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
        <div className='Addvendordisplay'>
          <label>Add Guest</label>
        </div>
        <Form className='formclass'>
          <div class="form-group row">
              <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label labelsize">Entry No</label>
              <div class="col-sm-4 col-md-4 col-lg-4">
                <select class="form-control input-lg" id="inputentryno" placeholder="Entry No"></select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Guest Name</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" name="inputguestname" placeholder="Guest Name"></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Block No</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg" name="inputblockno" placeholder="Block No" value></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Flat No</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg" name="inputflatno" placeholder="Flat No"></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Vehicle No</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg" name="inputvehicleno" placeholder="Vehicle No"></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">No of people</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg" name="inputnoofpeople" placeholder="No of people"></input>
              </div>
            </div>
            <Button type="submit" className="btnAdd">Add</Button>
        </Form>

      </div>  
    </div>
  )
}

export default Addguest

