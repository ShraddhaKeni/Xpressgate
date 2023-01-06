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

import AdminProfile from '../admin/LoginScreens/AdminProfile';
import Terms from "../admin/LoginScreens/Terms"
import PrivacyPolicy from "../admin/LoginScreens/PrivacyPolicy"
import AddVideo from "../admin/VideoClass/AddVideo"
import EditVideo from "../admin/VideoClass/EditVideo"
import Reports from "../admin/Reports/Reports"
import SideLayOut from '../../components/base/Layout/SideLayOut';
import RouterPath from '../../common/constants/path/routerPath';
import VideoClass from "../admin/VideoClass/VideoClass"
import { PlanDetails } from './PaymentManagement/Plans/planDetails';
import { EditPlan } from './PaymentManagement/Plans/edit';
// import Reports from "../admin/Reports/Reports"
import { DatePicker } from '@mui/x-date-pickers';
import { PaymentHistory } from './PaymentManagement/PaymentHistory';
import { PremisesPayHistory } from './PaymentManagement/PaymentHistory/premise_history';
import PaymentGateways from './Manage/PaymentGateway';
import AddPaymentGateway from './Manage/PaymentGateway/new';
import SMSProvider from './Manage/SMSProvider/new';
import SMSGatewayList from './Manage/SMSProvider';
import Sliders from './Manage/Sliders';
import EditPaymentGateway from './Manage/PaymentGateway/edit';
import EditSMSGateway from './Manage/SMSProvider/edit';



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
    if (router.pathname == RouterPath.VIDEO_CLASS) {
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
    if (router.pathname === RouterPath.PLAN_DETAILS) {
        children = (<PlanDetails />)
    }
    if (router.pathname === RouterPath.EDIT_PLAN) {
        children = (<EditPlan />)
    }
    if (router.pathname === RouterPath.PAYMENT_HISTORY) {
        children = (<PaymentHistory />)
    }
    if (router.pathname.includes('/admin/payments/history/premise/')) {
        children = (<PremisesPayHistory />)
    }

    if (router.pathname === RouterPath.PRIVACY_POLICY) {
        children = (<PrivacyPolicy />)
    }
    if (router.pathname === RouterPath.TERMS) {
        children = (<Terms />)
    }

    if (router.pathname === RouterPath.ADD_VIDEO) {
        children = (<AddVideo />)
    }

    if (router.pathname === RouterPath.EDIT_VIDEO) {
        children = (<EditVideo />)
    }

    return (
        <div className='flex flex-col'>

            <Header />
            <div className='flex'>

                <SideLayOut style={{ overflow: 'visible' }} />

                <div className='flex-1 d-flex' style={{ width: "100%", height: '100%' }}>
                    <div className='main-container'>
                        <main>

                            {children}

                        </main>
                    </div>

                </div>
            </div>




        </div >
    )
}


export default AdminModuleComponent
