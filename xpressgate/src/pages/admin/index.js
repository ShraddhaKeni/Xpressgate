import { Logout } from '@mui/icons-material';
import { createTheme } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/base/Layout/Header';
import AdminDashboard from './Dashboard';
import '../../styles/global.css'
import AddPremise from './PremiseManagement/new';
import EditPremise from './PremiseManagement/edit';
import PremisesList from './PremiseManagement';
import { CouponsList } from './PaymentManagement/coupons';
import { AddCoupon } from './PaymentManagement/new';

const AdminModuleComponent = () => {

    const router = useLocation()
    let children = <></>;

    if (router.pathname.includes('dashboard')) {
        children = (<AdminDashboard />)
    }
    if (router.pathname.includes('premises/add')) {
        children = (<AddPremise />)
    }
    if (router.pathname.includes('premises/edit')) {
        children = (<EditPremise />)
    }

    if (router.pathname.endsWith('premises')) {
        children = (<PremisesList />)
    }

    if (router.pathname == '/admin/coupons') {
        children = (<CouponsList />)
    }

    if (router.pathname == '/admin/coupons/add') {
        children = (<AddCoupon />)
    }


    return (
        <div className='flex flex-col'>

            <Header />

            <aside style={{ color: '#475569' }} className='hidden md:block cursor - pointer'>

                < ul className='pl-8 pr-8 font-bold color-secondary p-2 focus-within:hover:bg-black' >
                    Main
                </ul >
                <a href="/home">
                    <ul className={`pl-8 p-2 pr-8 font-bold hover:bg-green-50 ${router.pathname.includes("/home") && 'text-green-500'}`}>

                    </ul>
                </a>
                <a href="/rooms">
                    <ul className={`pl-8 p-2 pr-8 font-bold hover:bg-green-50 ${router.pathname.includes("/rooms") && 'text-green-500'}`}>

                    </ul>
                </a>
                <a href="/bookings">
                    <ul className={`pl-8 p-2 pr-8 font-bold hover:bg-green-50 ${router.pathname?.includes("/bookings") && 'text-green-500'}`}>

                    </ul>
                </a>

            </aside >

            <main style={{ width: "100vw" }}>
                <div>
                    {children}
                </div>
            </main>


        </div >
    )
}

export default AdminModuleComponent