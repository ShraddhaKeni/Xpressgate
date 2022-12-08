import React from 'react'
import './Utils.css';

const GuardSideSection = () => {
  return (
    <div id="guardnamesection">
          <div className='guardname'>
            <img src="/images/guardnameicon.svg" alt="guard name" />
            <label>Guard Name</label>
          </div>
          <div className='sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
    </div>
  )
}

export default GuardSideSection