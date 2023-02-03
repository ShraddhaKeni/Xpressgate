
import './GuestManagementcard.css';
import Societyheader from './Utils/Societyheader'
import { Loader } from "../Loader";
const GuestManagementcard = () => {


  return (
    <div className="guestcardcontainer">
      <div id="headersection">
      <Societyheader />
      </div>
      <div id="guestnamesection">
        <div className='guest_GName'>
          <img src="/images/societyicon.svg" alt="guard name" />
          <label>Society Name</label>
        </div>
        <div className='guest_SImg'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='iobcbackgroundimg'>
        <div className= "guest_display">
          <label>In-Out Book</label>
        </div>
        
        {/* <div className="row row-cols-1 row-cols-md-1 g-4 fullcardscss"> */}
        <div className="col">
          <div className="guestcard">
            <br></br>
            <label className="nameguestlabel"></label>
            <div className='profguestclass'>
              </div>
            <br></br>
            <div className='flatguestclass'>
              <label>Flat No</label>
              
            </div>
            <br></br>
            <div><label className='guestallowedclass'>Allowed by </label></div>
            <br></br>
            <div className='guestdetailsclass'>
              <div><label className='guestdate'>Date:</label></div>
              <div><label className='guestintime'>In-Time: </label></div>
              <div><label className='guestouttime'>Out-Time: </label></div>
              {/* <div><label className='noofpeople'>No of People: 1</label></div> */}
              <div><label className='guestvehicleno'>Vehicle No:</label></div>
              <div><label className='parking'>Parking Section:</label></div>
              <div><label className='allotedparking'>Alloted Parking Time:</label></div>
            </div>
            <br></br>
           
           <button type="submit"  id='guestbtnid'  className="btnGuestOut">Out</button>
              
           
            <br></br>
          </div>
        </div>
        {/* </div> */}
        
      </div>
    </div>
  )
}

export default GuestManagementcard