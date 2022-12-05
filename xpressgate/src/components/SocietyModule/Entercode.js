import React, { useRef } from "react";
import "../SocietyModule/Entercode.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Entercode= () => {
  let username = useRef([]);
  const location = useLocation()
  const navigate = useNavigate()
  const sendOTP = async()=>{
    try {
      const {data} = await axios.post(`${window.env_var}api/society/societyresetpass`,{mobileno:location.state.mobileno,otp:username.current.value})
      navigate('/newpass',{state:{mem_id:data.data.mem_id,mobileno:data.data.mobileno}})
    } catch (error) {
      
    }
  }
  return (
    <div className="logincontainer3">
      <div id="loginimgid3">
        <img src="/images/societylogin.svg" alt="" />
      </div>
      <div id="loginformid3">
        <Form>
          <div className="input_fields3">
          <div id="logoid3">
            <img src="/images/loginlogo.svg" alt="" />
          </div>
         <br/>
            <div className="btsign" disabled>
              FORGOT PASSWORD
            </div>
            <br />
            <div className="email_input">
              <label className="entercode">Enter code</label>
              <input
                ref={username}
                type="text"
                className="form-control emailtextbox"
                onKeyPress={(e) => {
                  document.getElementById(e.target.id).style.border = "none";
                }}
                id="loginemailid"
                placeholder="Enter code"
              ></input>
            </div>
            <br></br>
            <div className="email_input">
              <br />
              <Button
                type="button"
                className="btlogin3"
                onClick={()=>{sendOTP()}}
              >
                Verify
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Entercode;
