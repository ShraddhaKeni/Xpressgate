import React from 'react';
import "../LandingPage/LandingPage.css";


const LandingPage = () => {
 
  return (
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
      <div className='GuardMod_box'>
        <img src="/images/policeman.svg" className='GM_image'></img>
        <label className='GM_label'>Guard </label>
      </div>
      <div className='GuardMod_box'>
        <img src="/images/policeman.svg" className='GM_image'></img>
        <label className='GM_label'>Guard </label>
      </div>
      <div className='GuardMod_box'>
        <img src="/images/policeman.svg" className='GM_image'></img>
        <label className='GM_label'>Guard </label>
      </div>
     </div>
    </div>
    
  );
}
export default LandingPage;
