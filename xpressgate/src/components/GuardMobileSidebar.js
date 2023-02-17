import { CloseOutlined } from '@mui/icons-material'
import { Drawer, SwipeableDrawer } from '@mui/material'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const GuardMobileSidebar = ({ open, onHide }) => {
    //const [visible, setOpen] = useState(open || false)
    const router = useLocation()

    return (
        <Drawer
            className='position-relative z-10'
            anchor={'left'}
            open={open}
            onClose={() => { onHide(false) }}
        >
            <div style={{ width: '75vw' }} className='d-flex flex-column'>
                <div className='d-flex justify-content-between' onClick={() => onHide()}>
                    <img src="/images/loginlogo.svg" style={{ width: '5rem' }} className='m-4' alt="header logo" />
                    <CloseOutlined fontSize='large' className='float-right m-4' />
                </div>
                <div className='d-flex flex-column ml-5'>

                    <a href="/dashboard" className={`GS_LabelName mt-4 ${!router.pathname.includes("/dashboard") && 'text-secondary'}`}><b>Dashboard</b></a>
                    <a href="/guestlist" className={`GS_LabelName mt-5 ${!router.pathname.includes("/guest") && 'text-secondary'}`}><b>Guest</b></a>
                    <a href="/vendorlist" className={`GS_LabelName mt-5 ${!router.pathname.includes("vendor") && 'text-secondary'}`}><b>Vendor</b></a>

                    <a href="/dailyhelp" className={`GS_LabelName mt-5 ${!router.pathname.includes("/daily") && 'text-secondary'}`}><b>Daily Help</b></a>

                    <a href="/videoclass" className={`GS_LabelName mt-5 ${!router.pathname.includes("/videoclass") && 'text-secondary'}`}><b>Video Class</b></a>

                    <a href="/inoutbook" className={`GS_LabelName mt-5 ${!(router.pathname.includes("/inout") || router.pathname.includes("/addinout")) && 'text-secondary'}`}><b>In-Out book</b></a>

                </div>
            </div >
        </Drawer >
    )
}

export default GuardMobileSidebar