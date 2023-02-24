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
import GuardMobileSidebar from '../GuardMobileSidebar';

const ChangePassword = () => {
  const [toast, setToast] = useState({ show: false })
  const [loading, setLoading] = useState(true)
  const password = useRef([])
  const confirmPass = useRef([])
  const oldpass = useRef([])
  const [guard, setGuard] = useState({})
  const [menu, setMenuOpen] = useState(false)

  const initialState = {
    password: "",
    confirmPass: "",
  };

  const passVerificationError = {
    isLenthy: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpclChr: false,
    confirmPass: false,
  };
  const [passwordError, setPasswordError] = useState(passVerificationError);
  const [newUser, setNewUser] = useState(initialState);


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

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setNewUser({ ...newUser, [name]: value });

    if (name === "password") {
      const isLenthy = value.length > 8;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpclChr = /[@,#,$,%,&]/.test(value);

      setPasswordError({
        ...passwordError,
        isLenthy,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpclChr,
      });
    }

    if (name === "confirmPass") {
      setPasswordError({
        ...passwordError,
        confirmPass: newUser.password === value,
      });
    }
  };

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
            id: localStorage.getItem('guard_id')
          }
          const { data } = await axios.post(`${window.env_var}api/guard/changepassword`, sendData, config)
          if (data.status_code == 200) {
            setToast({ show: true, type: "success", message: "Password changed successfully" });
            setTimeout(() => {
              window.location.href = '/dashboard'
            }, 1500);
          }
          else {
            setToast({ show: true, type: "error", message: "Something went wrong, please try again later" });
          }
        }
      }
      else {
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
        <GuardHeader onMenuClick={() => {
          setMenuOpen(true)
        }} />
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
                    <input ref={oldpass} type="password" className="form-control input-lg CP_input" id="oldpass" placeholder="Current Password"></input>
                  </div>
                </div>
              </div>
              {/* <label className='Message'>*Password must be at least 8 characters long must contain <br/>a number, uppercase lowercase and a special character.</label> */}
              <br></br>
              <div className="password">
                <div class="form-group row">
                  <div class="col-lg-6">
                    <label className="NPASS">New Password</label>
                    <input ref={password} type="password" className="form-control input-lg NP_input" id="loginpassword" placeholder="New Password" name="password" value={newUser.password} onChange={handleOnChange}></input>
                  </div>
                </div>
              </div>
              <br></br>
              <div className="password">
                <div class="form-group row">
                  <div class="col-lg-6">
                    <label className="CHPASS">Confirm Password</label>
                    <input ref={confirmPass} type="password" className="form-control input-lg CHP_input" id="loginpassword" placeholder="Confirm Password" name="confirmPass" value={newUser.confirmPass} onChange={handleOnChange}></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="NoticeContainer">
              <Form.Text>
                {!passwordError.confirmPass && (
                  <div className="text-danger mb-3">Password doesn't match!</div>
                )}
              </Form.Text>
              <ul className="mb-4">
                <li className={passwordError.isLenthy ? "text-success" : "text-danger"} >
                  Min 8 characters
                </li>
                <li className={passwordError.hasUpper ? "text-success" : "text-danger"} >
                  At least one upper case
                </li>
                <li className={passwordError.hasLower ? "text-success" : "text-danger"} >
                  At least one lower case
                </li>
                <li className={passwordError.hasNumber ? "text-success" : "text-danger"} >
                  At least one number
                </li>
                <li className={passwordError.hasSpclChr ? "text-success" : "text-danger"} >
                  At least on of the special characters i.e @ # $ % &{" "}
                </li>
              </ul>
            </div>
            <button type="submit" onClick={(e) => handleSubmit(e)} className="CHPASS_BTN">Update</button>
          </Form>
        </Loader>
      </div>
      <GuardMobileSidebar open={menu} onHide={() => setMenuOpen(false)} />

    </div>
  )
}

export default ChangePassword