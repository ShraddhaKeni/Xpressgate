import React, { useEffect, useState } from "react";
import "./Addguard.css";
import LogOut from './Utils/LogOut'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { checkSociety } from '../auth/Auth'
import { useNavigate } from 'react-router-dom';
import { mobileValidation, emailValidation } from '../auth/validation';
import { Loader } from "../Loader";
import { ToastMessage } from '../ToastMessage';
import ErrorScreen from "../../common/ErrorScreen";

const Addguard = () => {
  const [toast, setToast] = useState({ show: false })
  const [loading, setLoading] = useState(true)
  const [guard, setGuard] = useState({})
  const location = useLocation()
  const [type, setType] = useState('add')
  const navigate = useNavigate()
  const [isError,setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      if (type == 'edit') {
        
        if (await mobileValidation(document.getElementById('phone').value) && emailValidation(document.getElementById('email').value)) {
          let formdata = new FormData()
          formdata.append('community_id', localStorage.getItem('community_id'))
          formdata.append('firstname', document.getElementById('firstname').value)
          formdata.append('lastname', document.getElementById('lastname').value)
          formdata.append('username', document.getElementById('username').value)
          formdata.append('mobileno', document.getElementById('phone').value)
          formdata.append('email', document.getElementById('email').value)
          formdata.append('guard_id', location.state.id)
          if (document.getElementById('profilePic').value) {
            formdata.append('profile_pic', document.getElementById('profilePic').files[0])
          }

          const { data } = await axios.post(`${window.env_var}api/guard/update`, formdata)
          setToast({ show: true, type: "success", message: "Updated successfully" })
          setTimeout(() => {
            window.location.href = '/guardList'
          }, 1500);
          // window.location.href = '/guardList'
        } else {
          setToast({ show: true, type: "error", message: 'Enter valid mobile number/ Email Id' });
          // alert('Enter valid mobile number/ Email Id')
        }
      }
      else {
       
        if (await mobileValidation(document.getElementById('phone').value) && emailValidation(document.getElementById('email').value)) {
          let formdata = new FormData()
          formdata.append('community_id', localStorage.getItem('community_id'))
          formdata.append('firstname', document.getElementById('firstname').value)
          formdata.append('lastname', document.getElementById('lastname').value)
          formdata.append('username', document.getElementById('username').value)
          formdata.append('password', document.getElementById('password').value)
          formdata.append('mobileno', document.getElementById('phone').value)
          formdata.append('email', document.getElementById('email').value)
          formdata.append('profile_pic', document.getElementById('profilePic').files[0])
          const { data } = await axios.post(`${window.env_var}api/guard/add`, formdata)
         
          setToast({ show: true, type: "success", message: "Added successfully" })
          setTimeout(() => {
            window.location.href = '/guardList'
          }, 1500);
          // window.location.href = '/guardList'
        } else {
          setToast({ show: true, type: "error", message: 'Enter valid mobile number/ Email Id' });
        }
      }
    } catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
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
            getGuardDetails()
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
      setLoading(false);
    }
    else {
      window.location.href = '/'
    }



  }, [])

  const getGuardDetails = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/guard/getone/${location.state.id}`)
      setGuard(data.data)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  if(isError)
    return <ErrorScreen/>

  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <div className="addflatheadersection">
          <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="afsociety"><label>Society</label></div>
          <div id="afspace"></div>
          <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="afsetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aflogoutbutton"><LogOut /></div>
        </div>

      </div>
      <div id="societynamesection">
        <div className="AGSname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>

        <div className='GLsidelinks'>
          <a className='noticegll' href="/guardlist">Guard list</a><br></br><br></br>
          <a className='aggnotice' onClick={() => navigate('/addGuard')}><b>{type == 'edit' ? 'Update Guard' : 'Add Guard'}</b></a>
        </div>
        <div className="AGSideimg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <Loader loading={loading}>
          <div className='AG_display'>
            <label>{type == 'edit' ? 'Update Guard' : 'Add Guard'}</label>
          </div>
          <Form className='FormClass'>
            <div class="form-group form-group6 row">
              <label class="col-lg-3 col-form-label ADN_label">First name</label>
              <div class="col-lg-4">
                {type == 'edit' ? <input type="text" class="form-control input-lg SideB" name="First name" id='firstname' placeholder="First Name" defaultValue={guard.firstname} /> :
                  <input type="text" class="form-control input-lg input-lg1 SideB" name="First name" id='firstname' placeholder="First Name" />}
              </div>
            </div>
            <div class="form-group form-group6 row">
              <label class="col-lg-3 col-form-label ADN_label">Last name</label>
              <div class="col-lg-4">
                {type == 'edit' ? <input type="text" class="form-control input-lg SideB" name="Last name" id='lastname' defaultValue={guard.lastname} placeholder="Last name" /> :
                  <input type="text" class="form-control input-lg input-lg1 SideB" name="Last name" id='lastname' placeholder="Last name" />}

              </div>
            </div>
            <div class="form-group form-group6 row">
              <label class="col-lg-3 col-form-label ADN_label">Username</label>
              <div class="col-lg-4">
                {type == 'edit' ? <input type="text" class="form-control input-lg SideB" name="Last name" id="username" defaultValue={guard.username} placeholder="Username" />
                  : <input type="text" class="form-control input-lg input-lg1 SideB" name="Last name" id="username" placeholder="Username" />}

              </div>
            </div>
            {type !== 'edit' ?
              <div class="form-group form-group6 row">
                <label class="col-lg-3 col-form-label ADN_label">Password</label>
                <div class="col-lg-4">
                  <input type="text" class="form-control input-lg input-lg1 SideB" name="Last name" id="password" placeholder="Password"></input>
                </div>
              </div>
              : ''
            }
            <div class="form-group form-group6 row">
              <label class="col-lg-3 col-form-label ADN_label">Phone No</label>
              <div class="col-lg-4">
                {type == 'edit' ? <input type="text" class="form-control input-lg SideB" name="Phone No" id="phone" defaultValue={guard.mobileno} placeholder="Phone No" /> :
                  <input type="text" class="form-control input-lg input-lg1 SideB" name="Phone No" id="phone" placeholder="Phone No" />}
              </div>
            </div>
            <div class="form-group form-group6 row">
              <label class="col-lg-3 col-form-label ADN_label">Email </label>
              <div class="col-lg-4">
                {type == 'edit' ? <input type="email" class="form-control input-lg SideB" name="Email" id='email' defaultValue={guard.email} placeholder="Email" /> :
                  <input type="email" class="form-control input-lg input-lg1 SideB" name="Email" id='email' placeholder="Email" />}
              </div>
            </div>
            <div class="form-group form-group6 row">
              <label class="col-lg-3 col-form-label ADN_label">Add Profile Picture</label>
              <div class="col-lg-4">
                <input type="file" class="form-control input-lg input-lg1 SideB" name="Add Profile Picture" id="profilePic"></input>
              </div>
            </div>

            <button type="submit" onClick={(e) => handleSubmit(e)} className="AGBtn">{type == 'edit' ? 'Update Guard' : 'Add Guard'}</button>
          </Form>
        </Loader>
      </div>
    </div>



  );
};

export default Addguard;
