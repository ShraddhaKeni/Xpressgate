import { Logout } from '@mui/icons-material';
import { createTheme } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/base/Layout/Header';
import AdminDashboard from './Dashboard';
import '../../styles/global.css'

const AdminModuleComponent = () => {

    const router = useLocation()

    const [children, setChildren] = useState(<AdminDashboard />)

    if (router.pathname.includes('Dashboard')) {
        setChildren(<AdminDashboard />)
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

            <main className="flex-1 h-screen md:h-screen overflow-auto  bg-[#F9FBFF] p-8">
                <div className="flex space-x-4">
                    {children}
                </div>
            </main>


        </div >
    )
}

export default AdminModuleComponent