import React from 'react';
import './Addlocalservice.css';

import { Form } from 'react-bootstrap';

import Societyheader from './Utils/Societyheader';


const UtilityPaymentLink = () => {
 

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
        {/* <div className='AddLSsidelinks'>
          <a className='LSsidelinks' href="/localservices">Local Service</a><br></br><br></br>
          <a className='ALSsidelinks' href="/addlocalservice"><b>Local Services</b></a>
        </div> */}
        <div className='UPL_SideImage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='alsbackgroundimg'>
        <div className='UPL_DisPlay'>
          <label>Add Utility Payment Link</label>
        </div>
        <Form className='formclass'>
        <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Utility Type</label>
            <div class="col-lg-4">
              <select class="form-control input-lg inputborder" id="service" placeholder="Service">
                <option value={null} disabled selected> Select Utility Type</option>
                <option value="Electricity"> Electricity </option>
                <option value="Water"> Water </option>
                <option value="LPG"> LPG </option>
                <option value="Landline"> Landline </option>
                
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Payment Link</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg inputborder" id='vendor_name' name="vendor_name" placeholder="Payment Link" ></input>
            </div>
          </div>
        
          <button type="submit" className="btnAddV">Add Link</button>
        </Form>
      </div>
    </div>
  )
}
export default UtilityPaymentLink;