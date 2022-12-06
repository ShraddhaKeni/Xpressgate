import React, { useEffect, useState } from 'react';
import "../../../styles/AdminProfile.css"
import axios from 'axios';
import { Form } from 'react-bootstrap';


const AdminProfile = () => {
 
  const [details,setDetails] = useState({})
  
  
  
    const getDetails = async(e)=>{
      try {
        const {data} = await axios.get(`${window.env_var}api/admin/changedpassword ${e.target.value}`)
        setDetails(data.data)
      } catch (error) {
        
      }
    }
     const handlePassword=async(e)=>{
      e.preventDefault()
      try {
        const formData = new FormData()
        
        formData.append('firstname',document.getElementById('firstname').value)
        formData.append('lastname',document.getElementById('lastname').value)
        formData.append('email',document.getElementById('email').value)
        formData.append('password',document.getElementById('password').value)
        formData.append('contactno',document.getElementById('contactno').value)
        
  
        const {data} = await axios.post(`${window.env_var}api/admin/addadminmember`,formData)
        window.location.href='/admin/dashboard'
      } catch (error) {
        console.log(error)
      }
     } 

  return (
   <>
    <div className='maincontainer'>
       <div className='dummycontainer'>
        <img src="/images/AdminSideicon.svg"></img>
       
          <form className='profileform'>
          <div classname="firstname">
              <input type="text" placeholder='First name' className='firstnameinput' id='fistname' disabled  value={details.firstname}></input>
            </div>
            <div classname="lastname">
              <input type="text" placeholder='Last name' className='lastnameinput' id="lastname" disabled  value={details.lastname}></input>
            </div>
            <div classname="contact">
              <input type="number" placeholder='Contact' className='contactinput' id='contactno' disabled  value={details.contactno}></input>
            </div>
            <div classname="adminPassword">
              <label for="password" value="password" className='password'>Password
              <span className='Changeicon'><a href="/adminchangepass" className="changelink" onChange={(e)=>getDetails(e)} >Change</a></span>
              </label>
              <input type="password" placeholder='********' className='passwordinput' id='password' disabled  value={details.password}></input>
            </div>
            <div classname="adminemail">
              <label for="email" value="email" className='Email'>Email id</label>
              <input type="email" placeholder='admin@' className='emailinput' id='email' disabled  value={details.email}></input>
            </div>
        </form>
      
       </div>
      </div>
    </>
  )
}

export default AdminProfile;
