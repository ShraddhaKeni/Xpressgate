import { Logout } from '@mui/icons-material';
import { createTheme } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/base/Layout/Header';
import AdminDashboard from './Dashboard';
import '../../styles/global.css'
import '../../styles/addPremise.css'
import AddPremise from './PremiseManagement/new';
import EditPremise from './PremiseManagement/edit';
import PremisesList from './PremiseManagement';
import { CouponsList } from './PaymentManagement/Coupons/coupons';
import { AddCoupon } from './PaymentManagement/Coupons/new';
import { CouponDetails } from './PaymentManagement/Coupons/couponDetails';
import { PlansList } from './PaymentManagement/Plans/plans';
import { AddPlan } from './PaymentManagement/Plans/new';
import { PaymentsHistory } from './PaymentManagement/PaymentHistory';

// import AdminProfile from '../admin/LoginScreens/AdminProfile';
// import Terms from "../admin/LoginScreens/Terms"
// import PrivacyPolicy from "../admin/LoginScreens/PrivacyPolicy"
// import AddVideo from "../admin/VideoClass/AddVideo"
// import EditVideo from "../admin/VideoClass/EditVideo"
import Reports from "../admin/Reports/Reports"
import SideLayOut from '../../components/base/Layout/SideLayOut';
import RouterPath from '../../common/constants/path/routerPath';
import VideoClass from "../admin/VideoClass/VideoClass"
// import Reports from "../admin/Reports/Reports"



const AdminModuleComponent = () => {

    const router = useLocation()
    let children = <></>;

    if (router.pathname.includes(RouterPath.ADMIN_DASHBOARD)) {
        children = (<AdminDashboard />)
    }
    if (router.pathname === RouterPath.ADD_PREMISE) {
        children = (<AddPremise />)
    }
    if (router.pathname === RouterPath.EDIT_PREMISE) {
        children = (<EditPremise />)
    }

    if (router.pathname === RouterPath.PREMISES_LIST) {
        children = (<PremisesList />)
    }

    if (router.pathname === RouterPath.COUPONS_LIST) {
        children = (<CouponsList />)
    }

    if (router.pathname === RouterPath.ADD_COUPON) {
        children = (<AddCoupon />)
    }
    if (router.pathname === RouterPath.REPORTS) {
        children = (<Reports />)
    }
    if (router.pathname == '/admin') {
        children = (<VideoClass />)
    }

    if (router.pathname === RouterPath.COUPON_DETAILS) {
        children = (<CouponDetails />)
    }

    if (router.pathname === RouterPath.PRLANS_LIST) {
        children = (<PlansList />)
    }
    if (router.pathname === RouterPath.ADD_PLAN) {
        children = (<AddPlan />)
    }
    if (router.pathname === RouterPath.EDITP_PLAN) {
        children = (<PlansList />)
    }
    if (router.pathname === RouterPath.PAYMENT_HISTORY) {
        children = (<PaymentsHistory />)
    }

    return (
        <div className='flex flex-col'>

            <Header />
            <div className='flex'>
                <SideLayOut />
                <main style={{ width: "100vw" }}>
                    <div>
                        {children}
                    </div>
                </main>
            </div>




        </div >
    )
}


export default AdminModuleComponent