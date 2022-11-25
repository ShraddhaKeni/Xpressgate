import { makeStyles } from '@mui/material'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import HeaderSection from '../../GuardModule/Utils/HeaderSection'
import LogOut from '../../GuardModule/Utils/LogOut'
import { MaterialButton } from '../../../pages/admin/components/MaterialButton'

function Header() {
    const [stat, setStat] = useState(false)
    const guardLogout = () => {
        localStorage.clear()
        window.location.href = '/'
    }

    return (
        <div id="headersection">
            <div className="firstheadersection">
                <div id="dashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
                <div id="dashboardguard"><label>Super Admin</label></div>
                <div id="dashboardspace"></div>
                <div id="dashboardnotification" onClick={() => { setStat(!stat) }}><img src="/images/notification.svg" className='bellicon' alt="notificationicon" /></div>
                {stat ? <div className='notification_section'><HeaderSection /></div> : ''}
                <div id="dashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
                <div id="dashboardlogoutbutton"><LogOut className='bg-[#0A8996]' /></div>
            </div>
        </div>
    )
}


export default Header