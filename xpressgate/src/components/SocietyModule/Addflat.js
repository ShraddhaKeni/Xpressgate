import React from 'react';
import './Addflat.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut from './Utils/LogOut';

const Addflat = () => {
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
          <label>Add Flat</label>
        </div>
        <Form className='formclass'>
          <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label labelsize">Community</label>
            <div class="col-sm-4 col-md-4 col-lg-4">
              <input type="number" class="form-control input-lg" name="community" placeholder="Community" value></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Block</label>
            <div class="col-lg-4">
              <select class="form-control input-lg" id="block" placeholder="Block"></select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Flat No</label>
            <div class="col-lg-4">
              <input type="number" class="form-control input-lg" name="flatNo" placeholder="Flat No" value></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Description</label>
            <div class="col-lg-4">
              <textarea  type="number" class="form-control input-lg" name="description" placeholder="Description"></textarea>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Status</label>
            <div class="col-lg-4">
              <select class="form-control input-lg" id="status" placeholder="Status"></select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Images</label>
            <div class="col-lg-4">
              <input type="number" class="form-control input-lg" name="inputnoofpeople" placeholder="Images"></input>
            </div>
          </div>
          <Button type="submit" className="btnAdd">Add Flat</Button>
        </Form>

      </div>
    </div>
  )
}

export default Addflat

