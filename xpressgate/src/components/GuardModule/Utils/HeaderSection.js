import React from 'react'
import LogOut from './LogOut'
const HeaderSection = () => {
  return (
    <div id="headersection">
        <div class="firstheadersection">
            <div id="dashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
            <div id="dashboardguard"><label>Guard</label></div>
            <div id="dashboardspace"></div>
            <div id="dashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
            <div id="dashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
            <div id="dashboardlogoutbutton"> <LogOut/></div>
        </div>
  </div>
  )
}

export default HeaderSection