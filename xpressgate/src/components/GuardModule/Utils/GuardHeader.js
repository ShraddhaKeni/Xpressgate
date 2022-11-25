import React from 'react'
import LogOut from './LogOut'
const GuardHeader = () => {
  return (
    <div className="sfirstheadersection">
        <div id="sdashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
        <div id="sdashboardguard"><label>Guard</label></div>
        <div id="sdashboardspace"></div>
        <div id="sdashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
        <div id="sdashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
        <div id="sdashboardlogoutbutton"><LogOut/></div>
  </div>
  )
}

export default GuardHeader