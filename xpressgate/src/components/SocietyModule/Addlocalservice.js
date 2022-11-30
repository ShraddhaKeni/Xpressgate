import React, { useEffect, useState } from 'react';
import './Addlocalservice.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Societyheader from './Utils/Societyheader';
import { Link } from 'react-router-dom';

const Addlocalservice = () => {

  return (
    <div className="alscontainer">
      <div id="alssection">
        <Societyheader />
      </div>
      <div id="alssocietysection">
        <div className='alssocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='alssidelinks'>
          <Link>Local Services</Link><br></br><br></br>
          <Link to='/addlocalservice'>Add Local Services</Link>
        </div>
        <div className='alssideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='alsbackgroundimg'>
        <div className='alsdisplay'>
          <label>Add Local Service</label>
        </div>
        <Form className='formclass'>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Vendor Name</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg" id='vendor_name' name="flatNo" placeholder="Vendor Name"></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Vendor type</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg" id='venf=dor_type' name="flatNo" placeholder="Vendor type"></input>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label labelsize">Added By</label>
            <div class="col-sm-4 col-md-4 col-lg-4">
              <select class="form-control input-lg" id='added_by'>
                <option value={null} disabled selected>Added By</option>
              
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Status</label>
            <div class="col-lg-4">
              <select class="form-control input-lg" id="status" placeholder="Block">
                <option value={null} disabled selected>Status</option>
               
              </select>
            </div>
          </div>

          <Button type="submit" className="btnAddV">Add Vendor</Button>
        </Form>

      </div>
    </div>
  )
}

export default Addlocalservice

