import React, { useEffect, useRef, useState } from 'react'
import '../SocietyModule/Main_reset.css'
import { useLocation } from "react-router-dom";
import { validatePassword } from "../auth/validation";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import GuardHeader from './Utils/GuardHeader';
import { Loader } from "../Loader";
import { ToastMessage } from '../ToastMessage';
import PasswordNotice from '../PasswordNotice';

const ChangePassword = () => {
  const [toast, setToast] = useState({ show: false })
  const [loading, setLoading] = useState(true)
  const password = useRef([])
  const confirmPass = useRef([])
  const oldpass = useRef([])
  const [guard, setGuard] = useState({})


  useEffect(() => {
    getDetails()
  }, [])

  const getDetails = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/guard/getone/${localStorage.getItem('guard_id')}`)
      setGuard(data.data)
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (await validatePassword(password.current.value)) {
        setToast({ show: true, type: "success", message: "Password changed successfully" });
        if ((password.current.value === confirmPass.current.value) && (password.current.value !== "" && confirmPass.current.value !== "")) {
          const config = {
            headers: {
              'x-access-token': localStorage.getItem('accesstoken')
            }
          }
          const sendData = {
            username: guard.username,
            password: oldpass.current.value,
            newpassword: password.current.value,
            confirmpassword: confirmPass.current.value,
            id: localStorage.getItem('member_id')
          }
          const { data } = await axios.post(`${window.env_var}api/guard/changepassword`, sendData, config)

          console.log(data)
        }
      }
      else {
        // alert('Wrong password')
        setToast({ show: true, type: "error", message: "Password must be at least 8 characters long must contain a number, uppercase lowercase and a special character." });
        document.querySelector('input').style.border = '1px solid red'
      }


    } catch (error) {
    
      document.querySelector('input').style.border = '1px solid red'
    }
  }
  return (
    <div className="changePwdContainer">
      <div id="changePwdsection">
        <GuardHeader />
      </div>
      <div id="cpnamesection">
        <div className='CP_GName'>
          <img src="/images/guardnameicon.svg" alt="Guard image" />
          <label>{localStorage.getItem('name')}</label>
        </div>
        <div className='CP_SideIMG'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='addguestbackgroundimg'>
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <div className='CPass_dsplay'>
          <label>Change Password</label>
        </div>
        <Loader loading={loading}>
        <Form className='CPForm'>
          <div className="cpinput_fields">
            <div className="password">
              <div class="form-group row">
                <div class="col-lg-6">
                  <label className="CPASS">Current Password</label>
                  <input ref={oldpass} type="text" className="form-control input-lg CP_input" id="oldpass" placeholder="Current Password"></input>
                  </div>
              </div>
            </div>
            {/* <label className='Message'>*Password must be at least 8 characters long must contain <br/>a number, uppercase lowercase and a special character.</label> */}
            <br></br>
            <div className="password">
              <div class="form-group row">
                <div class="col-lg-6">
                  <label className="NPASS">New Password</label>
                  <input ref={password} type="password" className="form-control input-lg NP_input" id="loginpassword" placeholder="New Password"></input>
                </div>
              </div>
            </div>
            <br></br>
            <div className="password">
              <div class="form-group row">
                <div class="col-lg-6">
                  <label className="CHPASS">Confirm Password</label>
                  <input ref={confirmPass} type="password" className="form-control input-lg CHP_input" id="loginpassword" placeholder="Confirm Password"></input>
                </div>
              </div>
            </div>
          </div>
    <PasswordNotice/>
          <button type="submit" onClick={(e) => handleSubmit(e)} className="CHPASS_BTN">Update</button>
        </Form>
        </Loader>
      </div>
    </div>
  )
}

export default ChangePassword