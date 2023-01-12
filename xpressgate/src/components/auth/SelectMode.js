import { LineAxis } from '@mui/icons-material'
import React from 'react'
import { Button } from 'react-bootstrap'
import './selectMode.css'
import { Link, useNavigate } from 'react-router-dom';
const SelectMode = () => {

  const setMode = (value) => {
    localStorage.setItem('mode', value)
    if (value == 'guard') {
      window.location.href = '/guardLogin'
    }
    else if (value == 'society') {
      window.location.href = '/societylogin'
    }
    else {
      window.location.href = '/superadminlogin'
    }
  }
  return (
    <>
      <div className='Page_Container'>
        <img src='/images/Ellipse.svg' alt='Ellipse' className='ellipseimg'></img>
        <div className='page_header'>
          <div id="PageLogo"><img src="/images/loginlogo.svg" alt="header logo" className='Pagelogoimg' /></div>
          <div className='pagelabels'>
            <label className='HelpLinelabel'>Helpline No</label><br />
            <label className='HelplineNolabel'>00-0000-0000</label>
          </div>
          <div className='UserSuplogo'><img src="/images/supportimg.svg" alt="User Support logo" className='supportlogoimg'></img> </div>
        </div>
        <img src='/images/landingBg.svg' alt='background' className='LBackGimg'></img>
        <div className='Welcomepagelables'>
          <label className='welcomelabel'>Welcome to <br /><span className='WLabelSize'>Xpress Gate</span></label>
        </div>

        <div className='LP_SideImage'>
          <img src="/images/Animation.svg" alt=" Man Riding" className='Sideimagesize' />

        </div>
        <div className='modulesboxes'>
          <div className='BOXESMargin' >
            <Button onClick={() => { setMode('guard') }} className='GuardMod_box'>
              <img src="/images/policeman.svg" className='GM_image'></img>
              <br />
              <label className='GM_label'>Guard </label>
            </Button>
          </div>
          <div className='BOXESMargin'>
            <Button onClick={() => { setMode('society') }} className='GuardMod_box'>
              <img src="/images/Buildingimage.svg" className='GM_image'></img>
              <br />
              <label className='GM_label'>Society </label>
            </Button>
          </div>
          <div className='BOXESMargin'>
            <Button onClick={() => { setMode('admin') }} className='GuardMod_box'>
              <img src="/images/user_setting.svg" className='GM_image'></img>
              <br />
              <label className='GM_label'>Super Admin </label>
            </Button>
          </div> </div>
      
         <div className='copyright'>
          © Copyright 2023 Designed by <a href="https://www.axzoragroup.com/" target="_blank">Axzora Private Limited</a>
        </div> 

    
      </div>

    </>
  )
}

export default SelectMode;