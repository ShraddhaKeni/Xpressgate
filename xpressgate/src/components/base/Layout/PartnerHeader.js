import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import HeaderSection from '../../GuardModule/Utils/HeaderSection'

function PartnerHeader() {
    const [stat, setStat] = useState(false)
    const guardLogout = () => {
        localStorage.clear()
        window.location.href = '/'
    }
    return (
        <div id="headersection">
            <div className="adminheadersection">
                <div id="adminlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
                <div id="adminguard"><label>Partner</label></div>
                <div id="adminspace"></div>
                <div className='d-flex justify-content-around align-items-center gx-2'>
                    <div onClick={() => { setStat(!stat) }}><img src="/images/notification.svg" className='bell_icon Margin_NIcon' alt="notificationicon" /></div>
                    {stat ? <div className='notification_section'><HeaderSection /></div> : ''}
                    <div className='cog_wheel Margin_setting_icon'><a href="/partner-change-password"><img src="/images/setting.svg" alt="settingicon" /></a></div>

                    <button type="button" onClick={() => guardLogout()} className="logoutBtn" >Log Out<img src="/images/logout.svg" alt="header logo" /></button>

                </div>
            </div>
        </div>
    )
}


export default PartnerHeader