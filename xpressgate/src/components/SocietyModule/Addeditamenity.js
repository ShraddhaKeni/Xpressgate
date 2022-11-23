import React from 'react';
import './Addeditamenity.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut from './Utils/LogOut';

const Addeditamenity = () => {
  return (
    <div className="aeacontainer">
      <div id="aeasection">
        <div className="aeaheadersection">
          <div id="aealogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="aeasociety"><label>Society</label></div>
          <div id="aeaspace"></div>
          <div id="aeanotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="aeasetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aealogoutbutton"><LogOut /></div>
        </div>
      </div>
      <div id="aeasocietysection">
        <div className='aeasocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='aeasideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='aeabackgroundimg'>
        <div className='aeadisplay'>
          <label>New Amenity</label>
        </div>
        <Form className='aeaclass'>
          <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label labelsize">Name</label>
            <div class="col-sm-4 col-md-4 col-lg-4">
              <input type="number" class="form-control input-lg" name="community" placeholder="Name" value></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Rule for Booking</label>
            <div class="col-lg-4">
              <textarea type="number" class="form-control input-lg" name="inputnoofpeople" placeholder="Rule for Booking"></textarea>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Status</label>
            <div class="col-lg-4">
              <input type="number" class="form-control input-lg" name="flatNo" placeholder="Status" value></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Rent</label>
            <div class="col-lg-4">
              <input type="number" class="form-control input-lg" name="inputnoofpeople" placeholder="Rent"></input>
            </div>
          </div>
          <Button type="submit" className="btnAddAmenity">Add  Amenity</Button>
        </Form>

      </div>
    </div>
  )
}

export default Addeditamenity

