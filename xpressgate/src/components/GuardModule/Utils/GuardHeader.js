import React , { useState } from 'react'
import { Link } from 'react-router-dom'
import LogOut from './LogOut'
import './styles/GuardHeader.css'
import { ToastMessage } from '../../../components/ToastMessage';
const GuardHeader = () => {
  const [toast, setToast] = useState({ show: false })
  function myFunction() {

  }

  const handleclick = async () => {
    try {
     
      document.getElementById("imgDropdown").classList.remove("showdropdown");
    }
    catch (error) {

    }
  }
  const guardLogout = () => {
    setToast({ show: true, type: "success", message: "Logged out successfully" })
    localStorage.clear()
    window.location.href = '/'
}

  return (
    <div className="sfirstheadersection">
       <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
      <div id="sdashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
      <div id="sdashboardguard"><label>Guard</label></div>
      <div id="sdashboardspace"></div>
      <div id="sdashboardnotification"><a href="abc"><img className='bell_icon' src="/images/notification.svg" alt="notificationicon" /></a></div>
      <div id="sdashboardsetting" className='cog_menu'>
      <img src="/images/setting.svg" className='cog_wheel' id="imgDropdown" alt="settingicon" onClick={() => handleclick()} />
      <div className='menu'>
       <a href="/changeguardpass">Change Password</a>
       <a href="/editguarddetails">Update Guard</a>
    
      </div>
      </div>

     
      <div id="sdashboardlogoutbutton" onClick={() => guardLogout()}><LogOut /></div>
    </div>
  )
}

export default GuardHeader