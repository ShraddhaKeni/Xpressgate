import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import HeaderSection from '../../GuardModule/Utils/HeaderSection'

function Header() {
    const [stat, setStat] = useState(false)
    const guardLogout = () => {
        localStorage.clear()
        window.location.href = '/'
    }
    return (
        <div id="headersection">
            <div className="adminheadersection">
                <div id="adminlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
                <div id="adminguard"><label>Super Admin</label></div>
                <div id="adminspace"></div>
                <div className='d-flex justify-content-around align-items-center gx-2'>
                    <div onClick={() => { setStat(!stat) }}><img src="/images/notification.svg" className='bellicon mx-3' alt="notificationicon" /></div>
                    {stat ? <div className='notification_section mx-4'><HeaderSection /></div> : ''}
                    <div className='mx-3'><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>

                    <Button type="button" onClick={() => guardLogout()} className="logoutBtn mx-4 mr-5 pt-3" >Log Out<img src="/images/logout.svg" className='ml-4' alt="header logo" /></Button>

                </div>
            </div>
        </div>
    )
}


export default Header