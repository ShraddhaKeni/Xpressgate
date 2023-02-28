import LogOut from "./Utils/LogOut";
import { Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../Loader";
import { ToastMessage } from '../ToastMessage';
import GuardHeader from "./Utils/GuardHeader";
import GuardMobileSidebar from "../GuardMobileSidebar";
const EditGuard = () => {
  const [toast, setToast] = useState({ show: false })
  const [guard, setGuard] = useState({})
  const [loading, setLoading] = useState(true)
  const [menu, setMenuOpen] = useState(false)

  useEffect(() => {
    getGuardDetails()
  }, [])

  const getGuardDetails = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/guard/getone/${localStorage.getItem('guard_id')}`)
      setGuard(data.data)
      setLoading(false);
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
      setToast({ show: true, type: "success", message: "Guard updated successfully" })
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1500);
      // window.location.href = '/dashboard'

    } catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
    }
  }

  return (
    <>
      <div className="aiocontainer">
      <div id="aiosection">
        <GuardHeader onMenuClick={() => {
          setMenuOpen(true)
        }} />
      </div>
      <div id="aiosocietysection">
        <div className='aiosocietyname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>{localStorage.getItem('name')}</label>
        </div>
        <div className='aiosideimage'>
          <img src="/images/sideimage.svg" alt="guard sideimage" />
        </div>
      </div>
        <div className="addguestbackgroundimg">
          <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
          <div className="VPaydisplay">
            <label>Update Guard</label>
          </div>
          <Loader loading={loading}>
            <Form className="formclass" >
              <div class="form-group row" onSubmit={(e) => handleSubmit(e)}>
                <label class="col-lg-2 col-form-label ADN_label">First Name</label>
                <div class="col-lg-4">
                  <input required type="text" class="form-control input-lg SideB" id='firstname' name="First name" placeholder="First name" defaultValue={guard.firstname}>
                  </input>

                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Last Name</label>
                <div class="col-lg-4">
                  <input required type="text" class="form-control input-lg SideB" id='lastname' name="Last name" placeholder="Last name" defaultValue={guard.lastname} />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">User Name</label>
                <div class="col-lg-4">
                  <input required type="text" class="form-control input-lg SideB" id='username' name="User name" placeholder="User name" readOnly defaultValue={guard.username} />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Mobile No</label>
                <div class="col-lg-4">
                  <input requird type="number" class="form-control input-lg SideB" id='phone' name="Mobile No" placeholder="XXX-XXX-XXXX" readOnly defaultValue={guard.mobileno} />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Email</label>
                <div class="col-lg-4">
                  <input required type="email" class="form-control input-lg SideB" id='email' name="Email" placeholder="XYZ@.com" defaultValue={guard.email} />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-2 col-form-label ADN_label">Profile Picture</label>
                <div class="col-lg-4">
                  <input required type="file" class="form-control input-lg SideB" id='profilePic' name="profle pic" />
                </div>
              </div>

              <button type="submit" className="VPay_Add" onClick={(e) => handleSubmit(e)} >
                Update Guard
              </button>
            </Form>
          </Loader>
        </div>

        <GuardMobileSidebar open={menu} onHide={() => setMenuOpen(false)} />

      </div >
    </>


  );
}

export default EditGuard;