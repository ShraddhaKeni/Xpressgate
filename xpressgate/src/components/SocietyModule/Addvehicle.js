import React from 'react';
import './Addvehicle.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut from './Utils/LogOut';
import { Link } from 'react-router-dom';

const Addvehicle = () => {
  return (
    <div className="addvehiclecontainer">
      <div id="addvehiclesection">
        <div className="addvehheadersection">
          <div id="avlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="avsociety"><label>Society</label></div>
          <div id="avspace"></div>
          <div id="avnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="avsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="avlogoutbutton"><LogOut /></div>
        </div>
      </div>
      <div id="avsocietysection">
        <div className='avsocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='avsidelinks'>
          <Link>Vehicle List</Link><br></br><br></br>
          <Link>Add Vehicle</Link>
        </div>
        <div className='avsideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='avbackgroundimg'>
        <div className='Addvehicledisplay'>
          <label>Allot Vehicle</label>
        </div>
        <Form className='formclass'>
          <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label labelsize">Resident name</label>
            <div class="col-sm-4 col-md-4 col-lg-4">
              <input type="number" class="form-control input-lg" name="community" placeholder="Resident name" value></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Vehicle Name</label>
            <div class="col-lg-4">
              <input type="number" class="form-control input-lg" name="inputnoofpeople" placeholder="Vehicle Name"></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Vehicle Make</label>
            <div class="col-lg-4">
              <input type="number" class="form-control input-lg" name="flatNo" placeholder="Vehicle Make" value></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Vehicle Model</label>
            <div class="col-lg-4">
              <input type="number" class="form-control input-lg" name="inputnoofpeople" placeholder="Vehicle Model"></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Parking section</label>
            <div class="col-lg-4">
              <select class="form-control input-lg" id="status" placeholder="Parking section"></select>
            </div>
          </div>
          <Button type="submit" className="btnAddVeh">Allot Vehicle</Button>
        </Form>

      </div>
    </div>
  )
}

export default Addvehicle

