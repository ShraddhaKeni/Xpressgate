import React from 'react'
import "../../../styles/AdminProfile.css"
import SideLayOut from '../../../components/base/Layout/SideLayOut'

const AdminProfile = () => {
  return (
   <>
   
    
    
    <div className='maincontainer'>
       <div className='dummycontainer'>
        <img src="/images/AdminSideicon.svg"></img>
       
          <form className='profileform'>
          <div classname="firstname">
              <input type="text" placeholder='First name' className='firstnameinput'></input>
            </div>
            <div classname="lastname">
              <input type="text" placeholder='Last name' className='lastnameinput'></input>
            </div>
            <div classname="contact">
              <input type="text" placeholder='Contact' className='contactinput'></input>
            </div>
            <div classname="adminPassword">
              <label for="password" value="password" className='password'>Password
              <span className='Changeicon'><a href="abc" classname="changelink">Change</a></span>
              </label>
              <input type="text" placeholder='********' className='passwordinput'></input>
            </div>
            <div classname="adminemail">
              <label for="email" value="email" className='Email'>Email id</label>
              <input type="text" placeholder='admin@' className='emailinput'></input>
            </div>
        </form>
      
       </div>
      </div>
    </>
  )
}

export default AdminProfile;
