import React, { useEffect, useState, useRef } from 'react';
import './Addnotice.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut from './Utils/LogOut';
import axios from 'axios'
import { useLocation } from "react-router-dom";
import { checkSociety } from '../auth/Auth'
import { useNavigate } from 'react-router-dom';

const Addnotice = () => {
  const [notice, setNotice] = useState({})
  const location = useLocation()
  const [type, setType] = useState('add')
  const navigate = useNavigate()
  const notice_date_ref = useRef([])
  const notice_time_ref = useRef([])
  

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      var tzoffset = (new Date()).getTimezoneOffset() * 60000;
      let date = new Date(document.getElementById('notice_date').value+'T'+document.getElementById('notice_time').value+':00');//.toISOString();
      var localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, -1);
      console.log(date);
      console.log(localISOTime);
      if (type == 'edit') {
        let formdata = new FormData();
        if (document.getElementById('attachment').value) {
          const file = document.getElementById('attachment').files[0];
          if (file.type != "application/pdf") {
            document.getElementById("attachment").style.border = "2px solid red";
          }
          else{
            document.getElementById("attachment").style.border = "2px solid #14335D";
            formdata.append('attachment', document.getElementById('attachment').files[0]);
            formdata.append('noticeTitle', document.getElementById('notice_title').value);
            formdata.append('noticeBody', document.getElementById('notice_description').value);
            formdata.append('eventDate',localISOTime);
            formdata.append('fromTime', localISOTime);
            formdata.append('toTime', localISOTime);
            formdata.append('community_id', localStorage.getItem('community_id'));
            formdata.append('id', location.state.id);
            
            const { data } = await axios.post(`${window.env_var}api/notices/updateNotice`, formdata);
            window.location.href = '/noticeList'
          }
        }
        else{
            formdata.append('noticeTitle', document.getElementById('notice_title').value);
            formdata.append('noticeBody', document.getElementById('notice_description').value);
            formdata.append('eventDate',localISOTime);
            formdata.append('fromTime', localISOTime);
            formdata.append('toTime', localISOTime);
            formdata.append('community_id', localStorage.getItem('community_id'));
            formdata.append('id', location.state.id);

            const { data } = await axios.post(`${window.env_var}api/notices/updateNotice`, formdata);
            console.log(data);
            //window.location.href = '/noticeList'
        }
      }
      else {
        const file = document.getElementById('attachment').files[0];
        if (file.type != "application/pdf") {
          document.getElementById("attachment").style.border = "2px solid red";
          //return;
        }
        else{
          let formdata = new FormData()
          formdata.append('noticeTitle', document.getElementById('notice_title').value)
          formdata.append('noticeBody', document.getElementById('notice_description').value)
          formdata.append('eventDate',localISOTime)
          formdata.append('fromTime', localISOTime)
          formdata.append('toTime', localISOTime)
          formdata.append('community_id', localStorage.getItem('community_id'))
          formdata.append('attachment', document.getElementById('attachment').files[0])

          const { data } = await axios.post(`${window.env_var}api/notices/addNotice`, formdata)
          window.location.href = '/noticeList'
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (checkSociety()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/society/checkLogin`, config)
        .then(({ data }) => {
          if (location.state) {
            getNoticeDetails()
            setType(location.state.type)
          }
          else {
            // window.history.back(-1)
          }
        })
        .catch(err => {
          localStorage.clear();
          window.location.href = '/societylogin'
        })
    }
    else {
      window.location.href = '/'
    }
  }, [])

  const getNoticeDetails = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/notices/getOne/${location.state.id}`)
      setNotice(data.data.notice[0]);
      document.getElementById('notice_date').value=new Date(data.data.notice[0].eventDate).toISOString().split('T')[0];
      let ntime = data.data.notice[0].eventDate.split('T');
      let titime  = ntime[1].split('.');
      let for_time = titime[0].split(':');
      let nt = for_time[0]+':'+for_time[1];
      document.getElementById('notice_time').value=nt;
    } catch (error) {

    }
  }

  const fileChange = e => {
    const file = e.target.files[0];
    if (file.type != "application/pdf") {
      document.getElementById("attachment").style.border = "2px solid red";
    }
    else{
      document.getElementById("attachment").style.border = "2px solid #14335D";
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
          <label>{type=='edit'?'Update':'Add'} Notice</label>
        </div>
        <Form className='anformclass'>
          <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label ADN_label">Title</label>
            <div class="col-sm-6 col-md-6 col-lg-6">
              <input type="text" id='notice_title' class="form-control input-lg AD_input_size" name="title" defaultValue={notice.noticeTitle?notice.noticeTitle:''} placeholder="Title" required></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Date</label>
            <div class="col-lg-2">
              <input type="date" id='notice_date' class="form-control input-lg AD_input_size" name="date" placeholder="Date" ref={notice_date_ref}></input>
            </div>
            <label class="col-lg-2 col-form-label ADN_label">Time</label>
            <div class="col-lg-2">
              <input type="time" id='notice_time' class="form-control input-lg AD_input_size" name="time" placeholder="Time" ref={notice_time_ref}></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Description</label>
            <div class="col-lg-6">
              <textarea  type="number" id='notice_description' class="form-control input-lg AD_input_size" defaultValue={notice.noticeBody?notice.noticeBody:''} name="description" placeholder="Description"></textarea >
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Attachments</label>
            <div class="col-lg-6">
              <input type="file" class="form-control input-lg AD_input_size" id="attachment" name="attachments" placeholder="Upload from computer" onChange={fileChange} ></input>
            </div>
          </div>
          <button type="submit" onClick={(e)=>handleSubmit(e)} className="AddNoticeButton">{type=='edit'?'Update':'Add'} Notice</button>
        </Form>

      </div>
    </div>
  )
}

export default Addnotice

