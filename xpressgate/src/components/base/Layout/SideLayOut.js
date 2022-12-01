import React from 'react'
import '../../../styles/global.css'
import { Link, useLocation } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import VillaOutlinedIcon from '@mui/icons-material/VillaOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import RouterPath from '../../../common/constants/path/routerPath';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const SideLayOut = () => {

  const router = useLocation()

  return (
    <aside className='sidelayout'>

      <Link to={"/admin"} className='admin-profile' style={{ textDecoration: 'none' }} >
        <img src="/images/AdminSideicon.svg" alt="logo" className='adminsidelogo'></img>
        <p className='admin-profile-username'>User Name</p>

      </Link>

      <Link to={RouterPath.ADMIN_DASHBOARD} style={{ textDecoration: 'none' }} >
        <div className={`nav-item ${router.pathname.includes("dashboard") && 'font-weight-bold'}`}>
          <HomeOutlinedIcon className='side-nav-icon' fontSize='large' />
          <span className='ml-3'>Dashboard</span>
        </div>
      </Link>

      <Link to={RouterPath.PREMISES_LIST} style={{ textDecoration: 'none' }} >
        <div className={`nav-item ${router.pathname.includes("premises") && 'font-weight-bold'}`}>
          <VillaOutlinedIcon className='side-nav-icon' fontSize='large' />
          <span className='ml-3'>Premises Management</span>
        </div>
      </Link>

      <Link to={RouterPath.COUPONS_LIST} style={{ textDecoration: 'none' }} >
        <div className={`nav-item ${router.pathname.includes("payments") && 'font-weight-bold'}`}>
          <VillaOutlinedIcon className='side-nav-icon' fontSize='large' />
          <span className='ml-3'>Payment Management</span>
        </div>
        {router.pathname.includes('payments') &&
          <div className='px-5'>

            <Link to={RouterPath.COUPONS_LIST} style={{ textDecoration: 'none' }} >
              <div className={`nav-inner-item ${router.pathname.includes("coupons") && 'font-weight-bold'}`}>
                <ChevronRightOutlinedIcon className={router.pathname.includes("coupons") ? '' : 'd-none'} />
                <span className={router.pathname.includes("coupons") ? '' : 'ml-4'}>Coupons</span>
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

      <Link to={RouterPath.VIDEO_CLASS} style={{ textDecoration: 'none' }} >
        <div className={`nav-item ${router.pathname.includes("video") && 'font-weight-bold'}`}>
          <VillaOutlinedIcon className='side-nav-icon' fontSize='large' />
          <span className='ml-3'>Video Class</span>
        </div>

      </Link>

      <Link to={RouterPath.REPORTS} style={{ textDecoration: 'none' }} >
        <div className={`nav-item ${router.pathname.includes("reports") && 'font-weight-bold'}`}>
          <VillaOutlinedIcon className='side-nav-icon' fontSize='large' />
          <span className='ml-3'>Reports</span>
        </div>
      </Link>



    </aside>
  )
}

export default SideLayOut
