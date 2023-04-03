import React from 'react'
import { useLocation } from 'react-router-dom';
import '../../styles/global.css'
import '../../styles/addPremise.css'
import PartnerHeader from '../../components/base/Layout/PartnerHeader';
import RouterPath from '../../common/constants/path/routerPath';
import AdminDashboard from '../admin/Dashboard';
import PartnerSideBar from '../../components/base/Layout/PartnerSideBar';
import StudentManagement from './StudentManagement/StudentManagement';
import PartnerChangePassword from './PartnerLoginScreens/PartnerChangePassword';
import PartnerProfile from './PartnerLoginScreens/PartnerProfile';
import PartnerDashboard from './PartnerDasboard/PartnerDashboard';
import CourseManagement from './CourseManagement/CourseManagement';
import AddCourse from './CourseManagement/AddCourse';
import EditCourse from './CourseManagement/EditCourse';
import CourseDetails from './CourseManagement/CourseDetails';
import AddStudent from './StudentManagement/AddStudent';
import EditStudent from './StudentManagement/EditStudent';
import StudentDetails from './StudentManagement/StudentDetails';
import EditProfile from './PartnerLoginScreens/EditProfile';



const PartnerModule = () => {

    const router = useLocation()
    let children = <></>;

    if (router.pathname.includes(RouterPath.PARTNER_DASHBOARD)) {
        children = (<PartnerDashboard/>)
    }
    if (router.pathname.includes(RouterPath.PARTNER_HOME)) {
        children = (<PartnerDashboard />)
    }
    if (router.pathname.includes(RouterPath.COURSE_MANAGEMENT)) {
        children = (<CourseManagement />)
    }
    if (router.pathname.includes(RouterPath.ADD_COURSE)) {
        children = (<AddCourse />)
    }
    if (router.pathname.includes(RouterPath.EDIT_COURSE)) {
        children = (<EditCourse />)
    }
    if (router.pathname.includes(RouterPath.COURSE_DETAILS)) {
        children = (<CourseDetails />)
    }
    

    if (router.pathname.includes(RouterPath.STUDENT_MANAGEMENT)) {
        children = (<StudentManagement />)
    }
    if (router.pathname.includes(RouterPath.ADD_STUDENT)) {
        children = (<AddStudent />)
    }
    if (router.pathname.includes(RouterPath.EDIT_STUDENT)) {
        children = (<EditStudent />)
    }
    if (router.pathname.includes(RouterPath.STUDENT_DETAILS)) {
        children = (<StudentDetails/>)
    }
    if (router.pathname.includes(RouterPath.PARTNER_CHANGE_PASSWORD)) {
        children = (<PartnerChangePassword />)
    }
    if (router.pathname.includes(RouterPath.PARTNER_PROFILE)) {
        children = (<PartnerProfile />)
    }
    if (router.pathname.includes(RouterPath.EDIT_PROFILE)) {
        children = (<EditProfile />)
    }

    return (
        <div className='flex flex-col'>

            <PartnerHeader />
            <div className='flex'>

                <PartnerSideBar style={{ overflow: 'visible' }} />

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


export default PartnerModule
