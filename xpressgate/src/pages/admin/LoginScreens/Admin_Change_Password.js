import React, { useEffect, useRef, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import Header from '../../../components/base/Layout/Header';
import SideLayOut from '../../../components/base/Layout/SideLayOut';


const Admin_Change_Password = () => {
 
  return (
    <>
    <img src='/images/side_bar_img.svg' className='ADDVideo_side_Img' />
      <div >
        <div className="page-label">
          <label>Edit Video</label>
        </div>
        <div className="addvideoform">
          <div className="inboxes">
            <label for="EVideoName" className="Evideoname">Video Name</label>
            <input type="text" id="EVideoName"  className="Evideonameinput"  placeholder="Video Name"></input>
          </div>
          <br />

          <br />
          <div className="inboxes">
            <label for="EVideoUrl" className="EvideoUrl">Video Url</label>
            <input type="text" id="EVideoURL" className="EvideoUrlinput" placeholder="Video Url"></input>
          </div>
          <div className="d-flex" style={{ marginLeft: '18vw', marginTop: '10%' }}>
            <div><button type="button"  className="EditSaveButton">Edit & Save</button></div>
            <div><button type="button" className="VideoRemoveButton">Remove</button></div>
          </div>
        </div>
        <br />

      </div>
</>
  
  )
}

export default Admin_Change_Password;