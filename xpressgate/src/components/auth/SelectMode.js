import { LineAxis } from '@mui/icons-material'
import React from 'react'
import { Button} from 'react-bootstrap'
import './selectMode.css'
import { Link, useNavigate } from 'react-router-dom';
const SelectMode = () => {

  const setMode = (value)=>{
    localStorage.setItem('mode',value)
    if(value=='guard')
    {
        window.location.href='/guardLogin'
    }
    else if (value=='society')
    {
      window.location.href='/societylogin'
    }
    else
    {
        window.location.href='/superadminlogin'    
    }
  }  
  return (
    <>
    <div className='Page_Container'>
    <div className='page_header'>
    <div id="PageLogo"><img src="/images/loginlogo.svg" alt="header logo" className='Pagelogoimg' /></div>
    <div className='pagelabels'>
      <label className='HelpLinelabel'>Helpline No</label><br/>
      <label className='HelplineNolabel'>00-0000-0000</label>
    </div>
    <div className='UserSuplogo'><img src="/images/supportimg.svg" alt="User Support logo" className='supportlogoimg'></img> </div>
    </div>
   <div className='Welcomepagelables'>
    <label className='welcomelabel'>Welcome to <br/><span className='WLabelSize'>Xpress Gate</span></label>
   </div>
   <div className='modulesboxes'>
    <div className='BOXESMargin' >
    <Button onClick={()=>{setMode('guard')}} className='GuardMod_box'>
    <img src="/images/policeman.svg" className='GM_image'></img>
    <br/>
    <label className='GM_label'>Guard </label>
    </Button>
    </div>
    <div className='BOXESMargin'>
    <Button onClick={()=>{setMode('society')}} className='GuardMod_box'>
      <img src="/images/Buildingimage.svg" className='GM_image'></img>
      <br/>
      <label className='GM_label'>Society </label>
    </Button>
    </div>
    <div className='BOXESMargin'>
    <Button onClick={()=>{setMode('admin')}} className='GuardMod_box'>
      <img src="/images/user_setting.svg" className='GM_image'></img>
      <br/>
      <label className='GM_label'>Super Admin </label>
      </Button>
    </div>
    <div className='LP_SideImage'>
  <img src="/images/ManRiding.svg" alt=" Man Riding" className='Sideimagesize'/>
 </div>
 <div className='LP_CSideImage'>
  <img src="/images/MobileImg.svg" alt=" Man Riding" className='Center_Sideimagesize'/>
 </div>
 <div className='LP_CMAnSideImage'>
  <img src="/images/ManImg.svg" alt=" Man Riding" className='CenterMan_Sideimagesize'/>
 </div>
 <div className='LP_RSideImage'>
  <img src="/images/womanimg.svg" alt=" Man Riding" className='Right_Sideimagesize'/>
 </div>
   </div>
  </div>

    </>
  )
}

export default SelectMode;