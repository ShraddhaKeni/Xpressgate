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
import { Person2Outlined, PersonAddAlt1Outlined } from '@mui/icons-material';

const SideLayOut = () => {

  const router = useLocation()

  return (
    <aside className='sidelayout z-10' style={{ position: 'relative' }} >

      <Link to={"/admin"} className='admin-profile' style={{ textDecoration: 'none' }} >
        <img src="/images/AdminSideicon.svg" alt="logo" className='adminsidelogo'></img>
        <label className='admin-profile-username'>User Name</label>

      </Link>

      <Link to={RouterPath.ADMIN_DASHBOARD} style={{ textDecoration: 'none' }} >
        <div className={`nav-item ${router.pathname.includes("dashboard") && 'font-weight-bold'} mt-3`}>
          <HomeOutlinedIcon className='side-nav-icon margin_icons' fontSize='large' />
          <span className='ml-3 Labelfont'>Dashboard</span>
        </div>
      </Link>

      <Link to={RouterPath.PREMISES_LIST} style={{ textDecoration: 'none' }} >
        <div className={`nav-item ${router.pathname.includes("premises") && 'font-weight-bold'}`}>
          <ApartmentIcon className='side-nav-icon margin_icons' fontSize='large' />
          <span className='ml-3 Labelfont'>Premises Management</span>
        </div>
      </Link>

      <Link to={RouterPath.COUPONS_LIST} style={{ textDecoration: 'none' }} >
        <div className={`nav-item ${router.pathname.includes("payments") && 'font-weight-bold'}`}>
          <PaymentsIcon className='side-nav-icon margin_icons' fontSize='large' />
          <span className='ml-3 Labelfont'>Payment Management</span>
        </div>
        {router.pathname.includes('payments') &&
          <div className='px-5'>

            <Link to={RouterPath.COUPONS_LIST} style={{ textDecoration: 'none' }} >
              <div className={`nav-inner-item ${router.pathname.includes("coupons") && 'font-weight-bold'}`}>
                <ChevronRightOutlinedIcon className={router.pathname.includes("coupons") ? '' : 'd-none'} />
                <span className={router.pathname.includes("coupons") ? '' : 'ml-4'} >Coupons</span>
              </div>
            </Link>

            <Link to={RouterPath.PRLANS_LIST} style={{ textDecoration: 'none' }} >
              <div className={`nav-inner-item ${router.pathname.includes("plans") && 'font-weight-bold'}`}>

                <ChevronRightOutlinedIcon className={router.pathname.includes("plans") ? '' : 'd-none'} />
                <span className={router.pathname.includes("plans") ? '' : 'ml-4'}>Plans</span>
              </div>
            </Link>

            <Link to={RouterPath.PAYMENT_HISTORY} style={{ textDecoration: 'none' }} >
              <div className={`nav-inner-item ${router.pathname.includes("history") && 'font-weight-bold'}`}>
                <ChevronRightOutlinedIcon className={router.pathname.includes("history") ? '' : 'd-none'} />
                <span className={router.pathname.includes("history") ? '' : 'ml-4'}>Payment History</span>
              </div>
            </Link>
          </div>
        }
      </Link>

      <Link to={RouterPath.ADD_SOCIETY_MEMBER} style={{ textDecoration: 'none' }} >
        <div className={`nav-item ${router.pathname.includes("addsocietymember") && 'font-weight-bold'}`}>
          <PersonAddAlt1Outlined className='side-nav-icon margin_icons' fontSize='large' />
          <span className='ml-3 Labelfont'>Add Society Member</span>
        </div>

      </Link>
      <Link to={RouterPath.VIDEO_CLASS} style={{ textDecoration: 'none' }} >
        <div className={`nav-item ${router.pathname.includes("video") && 'font-weight-bold'}`}>
          <SmartDisplayIcon className='side-nav-icon margin_icons' fontSize='large' />
          <span className='ml-3 Labelfont'>Video Class</span>
        </div>

      </Link>

      <Link to={RouterPath.REPORTS} style={{ textDecoration: 'none' }} >
        <div className={`nav-item ${router.pathname.includes("reports") && 'font-weight-bold'}`}>
          <DescriptionIcon className='side-nav-icon margin_icons' fontSize='large' />
          <span className='ml-3 Labelfont'>Reports</span>
        </div>
      </Link>

      <Link to={RouterPath.MANAGE_PAYMENT_GATEWAY} style={{ textDecoration: 'none' }} >
        <div className={`nav-item ${router.pathname.includes("/pg") && 'font-weight-bold'}`}>
          <SmartDisplayIcon className='side-nav-icon margin_icons' fontSize='large' />
          <span className='ml-3 Labelfont'>Manage Payment Gateway</span>
        </div>

      </Link>

      <Link to={RouterPath.MANAGE_SLIDERS} style={{ textDecoration: 'none' }} >
        <div className={`nav-item ${router.pathname.includes("sliders") && 'font-weight-bold'}`}>
          <SmartDisplayIcon className='side-nav-icon margin_icons' fontSize='large' />
          <span className='ml-3 Labelfont'>Manage Sliders</span>
        </div>

      </Link>

      <Link to={RouterPath.MANAGE_SMS_PROVIDER} style={{ textDecoration: 'none' }} >
        <div className={`nav-item ${router.pathname.includes("sms") && 'font-weight-bold'}`}>
          <SmartDisplayIcon className='side-nav-icon margin_icons' fontSize='large' />
          <span className='ml-3 Labelfont'>Manage SMS Gateway</span>
        </div>

      </Link>


      <Link to={RouterPath.PRIVACY_POLICY} style={{ textDecoration: 'none' }} >
        <div className={`nav-item ${router.pathname.includes("configurations") && 'font-weight-bold'}`}>
          <SettingsOutlinedIcon className='side-nav-icon margin_icons' fontSize='large' />
          <span className='ml-3 Labelfont'>Configuration</span>
        </div>
        {router.pathname.includes('configurations') &&
          <div className='px-5'>
            <Link to={RouterPath.PRIVACY_POLICY} style={{ textDecoration: 'none' }} >
              <div className={`nav-inner-item ${router.pathname.includes("privacy") && 'font-weight-bold'}`}>
                <ChevronRightOutlinedIcon className={router.pathname.includes("privacy") ? '' : 'd-none'} />
                <span className={router.pathname.includes("privacy") ? '' : 'ml-4'}>Privacy Policy</span>
              </div>
            </Link>
            <Link to={RouterPath.TERMS} style={{ textDecoration: 'none' }} >
              <div className={`nav-inner-item ${router.pathname.includes("terms") && 'font-weight-bold'}`}>
                <ChevronRightOutlinedIcon className={router.pathname.includes("terms") ? '' : 'd-none'} />
                <span className={router.pathname.includes("terms") ? '' : 'ml-4'}>Terms & Conditions</span>
              </div>
            </Link>
          </div>
        }
      </Link>

      {/* <img src='/images/side_bar_img.svg' className='Admin_side_Img' /> */}

    </aside>
  )
}

export default SideLayOut
