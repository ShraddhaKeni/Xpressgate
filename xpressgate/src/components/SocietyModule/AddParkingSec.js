import React from 'react';
import "../SocietyModule/AddParkingSec.css"
import LogOut from './Utils/LogOut'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';



const AddParkingSec = () => {
 

  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
        <div className="addflatheadersection">
          <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="afsociety"><label>Society</label></div>
          <div id="afspace"></div>
          <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="afsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aflogoutbutton"><LogOut/></div>
        </div>
    
    </div>
      <div id="societynamesection">
        <div className="AP_societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        
        <div className="addguard_sideimg">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
      <div className='Addflatdisplay'>
          <label>Add Parking Section</label>
        </div>
        <Form className='formclass'>
         
         <div class="form-group form-group6 row">
           <label class="col-lg-2 col-form-label labelsize1">New Parking Section</label>
           <div class="col-lg-4">
         
            <input type="text" class="form-control input-lg " name="New Parking"  />
           </div>
         </div>
         <div className="form-group row">
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-2 col-form-label aiolabelsize">Block</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select className="form-control input-lg" id='block' >
                <option value={null} disabled selected>Block</option>
                
                </select>
                </div></div>
         
         <Button type="submit" className="AP_Button">Add Parking Section</Button>
         </Form>

      </div>
    </div>
       
       
  );
}

export default AddParkingSec;
