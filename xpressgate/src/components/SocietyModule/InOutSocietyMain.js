import './Societydashboard.css';
import { Button } from 'react-bootstrap';
import LogOut from './Utils/LogOut';
import Societyheader from './Utils/Societyheader';
// import { Loader } from "../Loader";


const InOutSocietyMain = () => {

  
  return (
    <>
      <div className="dashboardcontainer">
        <div id="headersection">
          <div id="addflatsection">
            <Societyheader />
          </div>
        </div>
        <div id="guardnamesection">
          <div className='SC_Name'>
            <img src="/images/societyicon.svg" alt="society name" />
            <label>Society Name</label>
          </div>
          {/* <div className='Dasboard_sideLink'>
            <a href="/scDashboard" className='SL_LabelName'><b>Dashboard</b></a>
          </div> */}
          <div className='Paymentsideimg'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
        </div>
        <div className='dashboardbackgroundimg'>
          <div className='sdashdisplay'>
            <label>In-Out book</label>
          </div>
          {/* <Loader loading={loading}> */}
            <div id="cardsection">
              <div className="row row-cols-1 row-cols-md-3 g-4 sdfullcardscss allcards">
                <div className="col card_hover_animation ">
                  <div className="sddashboardcard">
                    <img src="/images/VisitorInoutBook.svg" className="dbcard-img-top" alt="view parked vehicle" onClick={() => { window.location.href = '/visitorinoutbook' }}></img>
                  </div>
                </div>
                <div className="col card_hover_animation">
                  <div className="sddashboardcard">
                    <img src="/images/ResidentInoutBook.svg" className="dbcard-img-top" alt="view guest parking section" onClick={() => { window.location.href = '/residentinoutbook' }}></img>
                  </div>
                </div>
               
              </div>
             
            </div>
          {/* </Loader> */}
        </div>
      </div>
    </>
  )
}
export default InOutSocietyMain;