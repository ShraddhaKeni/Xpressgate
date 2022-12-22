import './Report.css';
import { Button } from 'react-bootstrap';
import LogOut from './Utils/LogOut';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SocietyHeader from './Utils/Societyheader'

const Report = () => {

  return (
    <>
      <div className="sreportcontainer">
        <div id="srheadersection">
          <SocietyHeader />
        </div>
        <div id="srsocietynamesection">
          <div className='srsocietyname'>
            <img src="/images/societyicon.svg" alt="society name" />
            <label>Society Name</label>
          </div>

          <div className='srsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
        </div>
        <div className='srbackgroundimg'>
          <div className='sr_display'>
            <label>Reports</label>
          </div>
          <div className='row'>
            <div className='srsearchbox'>
              <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                <input className='srsearch_input' placeholder='Search'></input></span>
            </div>
          </div>
          <br></br>  <br></br>
          <div id="srcardsection">
            <div className="srreportfirst">
              <label className="srActivityReports">Activity Reports</label>
              <div className="srViewreportBtn">
                <button type="button" className="srViewbtn" >View Report</button>
              </div>
              <div className="srreportimage">
                <img src="/images/report.svg"></img>
              </div>
            </div>
           

          </div>
        </div>
      </div>

    </>
  )
}

export default Report

