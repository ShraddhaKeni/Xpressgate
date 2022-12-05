import React from 'react'
import { Link } from 'react-router-dom'
import LogOut from './LogOut'
import './styles/GuardHeader.css'

const GuardHeader = () => {
  return (
    <div className="sfirstheadersection">
        <div id="sdashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
        <div id="sdashboardguard"><label>Guard</label></div>
        <div id="sdashboardspace"></div>
        <div id="sdashboardnotification"><a href="abc"><img className='bell_icon' src="/images/notification.svg" alt="notificationicon" /></a></div>
        <div id="sdashboardsetting"><Link to='/changeguardpass'><img src="/images/setting.svg" className='cog_wheel' alt="settingicon" /></Link></div>
        <div id="sdashboardlogoutbutton"><LogOut/></div>
  </div>
  )
}

export default GuardHeader