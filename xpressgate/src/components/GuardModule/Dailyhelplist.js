import React, { useEffect, useState } from 'react';
import './Dailyhelplist.css';
import { Button } from 'react-bootstrap';
import HeaderSection from './Utils/HeaderSection';
import GuardSideSection from './Utils/GuardSideSection';
import axios from 'axios';

const Dailyhelplist = () => {

  
  useEffect(()=>{
      getData()
  },[])    


  const getData = async()=>{ 
   
      
  }
  const sortArray = ()=>{
    
  }

  return (
    <div className="dailyhelplistcontainer"> 
     <HeaderSection/>
      <GuardSideSection/>
      <div className='backgroundimg'>  
        <div id="cardsection">
          <div className='Dailyhelplistdisplay'>
            <label>Daily Help List</label>
          </div>
         
          <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss">
          

            {/* <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Cleaner</label>
                <label className='card-allowedhouses'>Allowed in 2 Houses</label>
              </div>
            </div>
            <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Laundary</label>
                <label className='card-allowedhouses'>Allowed in 2 Houses</label>
              </div>
            </div>
            <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Maid</label>
                <label className='card-allowedhouses'>Allowed in 5 Houses</label>
              </div>
            </div>
            <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Cleaner</label>
                <label className='card-allowedhouses'>Allowed in 2 Houses</label>
              </div>
            </div>
            <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Laundary</label>
                <label className='card-allowedhouses'>Allowed in 2 Houses</label>
              </div>
            </div>
            <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Maid</label>
                <label className='card-allowedhouses'>Allowed in 5 Houses</label>
              </div>
            </div>
            <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Cleaner</label>
                <label className='card-allowedhouses'>Allowed in 2 Houses</label>
              </div>
            </div>
            <div className="col">
              <div className="dailyhelpminicard">
              <img className="card-img-top" src="/images/dailyhelplistprofile.svg"  alt="guest card"></img>
                <label className='card-titlename'>Rita Kumari</label>
                <label className='card-profession'>Laundary</label>
                <label className='card-allowedhouses'>Allowed in 2 Houses</label>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dailyhelplist

