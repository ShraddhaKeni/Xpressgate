import LogOut from "./Utils/LogOut";
import { Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

const EditGuard = () => {
  const [guard, setGuard] = useState({})

  useEffect(() => {
    getGuardDetails()
  }, [])

  const getGuardDetails = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/guard/getone/${localStorage.getItem('guard_id')}`)
      setGuard(data.data)
    } catch (error) {

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      let formdata = new FormData()
      formdata.append('firstname', document.getElementById('firstname').value)
      formdata.append('lastname', document.getElementById('lastname').value)
      formdata.append('username', document.getElementById('username').value)
      formdata.append('mobileno', document.getElementById('phone').value)
      formdata.append('email', document.getElementById('email').value)
      formdata.append('guard_id', localStorage.getItem('guard_id'))
      
      if (document.getElementById('profilePic').value) {
        formdata.append('profile_pic', document.getElementById('profilePic').files[0])
      }

      const { data } = await axios.post(`${window.env_var}api/guard/update`, formdata)

      window.location.href = '/dashboard'

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <div className="addflatheadersection">
          <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="afsociety"><label>Guard</label></div>
          <div id="afspace"></div>
          <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="afsetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aflogoutbutton"><LogOut /></div>
        </div>

      </div>
      <div id="societynamesection">
        <div className="VPay_societyname">
          <img src="/images/guardnameicon.svg" alt="Society image" />
          <label>Guard Name</label>
        </div>
        <br />

        <div className="VPay_sideimg">
          <img src="/images/sideimage.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="VPaydisplay">
          <label>Edit Guard</label>
        </div>
        <Form className="formclass">
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">First Name</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg SideB" id='firstname' name="First name" placeholder="First name" defaultValue={guard.firstname}>
              </input>

            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Last Name</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg SideB" id='lastname' name="Last name" placeholder="Last name" defaultValue={guard.lastname} />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">User Name</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg SideB" id='username' name="User name" placeholder="User name" readOnly defaultValue={guard.username} />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Mobile No</label>
            <div class="col-lg-4">
              <input type="number" class="form-control input-lg SideB" id='phone' name="Mobile No" placeholder="XXX-XXX-XXXX" readOnly defaultValue={guard.mobileno} />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Email</label>
            <div class="col-lg-4">
              <input type="email" class="form-control input-lg SideB" id='email' name="Email" placeholder="XYZ@.com" defaultValue={guard.email} />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Profile Picture</label>
            <div class="col-lg-4">
              <input type="file" class="form-control input-lg SideB" id='profilePic' name="profle pic" />
            </div>
          </div>

          <button type="submit" onClick={(e) => handleSubmit(e)} className="VPay_Add">
            Edit
          </button>
        </Form>
      </div>
    </div>

  );
}

export default EditGuard;