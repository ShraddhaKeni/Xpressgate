import React from 'react';
import './Addvendor.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import HeaderSection from './Utils/HeaderSection';
import GuardSideSection from './Utils/GuardSideSection';

const Addvendor = () => {
  return (
    <div className="addvendorcontainer">
     <HeaderSection/>
      <GuardSideSection/>
      <div className='backgroundimg'>
        <div className='Addvendordisplay'>
          <label>Add Vendor</label>
        </div>
        <Form className='formclass'>
          <div class="form-group row">
              <label for="inputentryno" class="col-lg-2 col-form-label labelsize">Entry No</label>
              <div class="col-lg-4">
                <select class="form-control input-lg" id="inputentryno"></select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Guest Name</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" id="inputguestname"></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Block No</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg" id="inputblockno"></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Flat No</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg" id="inputflatno"></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Vehicle No</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg" id="inputvehicleno"></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">No of people</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg" id="inputnoofpeople"></input>
              </div>
            </div>
            <Button type="submit" className="btnAdd">Add</Button>
        </Form>

      </div>
    </div>
  )
}

export default Addvendor

