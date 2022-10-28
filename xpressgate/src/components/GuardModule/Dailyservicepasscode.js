import React from 'react';
import './Dailyservicepasscode.css';
import { Button } from 'react-bootstrap';
import HeaderSection from './Utils/HeaderSection';
import GuardSideSection from './Utils/GuardSideSection';

const Dailyservicepasscode = () => {
 
  return (
    <div className="dailyservicepasscodecontainer">
      <HeaderSection/>
      <GuardSideSection/>
      <div className='backgroundimg'>
        <div className='Addvendordisplay'>
          <label>902819</label>
        </div>
        {/* <div className="row row-cols-1 row-cols-md-1 g-4 fullcardscss"> */}
            <div className="col-sm-6 col-md-6 col-lg-6">
              <div className="dailycard">
                <br></br>
                <div className='profileimage'><img src="/images/dailyservicepasscodeimage.svg" alt="profile"/></div>
                <label className="namelabel">Rita Kumari</label>
                <label className="proflabel">Maid</label>
                <label className="allowedlabel">Allowed in 5 houses</label>
                <br></br>
                <br></br>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6">
            <div className='flatclass'></div>
                <label className="detailslabel">Flat 101, Block A</label>
                <label className="detailslabel">Flat 401, Block D</label>
                <label className="detailslabel">Flat 503, Block E</label>
                <label className="detailslabel">Flat 508, Block E</label>
                <label className="detailslabel">Flat 202, Block B</label>
           </div> 
      </div>
    </div>
  )
}

export default Dailyservicepasscode

