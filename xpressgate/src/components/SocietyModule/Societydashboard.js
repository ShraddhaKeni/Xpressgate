import './Societydashboard.css';
import { Button } from 'react-bootstrap';
import LogOut from './Utils/LogOut';
import Societyheader from './Utils/Societyheader';

const Societydashboard = () => {
 
  return (
    <>
      <div className="dashboardcontainer">
        
      <div id="headersection">
        <div id="addflatsection">
        <Societyheader/>
        </div>
      </div>
      <div id="guardnamesection">
        <div className='guardname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='sideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
        <div className='dashboardbackgroundimg'>
        <div className='societydisplay'>
          <label>Society Dashboard</label>
        </div>
          <div id="cardsection">
            <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss">
              <div className="col">
                <div className="sdcard">
                  <a href='abc'><img src="/images/managenoticeboard.svg" className="dbcard-img-top" alt="guest card"></img></a>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                  <img src="/images/managecommunity.svg" className="dbcard-img-top" alt="vendor card"></img>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                  <img src="/images/manageflat.svg" className="dbcard-img-top" alt="dailyhelp card"></img>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                 <img src="/images/managevehicles.svg" className="dbcard-img-top" alt="inout book card"></img>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                  <img src="/images/paymentmanagement.svg" className="dbcard-img-top" alt="video class"></img>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                  <img src="/images/guardmanagement.svg" className="dbcard-img-top" alt="video class"></img>
                </div>
              </div>
              <div className="col">
                <div className="dashboardcard">
                  <img src="/images/managecomplains.svg" className="dbcard-img-top" alt="video class"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Societydashboard

