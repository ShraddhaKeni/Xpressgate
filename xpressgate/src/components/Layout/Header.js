import React from 'react'
import LogOut from '../GuardModule/Utils/LogOut'

function Header() {
    return (
        <div id="headersection">
            <div className="firstheadersection">
                <div id="dashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
                <div id="dashboardguard"><label>Guard</label></div>
                <div id="dashboardspace"></div>
                <div id="dashboardnotification" onClick={() => { }}><img src="/images/notification.svg" className='bellicon' alt="notificationicon" /></div>
                {/* <div className='notification_section'><HeaderSection /></div> */}
                <div id="dashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
                <div id="dashboardlogoutbutton"><LogOut /></div>
            </div>
        </div>
    )
}

export default Header