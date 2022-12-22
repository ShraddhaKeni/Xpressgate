import React, { useEffect, useRef, useState } from 'react'
import '../SocietyModule/ChangePassword.css'
import { useLocation } from "react-router-dom";
import { validatePassword } from "../auth/validation";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Societyheader from './Utils/Societyheader';


const ChangePassword = () => {
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
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (await validatePassword(password.current.value)) {
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
        alert('Wrong password')
        document.querySelector('input').style.border = '1px solid red'
      }


    } catch (error) {
      document.querySelector('input').style.border = '1px solid red'
    }
  }
  return (
    <div className="changesocContainer">
      <div id="changesocsection">
        <Societyheader />
      </div>
      <div id="scpnamesection">
        <div className='CPSName'>
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <div className='scpsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
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
                  <input ref={oldpass} type="text" className="form-control input-lg CP_Border" id="oldpass" placeholder="Current Password"></input>
                </div>
              </div>
            </div>
            <br></br>
            <div className="scppassword">
              <div class="form-group row">
                <div class="col-lg-6">
                  <label className="ncppassword">New Password</label>
                  <input ref={password} type="password" className="form-control input-lg CP_Border" id="loginpassword" placeholder="New Password"></input>
                </div>
              </div>
            </div>
            <br></br>
            <div className="scppassword">
              <div class="form-group row">
                <div class="col-lg-6">
                  <label className="cscppassword">Confirm Password</label>
                  <input ref={confirmPass} type="password" className="form-control input-lg CP_Border" id="loginpassword" placeholder="Confirm Password"></input>
                </div>
              </div>
            </div>
          </div>
          <Button type="submit" onClick={(e) => handleSubmit(e)} className="btnUpdatecp">Update</Button>
        </Form>

      </div>
    </div>
  )
}

export default ChangePassword