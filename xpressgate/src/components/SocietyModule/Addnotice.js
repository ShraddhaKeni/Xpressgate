import React from 'react';
import './Addnotice.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut from './Utils/LogOut';
import axios from 'axios'

const Addnotice = () => {

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
     
      let date = new Date(document.getElementById('notice_date').value+'T'+document.getElementById('notice_time').value+':00').toISOString()
      const sendData = {
        noticeTitle:document.getElementById('notice_title').value,
        noticeBody:document.getElementById('notice_description').value,
        eventDate:date,
        fromTime:date,
        toTime:date,
        community_id:localStorage.getItem('community_id')  //will be from localstorage
      }

      const {data} = await axios.post(`${window.env_var}api/notices/addNotice`,sendData)
      window.location.href='/noticeList'
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="ancontainer">
      <div id="ansection">
        <div className="anheadersection">
          <div id="anlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="ansociety"><label>Society</label></div>
          <div id="anspace"></div>
          <div id="annotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="ansetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="anlogoutbutton"><LogOut /></div>
        </div>
      </div>
      <div id="ansocietysection">
        <div className='ansocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='nlsidelinks'>
          <a className='NLSLink' href="/noticelist">Notice List</a><br></br><br></br>
          <a className='ANSLink' href="/addNotice"><b>Add Notice</b></a>
        </div>
        <div className='ansideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='anbackgroundimg'>
        <div className='addnoticedisplay'>
          <label>Add Notice</label>
        </div>
        <Form className='anformclass'>
          <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label ADN_label">Title</label>
            <div class="col-sm-6 col-md-6 col-lg-6">
              <input type="text" id='notice_title' class="form-control input-lg AD_input_size" name="title" placeholder="Title"></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Date</label>
            <div class="col-lg-2">
              <input type="date" id='notice_date' class="form-control input-lg AD_input_size" name="date" placeholder="Date"></input>
            </div>
            <label class="col-lg-2 col-form-label ADN_label">Time</label>
            <div class="col-lg-2">
              <input type="time" id='notice_time' class="form-control input-lg AD_input_size" name="time" placeholder="Time"  ></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Description</label>
            <div class="col-lg-6">
              <textarea  type="number" id='notice_description' class="form-control input-lg AD_input_size" name="description" placeholder="Description"></textarea >
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Attachments</label>
            <div class="col-lg-6">
              <input type="file" class="form-control input-lg AD_input_size" name="attachments" placeholder="Upload from computer" ></input>
            </div>
          </div>
          <button type="submit" onClick={(e)=>handleSubmit(e)} className="AddNoticeButton">Add Notice</button>
        </Form>

      </div>
    </div>
  )
}

export default Addnotice

