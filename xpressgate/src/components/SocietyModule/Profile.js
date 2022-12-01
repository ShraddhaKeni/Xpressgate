import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut from './Utils/LogOut';
import axios from 'axios';
import Societyheader from './Utils/Societyheader';

const Profile = () => {

const [residents,setResidents] = useState([])
const [details,setDetails] = useState({})
useEffect(()=>{
  getResidents()
})

  const getResidents=async()=>{
    try {
        const {data} = await axios.get(`${window.env_var}api/resident/getall`)
        setResidents(data.data.Resident)
    } catch (error) {
      
    }
  }

  const getDetails = async(e)=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/resident/getone/${e.target.value}`)
      setDetails(data.data)
    } catch (error) {
      
    }
  }

   const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('community_id',localStorage.getItem('community_id')) //will change with 
      formData.append('firstname',document.getElementById('firstname').value)
      formData.append('lastname',document.getElementById('lastname').value)
      formData.append('username',document.getElementById('username').value)
      formData.append('email',document.getElementById('email').value)
      formData.append('password',document.getElementById('password').value)
      formData.append('mobileno',document.getElementById('mobileno').value)
      formData.append('gender',0)

      const {data} = await axios.post(`${window.env_var}api/society/addMember`,formData)
      window.location.href='/scDashboard'
    } catch (error) {
      console.log(error)
    }
   } 


  return (
    <div className="addguestcontainer5">
      <div id="headersection5">
        <div id="addflatsection">
         <Societyheader/>
      </div>
      </div>
      <div id="guardnamesection5">
        <div className='guardname5'>
          <img src="/images/profileicon.svg" alt="guard name" />
          <label>Society Name</label>
        </div>
        {/* <div className='sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div> */}
      </div>
      <div className='addguestbackgroundimg'>
        <div className='Addguestdisplay5'>
          <label>Profile</label>
        </div>
        <Form className='formclass'>
          
        <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Resident</label>
              <div class="col-lg-4">
                <select type="text" class="form-control input-lg" id='resident_id' onChange={(e)=>getDetails(e)} name="First name" >
                  <option  disabled value={null} selected>Select Resident</option>
                    {residents.map((item)=>{
                      return <option value={item.id}>{item.firstname} {item.lastname}</option>
                    })}
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">First Name</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" id='firstname' name="First name" placeholder="" disabled value={details.firstname}></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Last Name</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" id='lastname' name="Last Name" placeholder="" disabled value={details.lastname}></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Email</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" id='email' name="Email" placeholder="" disabled value={details.email}></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Mobile Number</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg" id='mobileno' name="Mobile Number" placeholder="" disabled value={details.mobileno}></input>
              </div> <div className="addflatheadersection">
            <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
            <div id="afsociety"><label>Society</label></div>
            <div id="afspace"></div>
            <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
            <div id="afsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
            <div id="aflogoutbutton"><LogOut/></div>
          </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">User Name</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" id='username' name="User Name" placeholder="" disabled value={details.username}></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Password</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg" id='password' name="User Name" placeholder="Password"></input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label labelsize">Profile Picture</label>
              <div class="col-lg-4">
                <img src={window.env_var+details.profile_pic}></img>
              </div>
            </div>
           
            <Button type="submit" onClick={(e)=>handleSubmit(e)} className="btnAddprofile">Save</Button>
        </Form>

      </div>  
    </div>
  )
}

export default Profile;

