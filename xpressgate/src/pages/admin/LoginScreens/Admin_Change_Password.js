import React, { useEffect, useRef, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import Header from '../../../components/base/Layout/Header';


const Admin_Change_Password = () => {
 
  return (
    <div className="changesocContainer">
      <div id="changesocsection">
        <Header />
      </div>
      <div id="scpnamesection">
        <div className='CPSName'>
          <img src="/images/AdminSideicon.svg" alt="Society image" />
          <label>User Name</label>
        </div>
        <div className='ADCPpsideimage'><img src="/images/side_bar_img.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='scpbackgroundimg'>
        <div className='scpmaintitle'>
          <label>Change Password</label>
        </div>
        <Form className='scpclass'>
          <div className="scpinput_fields">
            <div className="scppassword">
              <div class="form-group row">
                <div class="col-lg-6">
                  <label className="scpcppassword">Current Password</label>
                  <input type="text" className="form-control input-lg CP_Border"  placeholder="Current Password"></input>
                </div>
              </div>
            </div>
            <br></br>
            <div className="scppassword">
              <div class="form-group row">
                <div class="col-lg-6">
                  <label className="ncppassword">New Password</label>
                  <input  type="password" className="form-control input-lg CP_Border" placeholder="New Password"></input>
                </div>
              </div>
            </div>
            <br></br>
            <div className="scppassword">
              <div class="form-group row">
                <div class="col-lg-6">
                  <label className="cscppassword">Confirm Password</label>
                  <input type="password" className="form-control input-lg CP_Border"  placeholder="Confirm Password"></input>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btnUpdatecp">Update</button>
        </Form>

      </div>
    </div>
  )
}

export default Admin_Change_Password