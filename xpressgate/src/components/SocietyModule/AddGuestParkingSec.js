import React from 'react';
import "../SocietyModule/AddParkingSec.css";
import { Form } from 'react-bootstrap';
import SocietyHeader from './Utils/Societyheader';
// import { Loader } from "../Loader";
// import { ToastMessage } from '../ToastMessage';
// import ErrorScreen from '../../common/ErrorScreen';
const AddGuestParkingSec = () => {
  
  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <SocietyHeader/>
      </div>
      <div id="societynamesection">
        <div className="AP_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <div className='vgpsidelinks'>
        
          <a href='/viewguestparkingsection' className='Viewpsec'>View Guest Parking Section</a><br/><br/>
          <a href='/addguestparkingsection' className='Addpsec'><b>Add Guest Parking Section</b></a><br/><br/>
        
        </div>
        <div className="AddGparking_sideimg">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
      {/* <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
      <Loader loading={loading}> */}
        <div className='APdisplay'>
          <label>Add Guest Parking Section</label>
        </div>
        <Form className='formclass'> 
          <div className="form-group row">
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-2 col-form-label ADN_label">Block</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select className="form-control input-lg ADDParkBor" id='block_id' >
                <option value={null} disabled selected>Select Block</option>
                {/* {block.map(item=>{
                  return (
                    <option value={item.id}>{item.name}</option>
                  )
                })} */}
              </select>
            </div>
          </div>
          <div class="form-group form-group6 row">
            <label class="col-lg-2 col-form-label ADN_label">Name</label>
            <div class="col-lg-4">
              <input type="text" id="section" class="form-control input-lg ADDParkBor" name="New Parking" placeholder='Name' />
            </div>
          </div>
          <button type="submit" className="AP_Button">Add Parking</button>
        </Form>
        {/* </Loader> */}
      </div>
    </div>
  );
}

export default AddGuestParkingSec;
