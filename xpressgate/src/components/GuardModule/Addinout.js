import React from 'react';
import './Addinout.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import GuardHeader from './Utils/GuardHeader';

const Addinout = () => {
  return (
    <div className="aiocontainer">
      <div id="aiosection">
        <GuardHeader />
      </div>
      <div id="aiosocietysection">
        <div className='aiosocietyname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>Guard Name</label>
        </div>
        <div classNameName='aiosideimage'>
          <img src="/images/sideimage.svg" alt="guard sideimage" />
        </div>
      </div>
      <div classNameName='aiobackgroundimg'>
        <div className='aiodisplay'>
          <label>Add In Out</label>
        </div>
        <Form className='formclass'>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">Name</label>
            <div className="col-lg-4">
              <input type="text" className="form-control input-lg" id='name' name="flatNo" placeholder="Name"></input>
            </div>
          </div>
          <div className="form-group row">
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-2 col-form-label aiolabelsize">Visitor Type</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select className="form-control input-lg" id='visitor_type'>
                <option value={null} disabled selected>Visitor Type</option>

              </select>
            </div>
          </div>
          <div className="form-group row">
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-2 col-form-label aiolabelsize">Block</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select className="form-control input-lg" id='block'>
                <option value={null} disabled selected>Block</option>

              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">Flat No.</label>
            <div className="col-lg-4">
              <select className="form-control input-lg" id="flatno" placeholder="Flat No.">
                <option value={null} disabled selected>Flat No.</option>

              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">Contact No.</label>
            <div className="col-lg-4">
              <input type="text" className="form-control input-lg" id='contact_no' name="flatNo" placeholder="Contact No."></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">Date</label>
            <div className="col-lg-4">
              <input type="text" className="form-control input-lg" id='date' name="date" placeholder="Date"></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">In Time</label>
            <div className="col-lg-4">
              <input type="text" className="form-control input-lg" id='intime' name="intime" placeholder=" In Time"></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">Status</label>
            <div className="col-lg-4">
              <input type="text" className="form-control input-lg" id='status' name="status" placeholder="Status"></input>
            </div>
          </div>

          <Button type="submit" className="btnAddInOut" on>Add In Out</Button>
        </Form>

      </div>
    </div>
  )
}

export default Addinout

