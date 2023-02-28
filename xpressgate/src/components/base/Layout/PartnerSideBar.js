import React from 'react'
import '../../../styles/global.css'
import { Link, useLocation } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import VillaOutlinedIcon from '@mui/icons-material/VillaOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import RouterPath from '../../../common/constants/path/routerPath';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import PaymentsIcon from '@mui/icons-material/Payments';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { ClassOutlined, Person2Outlined, PersonAddAlt1Outlined, School, SchoolOutlined } from '@mui/icons-material';

const PartnerSideBar = () => {

    const router = useLocation()

    return (
        <aside className='sidelayout' style={{ position: 'relative' }} >

            <Link to={"/admin"} className='admin-profile' style={{ textDecoration: 'none' }} >
                <img src="/images/AdminSideicon.svg" alt="logo" className='adminsidelogo'></img>
                <label className='admin-profile-username'>User Name</label>

            </Link>

            <Link to={RouterPath.PARTNER_DASHBOARD} style={{ textDecoration: 'none' }} >
                <div className={`nav-item ${router.pathname.includes("dashboard") && 'font-weight-bold'} mt-3`}>
                    <HomeOutlinedIcon className='side-nav-icon margin_icons' fontSize='large' />
                    <span className='ml-3 Labelfont'>Dashboard</span>
                </div>
            </Link>

            <Link to={RouterPath.COURSE_MANAGEMENT} style={{ textDecoration: 'none' }} >
                <div className={`nav-item ${router.pathname.includes("course") && 'font-weight-bold'}`}>
                    <ClassOutlined className='side-nav-icon margin_icons' fontSize='large' />
                    <span className='ml-3 Labelfont'>Program Management</span>
                </div>
      </Link>


            <Link to={RouterPath.STUDENT_MANAGEMENT} style={{ textDecoration: 'none' }} >
                <div className={`nav-item ${router.pathname.includes("student") && 'font-weight-bold'}`}>
                    <SchoolOutlined className='side-nav-icon margin_icons' fontSize='large' />
                    <span className='ml-3 Labelfont'>Participants</span>
                </div>

            </Link>

            <img src='/images/PartnerSideImg.svg' className='Partner_side_Img' />
        </aside>
    )
}

export default PartnerSideBar
