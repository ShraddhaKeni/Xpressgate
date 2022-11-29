import React,{useEffect, useRef,useState} from 'react'
import '../SocietyModule/Main_reset.css'
import { useLocation } from "react-router-dom";
import { validatePassword } from "../auth/validation";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import GuardHeader from './Utils/GuardHeader';


const ChangePassword = () => {
    const password = useRef([])
    const confirmPass = useRef([])
    const oldpass = useRef([])
    const [guard,setGuard] = useState({})
  

    useEffect(()=>{
        getDetails()
    },[])

    const getDetails=async()=>{
        try {
            const {data} = await axios.get(`${window.env_var}api/guard/getone/${localStorage.getItem('guard_id')}`)
            setGuard(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit=async(e)=>{
      e.preventDefault()
        try {
          if(await validatePassword(password.current.value))
          {
            if((password.current.value===confirmPass.current.value)&&(password.current.value!==""&&confirmPass.current.value!==""))
            {
              const config = {
                headers:{
                  'x-access-token':localStorage.getItem('accesstoken')
                }
              }
              const sendData={
                username:guard.username,
                password:oldpass.current.value,
                newpassword:password.current.value,
                confirmpassword:confirmPass.current.value,
                id:localStorage.getItem('member_id')
            }
              const {data} = await axios.post(`${window.env_var}api/guard/changepassword`,sendData,config)

              console.log(data)
            }
          }
          else  
          {
            alert('Wrong password')
            document.querySelector('input').style.border = '1px solid red'
          }
           
            
        } catch (error) {
          document.querySelector('input').style.border = '1px solid red'
        }
    }
  return (
    <div className="addguestcontainer1">
      <div id="headersection1">
       <GuardHeader/>
      </div>
      <div id="societynamesection">
        <div className='societyname'>
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        {/* <div className='sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div> */}
      </div>
      <div className='addguestbackgroundimg'>
        <div className='Addguestdisplay1'>
          <label>Change Password</label>
        </div>
        <Form className='formclass'>
        <div className="input_fields1">
            <div className="email_input">
              <label className="CurrentPass">Current Password</label>
              <input
              ref={oldpass}
                type="text"
                className="form-control emailtextbox1"
                id="oldpass"
                placeholder="Current Password"
              ></input>
            </div>
            <br></br>
            <div className="email_input">
              <label className="newpass">New Password</label>
              <input
                ref={password}
                type="password"
                className="form-control passwordtextbox1"
                
                id="loginpassword"
                placeholder="New Password"
              ></input>
              </div>
              <div className="email_input">
              <label className="confirmpass">Confirm Password</label>
              <input
                ref={confirmPass}
                type="password"
                className="form-control passwordtextbox1"
                
                id="loginpassword"
                placeholder="Confirm Password"
              ></input>
              </div>
          </div>
            <Button type="submit" onClick={(e)=>handleSubmit(e)} className="btnAdd1">Update</Button>
        </Form>

      </div>  
    </div>
  )
}

export default ChangePassword