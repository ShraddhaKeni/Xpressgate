import React from 'react';
import './Addnotice.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut from './Utils/LogOut';

const Addnotice = () => {
  return (
    <div className="ancontainer">
      <div id="ansection">
        <div className="anheadersection">
          <div id="anlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="ansociety"><label>Society</label></div>
          <div id="anspace"></div>
          <div id="annotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="ansetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="anlogoutbutton"><LogOut /></div>
        </div>
      </div>
      <div id="ansocietysection">
        <div className='ansocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='ansideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='anbackgroundimg'>
        <div className='addnoticedisplay'>
          <label>Add Notice</label>
        </div>
        <Form className='anformclass'>
          <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label labelsize">Title</label>
            <div class="col-sm-6 col-md-6 col-lg-6">
              <input type="number" class="form-control input-lg" name="title" placeholder="Title" value></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Date</label>
            <div class="col-lg-2">
              <input type="number" class="form-control input-lg" name="date" placeholder="Date" value></input>
            </div>
            <label class="col-lg-2 col-form-label labelsize">Time</label>
            <div class="col-lg-2">
              <input type="number" class="form-control input-lg" name="time" placeholder="Time" value></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Description</label>
            <div class="col-lg-6">
              <textarea  type="number" class="form-control input-lg" name="description" placeholder="Description"></textarea >
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Attachments</label>
            <div class="col-lg-6">
              <input type="number" class="form-control input-lg" name="attachments" placeholder="Upload from computer"></input>
            </div>
          </div>
          <Button type="submit" className="btnAddNotice">Add Notice</Button>
        </Form>

      </div>
    </div>
  )
}

export default Addnotice

