import React from 'react';
import './Addflat.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut from './Utils/LogOut';

const Addvehicle = () => {


  return (
    <div className="addflatcontainer">
      <div id="addflatsection">
        <div className="addflatheadersection">
          <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="afsociety"><label>Society</label></div>
          <div id="afspace"></div>
          <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="afsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aflogoutbutton"><LogOut /></div>
        </div>
      </div>
      <div id="afsocietysection">
        <div className='afsocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='afsideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='afbackgroundimg'>
        <div className='Addflatdisplay'>
          <label>Allot Vehicle</label>
        </div>
        <Form className='formclass'>
          <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label labelsize">Resident name</label>
            <div class="col-sm-4 col-md-4 col-lg-4">
              <input type="text" class="form-control input-lg" name="community" placeholder="Resident name"></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Vehicle Name</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg" name="inputnoofpeople" placeholder="Vehicle Name"></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Vehicle Make</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg" name="flatNo" placeholder="Vehicle Make"></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Vehicle Number</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg" name="inputnoofpeople" placeholder="Vehicle Model"></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Parking section</label>
            <div class="col-lg-4">
              <select class="form-control input-lg" id="status" placeholder="Parking section"></select>
            </div>
          </div>
          <Button type="submit" className="btnAdd">Allot Vehicle</Button>
        </Form>

      </div>
    </div>
  )
}

export default Addvehicle

