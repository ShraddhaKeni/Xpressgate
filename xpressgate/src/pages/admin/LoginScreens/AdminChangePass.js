import React, { useEffect, useRef, useState } from "react";
import "../../../styles/AdminChangePass.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { validatePassword } from "../../../components/auth/validation";
import { ToastMessage } from "../../../components/ToastMessage";
import { TOAST } from "../../../common/utils";
import "../../../components/SocietyModule/ChangePassword.css";
import { Loader } from "../../../components/Loader";

const AdminChangePass = () => {
  const [toast, setToast] = useState({ show: false });
  const password = useRef([]);
  const confirmPass = useRef([]);
  const oldpass = useRef([]);
  const [mem, setMem] = useState({});
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, []);

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
    e.preventDefault();
    try {
      if (await validatePassword(password.current.value)) {
        if (password.current.value === confirmPass.current.value && password.current.value !== "" && confirmPass.current.value !== "") {
          const config = {
            headers: {
              "x-access-token": localStorage.getItem("accesstoken"),
            },
          };

          const sendData = {
            password: oldpass.current.value,
            newpassword: password.current.value,
            confirmpassword: confirmPass.current.value,
            id: localStorage.getItem("admin_id"),
          };
          const { data } = await axios.post(`${window.env_var}api/admin/changepassword`, sendData, config)
            .catch(function ChangePassError(error) {
              if (error.response) {
                if (error.response.status == 401) {
                  setToast(TOAST.ERROR("Incorrect Current Password"))
                }
              } else if (error.request) {

              } else {
                alert(error.message)
              }

            });
          if (data && data.status_code == 200) {
            setToast({ show: true, type: "success", message: "Password changed successfully" });
            setTimeout(() => {
              window.location.href = '/scDashboard'
            }, 1500);
          }
          else {
            setToast({ show: true, type: "error", message: data.message });
          }
        } else {
          setToast({
            show: true,
            type: "error",
            message:
              "Password do not match		",
          });
        }
      } else {
        setToast({
          show: true,
          type: "error",
          message:
            "Password must be at least 8 characters long must contain a number, uppercase lowercase and a special character.",
        });
        document.querySelector("input").style.border = "1px solid red";
      }
    } catch (error) {
      console.log(error);
      document.querySelector("input").style.border = "1px solid red";
    }
  };
  return (
    <div>
      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        handleClose={() => {
          setToast({ show: false });
        }}
      />
      <Loader loading={loading}>
        <div className='page-label'>
          <label>Change Password</label>
        </div>
        <Form className="scpclass" autoComplete="off">
          <div className="scpinput_fields">
            <div className="scppassword">
              <div class="form-group row">
                <div class="col-lg-6">
                  <label className="scpcppassword">Current Password</label>
                  <input
                    ref={oldpass}
                    type="password"
                    autoComplete="new-password"
                    className="form-control input-lg CP_Border"
                    id="oldpass"
                    placeholder="Current Password"
                  ></input>
                </div>
              </div>
            </div>
            {/* <label className='SocMessage'>*Password must be at least 8 characters long must contain<br/>a number, uppercase lowercase and a special character.</label> */}
            <br></br>
            <div className="scppassword">
              <div class="form-group row">
                <div class="col-lg-6">
                  <label className="ncppassword">New Password</label>
                  <input
                    ref={password}
                    type="password"
                    autoComplete="new-password"
                    className="form-control input-lg CP_Border"
                    id="loginpassword"
                    placeholder="New Password"
                    name="password" value={newUser.password} onChange={handleOnChange}
                  ></input>
                </div>
              </div>
            </div>
            <br></br>
            <div className="scppassword">
              <div class="form-group row">
                <div class="col-lg-6">
                  <label className="cscppassword">Confirm Password</label>
                  <input
                    ref={confirmPass}
                    type="password"
                    className="form-control input-lg CP_Border"
                    id="loginpassword"
                    placeholder="Confirm Password"
                    name="confirmPass" value={newUser.confirmPass} onChange={handleOnChange}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="SocNoticeContainer">
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
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="btnUpdatecp"
          >
            Update
          </button>
        </Form>
      </Loader>
    </div >
  );
};


export default AdminChangePass;

